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

    document.getElementById('contrastActivation').addEventListener('click', () => {

        if(document.getElementById('contrastActivation').value === "Activé") {
            document.getElementById('contrastActivation').value = "Désactivé"
        } else {
            document.getElementById('contrastActivation').value = "Activé"
        }
    });
});