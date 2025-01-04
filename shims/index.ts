// Define process globally first
(window as any).process = {
    env: { 
        NODE_ENV: 'production',
        VERBOSE: 'false',
        USE_OPENAI_EMBEDDING: 'true',
        OPENAI_EMBEDDING_MODEL: 'text-embedding-3-small',
        USE_OLLAMA_EMBEDDING: 'false',
        OLLAMA_EMBEDDING_MODEL: 'mxbai-embed-large',
        CHARACTER_PATH: ''
    },
    cwd: () => '/',
    platform: 'browser',
    versions: null,
    argv: [],
    argv0: '',
    execArgv: [],
    execPath: ''
};

// Then export all the shims
export const process = (window as any).process;

export const fs = {};
export const path = {
    dirname: (path: string) => path.split('/').slice(0, -1).join('/'),
    resolve: (...paths: string[]) => paths.join('/')
};

// Add Buffer class
class BufferClass {
    static from() { return new Uint8Array(); }
    static alloc() { return new Uint8Array(); }
}
export const buffer = { Buffer: BufferClass };
export { BufferClass as Buffer };

const dotenv = { 
    config: () => {},
    default: { config: () => {} },
    dirname: (path: string) => path.split('/').slice(0, -1).join('/'),
    resolve: (...paths: string[]) => paths.join('/')
};
export { dotenv as default };
export const config = () => {};

// Add URL shim
export const fileURLToPath = (url: string) => url.replace('file://', '');
export const pathToFileURL = (path: string) => `file://${path}`;
export const url = {
    fileURLToPath,
    pathToFileURL
};

export const https = {};
export const onnxruntime = {
    InferenceSession: class {
        constructor() {
            throw new Error('ONNX Runtime not supported in browser extension');
        }
    }
};
export const events = { EventEmitter: class {} };
export const assert = () => {};
export const stream = { Readable: class {}, Writable: class {} };
export const crypto = { randomBytes: () => new Uint8Array(32) };
export const zlib = { 
    constants: {},
    createDeflate: () => {},
    createInflate: () => {}
};

const fsPromises = {
    readFile: async () => '',
    writeFile: async () => {},
    mkdir: async () => {},
    readdir: async () => [],
    stat: async () => ({ isDirectory: () => false })
};

export { fsPromises };
