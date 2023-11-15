
function getDomainName(callback) {
    chrome.storage.local.get(['domainName'], function(res) {
        if (chrome.runtime.lastError) {
            console.error('Error fetching domain name:', chrome.runtime.lastError);
        } else {
            callback(res.domainName);
        }
    });
}
window.addEventListener('DOMContentLoaded', () => {


    let picker = false;

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
        console.log(picker)
        picker = !picker
        console.log(picker)
        if(picker){
            document.querySelector('#picker').innerHTML ='Disable picker'
            chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, {action: "picker"});
            })
        }else {
            document.querySelector('#picker').innerHTML = 'Picker'
            chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, {action: "disableClick"});
            })
        }
    })

    if(localStorage.getItem('companies')!== null){
        document.querySelector('#startOnboard').addEventListener('click',()=>{
            getDomainName(domainName => {
                chrome.tabs.query({active: true, currentWindow: true}, (tabs)=>{
                    chrome.tabs.sendMessage(tabs[0].id,{action: 'start',localStorage: localStorage.getItem(domainName)} )
                })
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