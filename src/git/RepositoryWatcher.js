import EventEmitter from 'events';
import fs from 'fs';
import path from 'path';
import difflib from 'difflib';
import git from 'git-utils';
import { createHash } from 'crypto';

const GIT_STATUS_WT_NEW = 1 << 7;
const GIT_STATUS_WT_MODIFIED = 1 << 8;
const GIT_STATUS_WT_DELETED = 1 << 9;

class RepositoryWatcher extends EventEmitter {
  constructor(repositoryPath) {
    super();

    this.repositoryPath = repositoryPath;
    this.previousHash = '';
    this.watchTimer = 0;
    this.pollIntervalMs = 10000;

    this.start();
  }

  start() {
    this.watchTimer = setInterval(() => this.checkForDiff(), this.pollIntervalMs);
  }

  checkForDiff() {
    const delta = this.getDelta();
    if(!this.shouldSendDiff(delta))
      return;

    this.emit('update', delta);
    this.previousHash = delta.hash;
  }

  getDelta() {
    const repository = git.open(this.repositoryPath);
    const status = repository.getStatus();
    const recipients = [];

    const files = Object.keys(status).map(filePath => {
      let fileLines;
      try {
        fileLines = fs
                      .readFileSync(path.join(this.repositoryPath, filePath))
                      .toString()
                      .split('\n');
      } catch(err) {
        console.warn(err);
      }

      let diffs;
      switch(status[filePath]) {
        case GIT_STATUS_WT_NEW:
        case 1: // Seems to happen in a rename, not sure which GIT_STATUS corresponds to this
          diffs = difflib.unifiedDiff('', fileLines, { toFile: filePath, n: 7 });
          break;
        case GIT_STATUS_WT_MODIFIED:
        case GIT_STATUS_WT_DELETED:
          diffs = difflib.unifiedDiff(
            repository.getHeadBlob(filePath).toString().split('\n'),
            fileLines, { toFile: filePath, n: 7 });
          break;
        default:
          console.warn(status[filePath]);
          break;
      }

      const possibleRecipients = diffs
        .map(line => line.match(/(\/\/|\*).@\w+:/g))
        .filter(match => !!match)
        .map(match => {
          const text = match[0];
          const atIndex = text.indexOf('@');
          const colonIndex = text.indexOf(':');
          const usernameLength = (colonIndex) - (atIndex + 1);
          const username = text.substr(atIndex + 1, usernameLength);
          return username;
        });

      possibleRecipients.forEach(recipient => {
        if(recipients.indexOf(recipient) > -1) return;
        recipients.push(recipient);
      });

      return {
        path: filePath,
        lines: diffs
      };
    });

    const valueToHash = files.reduce((val, diff) => val + diff.lines.join('\n'), '');
    const sha1Hash = createHash('sha1');
    sha1Hash.update(valueToHash);
    const hash = sha1Hash.digest().toString('hex');

    return {
      hash,
      recipients,
      diff: files
    };
  }

  shouldSendDiff(delta) {
    return this.previousHash !== delta.hash && delta.recipients.length > 0;
  }
}

module.exports = RepositoryWatcher;
