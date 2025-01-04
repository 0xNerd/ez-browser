// Background context shims
export const process = {
    env: { 
        NODE_ENV: 'production',
        VERBOSE: 'false'
    },
    versions: { node: null },
    cwd: () => '/',
    platform: 'browser',
    argv: [],
    argv0: '',
    execArgv: [],
    execPath: ''
};

export const fs = {};
export const path = {
    dirname: (path: string) => path.split('/').slice(0, -1).join('/'),
    resolve: (...paths: string[]) => paths.join('/')
};
// ... rest of shims 