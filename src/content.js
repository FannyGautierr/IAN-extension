

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

// // Changement de contraste couleurs


// Fonction pour extraire les couleurs d'un élément
function extractColors(element) {
    const computedStyle = window.getComputedStyle(element);
    const backgroundColor = computedStyle.backgroundColor;
    const color = computedStyle.color;

    return [backgroundColor, color];
}

// Fonction pour parcourir tous les éléments de la page et extraire les couleurs
function getAllColors() {
    const allElements = document.querySelectorAll('*');
    const allColors = [];

    allElements.forEach(element => {
        const colors = extractColors(element);
        allColors.push(...colors);
    });

    return allColors;
}

// Vérifier si la couleur est claire
function isColorLight(hexColor) {
    // Convertir la couleur hexadécimale en valeurs RGB
    let r = parseInt(hexColor.slice(1, 3), 16);
    let g = parseInt(hexColor.slice(3, 5), 16);
    let b = parseInt(hexColor.slice(5, 7), 16);

    // Calculer la luminosité en utilisant la formule de luminance relative (réf Wikipédia "Colorimétrie")
    let luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Si la luminosité est supérieure ou égal à 0,5, la couleur est considérée comme claire
    return luminance >= 0.5;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('color')
    if (message.action === "activateContrast") {

        // Appeler la fonction pour obtenir toutes les couleurs
        const colorsOnPage = getAllColors();
        
        // console.log('Toutes les couleurs sur la page :', colorsOnPage);

        colorsOnPage.map((color) => {
            const item = isColorLight(color)

            if(item === true) {
                console.log("Tag ou couleur détecté", color); 
                console.log("Couleur type claire");
            } else {
                console.log("Tag ou couleur détecté", color); 
                console.log("Couleur type foncé");
            }
        })
    }
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
