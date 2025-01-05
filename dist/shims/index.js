"use strict";
(() => {
  // shims/index.ts
  window.process = {
    env: {
      NODE_ENV: "production",
      VERBOSE: "false",
      USE_OPENAI_EMBEDDING: "true",
      OPENAI_EMBEDDING_MODEL: "text-embedding-3-small",
      USE_OLLAMA_EMBEDDING: "false",
      OLLAMA_EMBEDDING_MODEL: "mxbai-embed-large",
      CHARACTER_PATH: ""
    },
    cwd: () => "/",
    platform: "browser",
    versions: null,
    argv: [],
    argv0: "",
    execArgv: [],
    execPath: ""
  };
  var process = window.process;
  var fs = {};
  var path = {
    dirname: (path2) => path2.split("/").slice(0, -1).join("/"),
    resolve: (...paths) => paths.join("/")
  };
  var BufferClass = class {
    static from() {
      return new Uint8Array();
    }
    static alloc() {
      return new Uint8Array();
    }
  };
  var buffer = { Buffer: BufferClass };
  var dotenv = {
    config: () => {
    },
    default: { config: () => {
    } },
    dirname: (path2) => path2.split("/").slice(0, -1).join("/"),
    resolve: (...paths) => paths.join("/")
  };
  var config = () => {
  };
  var fileURLToPath = (url2) => url2.replace("file://", "");
  var pathToFileURL = (path2) => `file://${path2}`;
  var url = {
    fileURLToPath,
    pathToFileURL
  };
  var https = {};
  var onnxruntime = {
    InferenceSession: class {
      constructor() {
        throw new Error("ONNX Runtime not supported in browser extension");
      }
    }
  };
  var events = { EventEmitter: class {
  } };
  var assert = () => {
  };
  var stream = { Readable: class {
  }, Writable: class {
  } };
  var crypto = { randomBytes: () => new Uint8Array(32) };
  var zlib = {
    constants: {},
    createDeflate: () => {
    },
    createInflate: () => {
    }
  };
  var fsPromises = {
    readFile: async () => "",
    writeFile: async () => {
    },
    mkdir: async () => {
    },
    readdir: async () => [],
    stat: async () => ({ isDirectory: () => false })
  };
})();
