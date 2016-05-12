/* eslint-disable quotes */
/* eslint-disable quote-props */
/* eslint-disable max-len */

import React from 'react';
import { storiesOf } from '@kadira/storybook';
import ProjectViewer from '.';

const selectedProjectIndex = 0;

storiesOf('ProjectViewer')
  .add('single message with single file diff', () => {
    const projects = [
      {
        project: {
          name: 'xml2js-repro'
        },
        messages: [
          {
            "id": "20160414T015730341Z",
            "from": "gisenberg",
            "text": "Created programmatically.",
            "files": [
              {
                "filename": "package.json",
                "contents": "--- \n\n+++ \n\n@@ -10,7 +10,7 @@\n\n   \"author\": \"\",\n   \"license\": \"ISC\",\n   \"dependencies\": {\n-    \"xml2js\": \"0.4.16\"\n+    \"xml2js\": \"file:../node-xml2js/\"\n   }\n }\n "
              }
            ]
          }
        ]
      }
    ];

    return (
      <ProjectViewer
        projects={projects}
        selectedProjectIndex={selectedProjectIndex}
        />
    );
  })
  .add('single message with multi-file diff', () => {
    const projects = [
      {
        project: {
          name: 'xml2js-repro'
        },
        messages: [
          {
            "id": "20160414T015730341Z",
            "from": "gisenberg",
            "text": "Created programmatically.",
            "files": [
              {
                "filename": "package.json",
                "contents": "--- \n\n+++ \n\n@@ -10,7 +10,7 @@\n\n   \"author\": \"\",\n   \"license\": \"ISC\",\n   \"dependencies\": {\n-    \"xml2js\": \"0.4.16\"\n+    \"xml2js\": \"file:../node-xml2js/\"\n   }\n }\n "
              },
              {
                "filename": "foo.js",
                "contents": "--- \n\n+++ \n\n@@ -10,7 +10,7 @@\n\n   \"author\": \"\",\n   \"license\": \"ISC\",\n   \"dependencies\": {\n-    \"xml2js\": \"0.4.16\"\n+    \"xml2js\": \"file:../node-xml2js/\"\n   }\n }\n "
              }
            ]
          }
        ]
      }
    ];

    return (
      <ProjectViewer
        projects={projects}
        selectedProjectIndex={selectedProjectIndex}
        />
    );
  })
  ;

