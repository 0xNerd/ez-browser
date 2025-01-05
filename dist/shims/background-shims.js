"use strict";
(() => {
  // shims/background-shims.ts
  var process = {
    env: {
      NODE_ENV: "production",
      VERBOSE: "false"
    },
    versions: { node: null },
    cwd: () => "/",
    platform: "browser",
    argv: [],
    argv0: "",
    execArgv: [],
    execPath: ""
  };
  var fs = {};
  var path = {
    dirname: (path2) => path2.split("/").slice(0, -1).join("/"),
    resolve: (...paths) => paths.join("/")
  };
})();
