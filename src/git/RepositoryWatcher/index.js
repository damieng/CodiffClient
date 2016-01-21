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
    this.pollIntervalMs = 1500;

    this.start();
  }

  start() {
    this.watchTimer = setInterval(() => this.checkForDiff(), this.pollIntervalMs);
  }

  checkForDiff() {
    const delta = this.getDelta();
    if(!this.shouldSendDiff(delta))
      return;

    this.emit('update', delta.diff);
    this.previousHash = delta.hash;
  }

  getDelta() {
    const repository = git.open(this.repositoryPath);
    const status = repository.getStatus();

    const files = Object.keys(status).map(filePath => {
      let fileLines;
      try {
        fileLines = fs
                      .readFileSync(path.join(this.repositoryPath, filePath))
                      .toString()
                      .split('\n');
      } catch(err) {
        console.log(err);
      }

      let diffs;
      switch(status[filePath]) {
        case GIT_STATUS_WT_NEW:
          diffs = difflib.unifiedDiff('', fileLines, { toFile: filePath, n: 7 });
          break;
        case GIT_STATUS_WT_MODIFIED:
        case GIT_STATUS_WT_DELETED:
          diffs = difflib.unifiedDiff(
            repository.getHeadBlob(filePath).toString().split('\n'),
            fileLines, { toFile: filePath, n: 7 });
          break;
        default:
          break;
      }

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
      diff: files
    };
  }

  shouldSendDiff(delta) {
    return this.previousHash !== delta.hash;
  }
}

module.exports = RepositoryWatcher;
