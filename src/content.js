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

// // Changement taille de la police d'écriture

function changeFontSize(delta) {
    const elements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, a, li, button, input, textarea, select, option, label');
    elements.forEach(element => {
        const currentSize = parseInt(window.getComputedStyle(element).fontSize);
        element.style.fontSize = `${currentSize + delta}px`;
    });
}

// // Lecture à voix haute contenu web (Picker)

// Navigation dans le contenu web [Scroll et hover]
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

// Séléction de la partie du contenu à lire
let isClickEnabled = true;

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

    // Ouverture fenêtre de saisie du texte à lire pour le contenu séléctionné
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

// Activation de la lecture à voix haute
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

// // Changement de contraste couleurs

// Fonction pour ajuster la luminosité d'une couleur en fonction du contraste cible
function adjustContrast(contrastValue) {
    // Convertir la valeur de contraste en pourcentage
    const contrastPercentage = contrastValue * 100;

    const allColors = document.querySelectorAll('*');

    allColors.forEach(element => {
        element.style.filter = `contrast(${contrastPercentage}%)`;
    });
}


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('color')
    if (message.action === "activateContrast") {

        // Application du contraste automatique avec un contraste cible de 0.85 (85%, voir selon jauge ou degré le plus compatible sur toutes les couleurs)
        adjustContrast(1.25);

    } 
    // else if (message.action === "disabledContrast") {

    //     // Application du contraste automatique avec un contraste cible de 1 (100%)
    //     adjustContrast(1);
    // }
    sendResponse({status: "done"}); // Optional: send a response back
});


// // Positionnement personnalisé du contenu entier de la page


function moveRight(delta) {
    const elements = document.querySelectorAll('*'); // extraction de toutes la structure html de la page
    elements.forEach(element => {
        // extraction du style de la page puis conversion de la valeur du positionnement vers la droite en nombre entier
        const currentSize = parseInt(window.getComputedStyle(element).right);
        // dynamisation de la valeur de pixels du positionnement vers la droite
        element.style.right = `${currentSize + delta}px`;
    });
}

function moveLeft(delta) {
    const elements = document.querySelectorAll('*'); // extraction de toutes la structure html de la page
    elements.forEach(element => {
        // extraction du style de la page puis conversion de la valeur du positionnement vers la gauche en nombre entier
        const currentSize = parseInt(window.getComputedStyle(element).left);
        // dynamisation de la valeur de pixels du positionnement vers la gauche
        element.style.left = `${currentSize + delta}px`;
    });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('moving')
    if (message.action === "right") {
        moveRight(1); // Moving the body content to the right by 1px
        console.log('Your moving to the right')
    } else if (message.action === "left") {
        moveLeft(1); // Moving the body content to the left by 1px
        console.log('Your moving to the left')
    }
    sendResponse({status: "done"}); // Optional: send a response back
});
