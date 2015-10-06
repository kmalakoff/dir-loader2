fs-load
========================

fs-load lets you dynamically require a directory in [webpack](http://webpack.github.io).

This is based on [dir-loader](https://github.com/sleep/dir-loader) but has been adapted for use with fs-memory, an in memory representation of a filesystem.


## contents
- [install](#install)
- [use](#use)
- [api](#api)
- [examples](#examples)


## install
```
npm install --save-dev fs-load
```

## use
Suppose you have a webpack project with a semantic directory structure. You want to require your content but still preserve the hierarchical information inherent to the filesystem.
```
.
├── website
│   ├── intro.md
|   |
│   ├── travel
│   │   ├── post1.md
│   │   ├── post2.md
│   │   └── post3.md
|   |
│   ├── food
│   │   └── post1.md
|   |
│   └──ignore-me.js
|
|
|
├── blog.config.js
└── entry.js
```

In a js file, specify the configuration for fs-load:
```js
// ./blog.config.js

module.exports = {
  path: "./website",
  filter: /\.md$/
}
```

And then just require that configuration with **dir!** in your application code!
```js
// ./entry.js

var blog = require("dir!./blog.config.js");
...
```

This is equivalent to the following javascript:
```js
// (equivalent to ./entry.js)

  var blog = {
    "data": {
      "name": "tinker-test-project",
      "pathParts": [
        "tinker-test-project"
      ],
      "isDirectory": true,
      "stat": {}
    },
    "children": [
      {
        "data": {
          "name": "node_modules",
          "pathParts": [
            "tinker-test-project",
            "node_modules"
          ],
          "isDirectory": true,
          "stat": {}
        },
        "children": [
          {
            "data": {
              "name": "backbone",
              "pathParts": [
                "tinker-test-project",
                "node_modules",
                "backbone"
              ],
              "isDirectory": true,
              "stat": {}
            },
            "children": [
              {
                "data": {
                  "name": "README.md",
                  "pathParts": [
                    "tinker-test-project",
                    "node_modules",
                    "backbone",
                    "README.md"
                  ],
                  "contents": __webpack_require__(2),
                  "stat": {
                    "size": 1865,
                    "mtime": "2015-05-13T22:07:27.000Z"
                  }
                }
              },
              {
                "data": {
                  "name": "backbone-min.js",
                  "pathParts": [
                    "tinker-test-project",
                    "node_modules",
                    "backbone",
                    "backbone-min.js"
                  ],
                  "contents": __webpack_require__(3),
                  "stat": {
                    "size": 23097,
                    "mtime": "2015-09-03T15:56:21.000Z"
                  }
                }
              },
              {
                "data": {
                  "name": "backbone.js",
                  "pathParts": [
                    "tinker-test-project",
                    "node_modules",
                    "backbone",
                    "backbone.js"
                  ],
                  "contents": __webpack_require__(4),
                  "stat": {
                    "size": 71415,
                    "mtime": "2015-09-03T15:56:21.000Z"
                  }
                }
              },
              {
                "data": {
                  "name": "node_modules",
                  "pathParts": [
                    "tinker-test-project",
                    "node_modules",
                    "backbone",
                    "node_modules"
                  ],
                  "isDirectory": true,
                  "stat": {}
                },
                "children": [
                  {
                    "data": {
                      "name": "underscore",
                      "pathParts": [
                        "tinker-test-project",
                        "node_modules",
                        "backbone",
                        "node_modules",
                        "underscore"
                      ],
                      "isDirectory": true,
                      "stat": {}
                    },
                    "children": [
                      {
                        "data": {
                          "name": "LICENSE",
                          "pathParts": [
                            "tinker-test-project",
                            "node_modules",
                            "backbone",
                            "node_modules",
                            "underscore",
                            "LICENSE"
                          ],
                          "contents": __webpack_require__(5),
                          "stat": {
                            "size": 1117,
                            "mtime": "2015-02-20T00:09:44.000Z"
                          }
                        }
                      },
                      {
                        "data": {
                          "name": "README.md",
                          "pathParts": [
                            "tinker-test-project",
                            "node_modules",
                            "backbone",
                            "node_modules",
                            "underscore",
                            "README.md"
                          ],
                          "contents": __webpack_require__(6),
                          "stat": {
                            "size": 1225,
                            "mtime": "2015-02-10T16:27:13.000Z"
                          }
                        }
                      },
                      {
                        "data": {
                          "name": "package.json",
                          "pathParts": [
                            "tinker-test-project",
                            "node_modules",
                            "backbone",
                            "node_modules",
                            "underscore",
                            "package.json"
                          ],
                          "contents": __webpack_require__(7),
                          "stat": {
                            "size": 1948,
                            "mtime": "2015-10-05T19:17:53.000Z"
                          }
                        }
                      },
                      {
                        "data": {
                          "name": "underscore-min.js",
                          "pathParts": [
                            "tinker-test-project",
                            "node_modules",
                            "backbone",
                            "node_modules",
                            "underscore",
                            "underscore-min.js"
                          ],
                          "contents": __webpack_require__(8),
                          "stat": {
                            "size": 16449,
                            "mtime": "2015-04-02T15:32:01.000Z"
                          }
                        }
                      },
                      {
                        "data": {
                          "name": "underscore.js",
                          "pathParts": [
                            "tinker-test-project",
                            "node_modules",
                            "backbone",
                            "node_modules",
                            "underscore",
                            "underscore.js"
                          ],
                          "contents": __webpack_require__(9),
                          "stat": {
                            "size": 52919,
                            "mtime": "2015-04-02T15:32:01.000Z"
                          }
                        }
                      }
                    ]
                  }
                ]
              },
              {
                "data": {
                  "name": "package.json",
                  "pathParts": [
                    "tinker-test-project",
                    "node_modules",
                    "backbone",
                    "package.json"
                  ],
                  "contents": __webpack_require__(10),
                  "stat": {
                    "size": 2054,
                    "mtime": "2015-10-05T19:17:53.000Z"
                  }
                }
              }
            ]
          }
        ]
      },
      {
        "data": {
          "name": "package.json",
          "pathParts": [
            "tinker-test-project",
            "package.json"
          ],
          "contents": __webpack_require__(11),
          "stat": {
            "size": 227,
            "mtime": "2015-10-05T19:17:53.000Z"
          }
        }
      }
    ]
  };
...
```



## api
```js
// ./entry.js
var blog = require("dir!./blog.config.js");
...
```

```js
// ./blog.config.js

module.exports = {

  // path :: String
  // Path to directory. Can be absolute or relative path.
  path: "./website",

  // filter :: RegExp
  // (optional)
  // Regular expression to test filenames.
  filter: /\.md$/,
}
```

## examples
Code [here](https://github.com/kmalakoff/fs-loader/tree/master/example).

To run it:
```shell
git clone https://github.com/kmalakoff/fs-loader
cd fs-load
npm install
npm run example
```
