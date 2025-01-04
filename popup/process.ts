import { startBrowserAgent } from '../agent';
import initSqlJs from 'sql.js'
import { ModelProviderName } from '@elizaos/core';
import { defaultCharacter } from '../agent/defaultCharacter';

declare global {
    interface Window {
        process: {
            env: {
                NODE_ENV: string;
                VERBOSE: string;
                USE_OPENAI_EMBEDDING: string;
                OPENAI_EMBEDDING_MODEL: string;
                USE_OLLAMA_EMBEDDING: string;
                OLLAMA_EMBEDDING_MODEL: string;
                CHARACTER_PATH: string;
            };
            versions: {
                node: null;
                v8: string;
                uv: string;
                zlib: string;
                ares: string;
                modules: string;
                http_parser: string;
                openssl: string;
            };
            cwd: () => string;
            platform: 'win32' | 'darwin' | 'linux';
            argv: string[];
            argv0: string;
            execArgv: string[];
            execPath: string;
        };
        runtime: any;
        initializeRuntime: (token: string) => Promise<void>;
        SQL?: any;
    }
}

window.process = {
    env: { 
        NODE_ENV: 'production',
        VERBOSE: 'false',
        USE_OPENAI_EMBEDDING: 'true',
        OPENAI_EMBEDDING_MODEL: 'text-embedding-3-small',
        USE_OLLAMA_EMBEDDING: 'false',
        OLLAMA_EMBEDDING_MODEL: '',
        CHARACTER_PATH: ''
    },
    versions: { 
        node: null,
        v8: '',
        uv: '',
        zlib: '',
        ares: '',
        modules: '',
        http_parser: '',
        openssl: ''
    },
    cwd: function() { return '/'; },
    platform: navigator.userAgent.toLowerCase().includes('win') ? 'win32' : 
              navigator.userAgent.toLowerCase().includes('mac') ? 'darwin' : 'linux',
    argv: [],
    argv0: '',
    execArgv: [],
    execPath: ''
} as any;

async function initializeSql() {
    if (!window.SQL) {
        try {
            const wasmBinary = await fetch(chrome.runtime.getURL('dist/sql-wasm.wasm'))
                .then(response => response.arrayBuffer());

            if (!window.process.versions) {
                window.process.versions = { node: null } as any;
            }

            window.SQL = await initSqlJs({
                wasmBinary,
                locateFile: (file) => chrome.runtime.getURL(`dist/${file}`)
            });
        } catch (error) {
            console.error('Failed to initialize SQL.js:', error);
            throw error;
        }
    }
    return window.SQL;
}

window.initializeRuntime = async (token: string) => {
    await initializeSql();

    const character = {
        ...defaultCharacter,
        modelProvider: ModelProviderName.OPENAI
    };
    
    window.runtime = await startBrowserAgent(character, token);
};

export {};