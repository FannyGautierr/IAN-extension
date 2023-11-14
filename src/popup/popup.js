window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('increase').addEventListener('click', () => {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {action: "increaseFontSize"});
        });
    });

    document.getElementById('decrease').addEventListener('click', () => {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {action: "decreaseFontSize"});
        });
    });
});