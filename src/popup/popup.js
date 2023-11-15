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

    // document.getElementById('setupOnboard').addEventListener('click',()=>{
    //     chrome.windows.create({
    //         url: chrome.runtime.getURL("src/popup/setup.html"),
    //         type: "popup" // Or "normal" to open in a new window/tab as per your preference
    //     } )
    // })

    document.querySelector('#picker').addEventListener('click',()=>{
        chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, {action: "picker"});
        })
    })

    if(localStorage.getItem('companies')!== null){
        document.querySelector('#startOnboard').addEventListener('click',()=>{
            chrome.tabs.query({active: true, currentWindow: true}, (tabs)=>{
                chrome.tabs.sendMessage(tabs[0].id,{action: 'start',localStorage: localStorage.getItem('companies')} )
            })
        })
    }
 
    // chrome.storage.local.get(['message'], function(result) {
    //     console.log(result.message)
    //    if (result.message === 'input'){
    //     chrome.windows.create({
    //         url: chrome.runtime.getURL("src/popup/setup.html"),
    //         type: "popup" 
    //     } )
    //    }
    // });
})

function guidedTour(){

}

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//     console.log(message)
//     if(message.action === "input"){
//       console.log('NIJNIOJIOJIOJIOJOIJOIJIO')
//     }
// })