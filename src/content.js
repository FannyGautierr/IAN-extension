

let isClickEnabled = true;

function changeFontSize(delta) {
    const elements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, a, li, button, input, textarea, select, option, label');
    elements.forEach(element => {
        const currentSize = parseInt(window.getComputedStyle(element).fontSize);
        element.style.fontSize = `${currentSize + delta}px`;
    });
}


function picker(){
    addCloseButton()
    console.log(document.querySelectorAll('*'))

    document.addEventListener('mouseover',(target)=>{
        target.target.addEventListener('mouseleave',() => {
            target.target.parentNode.style.border= null
     
            target.target.style.border= null
            target.target.style = null
        })
        target.target.parentNode.style.border='none'
        target.target.style.border= 'orange 8px solid'
        target.target.style.borderradius= '1.25rem'
        target.target.style.padding = '10px'
        target.target.style.opacity= '1'
    })
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "increaseFontSize") {
        changeFontSize(1);
    } else if (message.action === "decreaseFontSize") {
        changeFontSize(-1);
    } else if( message.action === 'picker'){
            picker();
    } else if( message.action === 'start' ){
        console.log(message.localStorage)
        speakAndHighlight(JSON.parse(message.localStorage))
    } else if( message.action === 'disableClick'){
        isClickEnabled = false
    }
    sendResponse({status: "done"}); 
})

document.addEventListener('click', (event)=>{
    if (!isClickEnabled) return;
    let element = event.target;
    let selector = '';

    while (element && element !== document) {
        if (element.id) {
            selector = '#' + element.id;
            break;
        } else if (element.className) {
            selector = '.' + element.className.split(' ').join('.');
            break;
        }
        element = element.parentElement;
    }
    const domainName = window.location.hostname
    console.log(domainName)
    // target.target.addEventListener('click', ()=>{
    //     chrome.runtime.sendMessage({action: "openNewWindow"})
    // })

    chrome.runtime.sendMessage({action: "openNewWindow",identifier: selector, domain: domainName})
})

// function guidedTour(object){
//     console.log("HEY ")
//     let msg = new SpeechSynthesisUtterance();
//     msg.lang = "fr-FR"
//     console.log(object)

//     for(let i = 0 ; i < object.lenght ; i++){
//         document.body.style.opacity = "0.5";
//         //document.querySelector(element.selector).style.backgroundColor = 'red'
//         document.querySelector(element.selector).style.opacity = '1'
 
        
//         msg.text = element.description
//         window.speechSynthesis.speak(msg);
      
//         window.speechSynthesis.cancel()
 
//         document.body.style.opacity = "1";
//     }
// }

function speakAndHighlight(elements, delay = 1000, speechRate = 0.9) {
    let index = 0;
    const msg = new SpeechSynthesisUtterance();
    msg.lang = "fr-FR"
    msg.rate = speechRate; 

    function speakNext() {
        if (index >= elements.length) {
            // Finished all elements
            return;
        }

        let element = elements[index];
        //document.querySelector(element.selector).style.opacity = "1";
        document.querySelector(element.selector).style.setProperty('opacity', '1', 'important');
        document.querySelector(element.selector).style.border ='solid 10px orange'
     
        msg.text = element.description;

        msg.onend = () => {
            document.body.style.opacity = "1";
            document.querySelector(element.selector).style.border ='none'


            setTimeout(() => {
                index++;
                speakNext();
            }, delay);
        };

        // Speak the text
        window.speechSynthesis.speak(msg);
    }

    // Start the process
    speakNext();
}


function addCloseButton() {
    console.log('close')
    const closeButton = document.createElement('button');
    closeButton.innerText = 'Close';
    closeButton.style.position = 'fixed';
    closeButton.style.backgroundColor='red'
    closeButton.style.position='absolute'
    closeButton.style.height='40px'
    closeButton.style.width='40px'
    closeButton.style.top = '10px';
    closeButton.style.right = '10px';
    closeButton.style.zIndex = '1000'; // Ensure it's above other elements

    closeButton.addEventListener('click', function() {
        // Define what happens when the button is clicked
        window.close(); // This will close the current tab
    });

    document.body.insertBefore(closeButton,document.body.firstChild);
    console.log(closeButton)
}
