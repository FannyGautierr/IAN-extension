// In background.js
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.action === "openNewWindow") {
            chrome.storage.local.set({identifier: request.identifier}, function() {
                console.log('Identifiant sauvegardé');
            });
            chrome.storage.local.set({domainName: request.domain})
            chrome.windows.create({
                url: chrome.runtime.getURL("src/popup/setup.html"),
                type: "popup" // Or "normal" for a new tab/window
            });
        }
    }
);
