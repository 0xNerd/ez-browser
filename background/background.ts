import { startBrowserAgent } from "../agent";
import { defaultCharacter } from "../agent/defaultCharacter";
import { ModelProviderName } from "@elizaos/core";
import initSqlJs from 'sql.js';
import { SqlJsDatabaseAdapter } from "../src/adapter-sqljs";

declare global {
    var runtime: any;
}

chrome.runtime.onInstalled.addListener(async () => {
    const { token } = await chrome.storage.sync.get('token');
    
    if (!token) {
        chrome.runtime.openOptionsPage();
        return;
    }

    const runtime = await createRuntime(token);
    globalThis.runtime = runtime;
});

const createRuntime = async (token: string) => {
    const SQL = await initSqlJs({
        locateFile: file => chrome.runtime.getURL(`sql-wasm.wasm`)
    });
    
    const db = new SQL.Database();
    const databaseAdapter = new SqlJsDatabaseAdapter(db);
    
    const character = {
        ...defaultCharacter,
        modelProvider: ModelProviderName.OPENAI
    };
    
    return await startBrowserAgent(character, token);
}; 

export {}; 