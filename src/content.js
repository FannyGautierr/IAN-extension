
function changeFontSize(delta) {
    const elements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, a, li, button, input, textarea, select, option, label');
    elements.forEach(element => {
        const currentSize = parseInt(window.getComputedStyle(element).fontSize);
        element.style.fontSize = `${currentSize + delta}px`;
    });
}

function picker(){
    document.addEventListener('mouseover',(target)=>{
        target.target.addEventListener('mouseleave',() => {
            target.target.parentNode.style.border='none'
            target.target.style.border='none'
        })
        target.target.parentNode.style.border='none'
        target.target.style.border= 'white 2px solid'
        target.target.style.padding = '10px'
        target.targe.style.borderRadius = '20%'
    })
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "increaseFontSize") {
        changeFontSize(1);
    } else if (message.action === "decreaseFontSize") {
        changeFontSize(-1);
    } else if( message.action === 'picker'){
        console.log('ijeidejzoize')
        picker();
    } else if( message.action === 'start' ){
        speakAndHighlight(JSON.parse(message.localStorage))
    }
    sendResponse({status: "done"}); 
})

document.addEventListener('click', (event)=>{
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

    // target.target.addEventListener('click', ()=>{
    //     chrome.runtime.sendMessage({action: "openNewWindow"})
    // })

    chrome.runtime.sendMessage({action: "openNewWindow",identifier: selector})
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

function speakAndHighlight(elements, delay = 1000, speechRate = 0.8) {
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

        // Change the opacity and styles as needed
      
        console.log( document.querySelector(element.selector))
        console.log(document.querySelector(element.selector).style)
        //document.querySelector(element.selector).style.opacity = "1";
        document.querySelector(element.selector).style.setProperty('opacity', '1', 'important');
        document.querySelector(element.selector).style.border ='solid 10px red'

        // Set the text to be spoken
        msg.text = element.description;

        // When the speech ends, reset styles and move to the next element
        msg.onend = () => {
            document.body.style.opacity = "1";
            document.querySelector(element.selector).style.border ='none'


            setTimeout(() => {
                index++;
                speakNext(); // Proceed to the next element after the delay
            }, delay); // Call the same function for the next element
        };

        // Speak the text
        window.speechSynthesis.speak(msg);
    }

    // Start the process
    speakNext();
}