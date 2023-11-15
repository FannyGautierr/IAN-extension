window.addEventListener('DOMContentLoaded', () => {

    // Actionnement de l'agrandissement de la taille de police depuis l'extension
    document.getElementById('increase').addEventListener('click', () => {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {action: "increaseFontSize"});
        });
    });

    // Actionnement du rétrécissement de la taille de police depuis l'extension
    document.getElementById('decrease').addEventListener('click', () => {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {action: "decreaseFontSize"});
        });
    });

    // Actionnement du changement automatique de contraste de couleurs depuis l'extension
    document.getElementById('contrastActivation').addEventListener('click', () => {

        if(document.getElementById('contrastActivation').value === "Activé") {
            document.getElementById('contrastActivation').value = "Désactivé"
        } else {
            document.getElementById('contrastActivation').value = "Activé"

            chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, {action: "activateContrast"});
            });
        }
    });

    // Actionnement du positionnement du contenu entier vers la droite depuis l'extension
    document.getElementById('right').addEventListener('click', () => {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {action: "right"});
        });
    });

    // Actionnement du positionnement du contenu entier vers la gauche depuis l'extension
    document.getElementById('left').addEventListener('click', () => {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {action: "left"});
        });
    });
});