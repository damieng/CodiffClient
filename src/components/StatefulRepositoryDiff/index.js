import React from 'react';

import RepositoryDiff from '../RepositoryDiff';

const StatefulRepositoryDiff = React.createClass({
  getInitialState() {
    return {
      repository: {
        name: 'codiff',
        origin: 'ssh://some-aws-east-garbage.com/v1/repositories/codiff-client.git',
        localPath: '/Users/gisenberg/codiff-client'
      },
      files: [
        {
          path: 'src/App.js',
          lines: [
            `--- \n`,
            `+++ \n`,
            `@@ -1,6 +1,7 @@\n`,
            ` var RepositoryWatcher = require('./repository-watcher.js').RepositoryWatcher;`,
            ` var request = require('request');`,
            ` `,
            `+// @damieng: hey`,
            ` var app = angular.module('codiff-app', ['ngRoute']);`,
            ` var repositoryWatcher: RepositoryWatcher;`,
            ` var userId: string;`,
            `@@ -53,10 +54,13 @@\n`,
            ` \t\tfiles: {},`,
            ` \t};`,
            ` `,
            `+    var threadId;`,
            ` \trepositoryWatcher.on('submit', function(diff) {`,
            `         var diff = repositoryWatcher.getDiff();`,
            `         var route = '/messages';`,
            `         console.log('submit', diff);`,
            `+        diff.threadId = threadId;`,
            `+        console.log(JSON.stringify(diff));`,
            `         request({`,
            `             url: apiPath + route,`,
            `             method: 'POST',`,
            `@@ -73,6 +77,7 @@\n`,
            `                 window.alert('Diff rejected. See console for additional details.');`,
            `             }`,
            ` `,
            `+            threadId = body.threadId;`,
            `             console.log(response);`,
            `             console.log(body);`,
            `         });`
          ]
        }
      ]
    };
  },
  render() {
    return (
      <div>
        <RepositoryDiff {...this.state} />
      </div>);
  }
});

export default StatefulRepositoryDiff;
