import { PopupMessageManager } from './messageManager.js';
import { IAgentRuntime } from '@elizaos/core';
import { elizaLogger } from '@elizaos/core';

declare const window: { 
    runtime?: IAgentRuntime;
    initializeRuntime: (token: string) => Promise<void>;
};

async function initRuntime() {
    if (!window.runtime) {
        await window.initializeRuntime('OPENAI_API_KEY'); // Replace with actual token
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM Content Loaded');
    
    await initRuntime();
    
    const runtime = window.runtime;
    const messageManager = new PopupMessageManager(runtime!);

    const userInput = document.getElementById('userInput') as HTMLTextAreaElement;
    const sendButton = document.getElementById('sendButton') as HTMLButtonElement;
    const responseDiv = document.getElementById('response') as HTMLDivElement;
    const settingsButton = document.getElementById('settingsButton');

    async function sendToAgent(query: string) {
        try {
            const roomId = 'default-room';
            const userId = '123';

            const response = await messageManager.handleMessage({
                text: query,
                roomId,
                userId
            });
            elizaLogger.info("Response:", response);
            if (response?.text) {
                responseDiv.textContent = response.text;
            }
        } catch (error) {
            responseDiv.textContent = 'Error communicating with the agent';
            console.error(error);
        }
    }

    sendButton.addEventListener('click', () => {
        const query = userInput.value.trim();
        if (query) {
            sendToAgent(query);
        }
    });

    settingsButton?.addEventListener('click', () => {
        console.log('Settings button clicked');
        chrome.runtime.openOptionsPage();
    });
}); 

console.log('Popup script loaded'); 