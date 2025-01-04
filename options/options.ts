document.addEventListener('DOMContentLoaded', async () => {
    const apiKeyInput = document.getElementById('apiKey') as HTMLInputElement;
    const saveButton = document.getElementById('saveButton');
    const statusDiv = document.getElementById('status');

    // Load saved API key
    const { token } = await chrome.storage.sync.get('token');
    if (token) {
        apiKeyInput.value = token;
    }

    saveButton?.addEventListener('click', async () => {
        const token = apiKeyInput.value.trim();
        
        if (!token) {
            if (statusDiv) statusDiv.textContent = 'Please enter an API key';
            return;
        }

        await chrome.storage.sync.set({ token });
        
        if (statusDiv) {
            statusDiv.textContent = 'Settings saved!';
            setTimeout(() => {
                statusDiv.textContent = '';
            }, 2000);
        }
    });
}); 