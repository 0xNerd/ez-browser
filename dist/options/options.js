"use strict";
(() => {
  // options/options.ts
  document.addEventListener("DOMContentLoaded", async () => {
    const apiKeyInput = document.getElementById("apiKey");
    const saveButton = document.getElementById("saveButton");
    const statusDiv = document.getElementById("status");
    const { token } = await chrome.storage.sync.get("token");
    if (token) {
      apiKeyInput.value = token;
    }
    saveButton?.addEventListener("click", async () => {
      const token2 = apiKeyInput.value.trim();
      if (!token2) {
        if (statusDiv)
          statusDiv.textContent = "Please enter an API key";
        return;
      }
      await chrome.storage.sync.set({ token: token2 });
      if (statusDiv) {
        statusDiv.textContent = "Settings saved!";
        setTimeout(() => {
          statusDiv.textContent = "";
        }, 2e3);
      }
    });
  });
})();
