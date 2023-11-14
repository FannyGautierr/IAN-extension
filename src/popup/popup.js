window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('increase').addEventListener('click', () => {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {action: "increaseFontSize"});
        })
    })

    document.getElementById('decrease').addEventListener('click', () => {
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {action: "decreaseFontSize"});
        })
    })

    document.getElementById('setupOnboard').addEventListener('click',()=>{
        chrome.windows.create({
            url: chrome.runtime.getURL("src/popup/setup.html"),
            type: "popup" // Or "normal" to open in a new window/tab as per your preference
        } )
    })
})