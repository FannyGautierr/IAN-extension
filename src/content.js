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
function adjustContrast(color, targetContrast) {
    // Fonction pour calculer le contraste entre deux couleurs
    function calculateContrast(color1, color2) {
        // Fonction pour convertir une couleur hexadécimale en valeurs RGB
        function hexToRgb(hex) {
            // Code pour convertir une couleur hexadécimale en RGB
            // Retourne un objet avec les propriétés r, g et b
            // ...

            // Exemple simplifié (à adapter selon vos besoins) :
            const bigint = parseInt(hex.slice(1), 16);
            const r = (bigint >> 16) & 255;
            const g = (bigint >> 8) & 255;
            const b = bigint & 255;
            return { r, g, b };
        }

        // Fonction pour calculer la luminance d'une couleur
        function calculateLuminance(color) {
            // Code pour calculer la luminance d'une couleur
            // Retourne la luminance de la couleur
            // ...

            // Exemple simplifié (à adapter selon vos besoins) :
            const { r, g, b } = color;
            return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        }

        // Calcul du contraste entre deux couleurs
        const luminance1 = calculateLuminance(color1);
        const luminance2 = calculateLuminance(color2);
        const contrastRatio = (Math.max(luminance1, luminance2) + 0.05) / (Math.min(luminance1, luminance2) + 0.05);
        return contrastRatio;
    }

    // Fonction pour ajuster la luminosité d'une couleur
    function adjustBrightness(color, factor) {
        // Code pour ajuster la luminosité d'une couleur
        // Retourne la couleur ajustée
        // ...

        // Exemple simplifié (à adapter selon vos besoins) :
        const { r, g, b } = color;
        const adjustedColor = {
            r: Math.min(255, Math.max(0, Math.round(r * factor))),
            g: Math.min(255, Math.max(0, Math.round(g * factor))),
            b: Math.min(255, Math.max(0, Math.round(b * factor))),
        };
        return adjustedColor;
    }

    // Contraste actuel de la couleur
    const currentContrast = calculateContrast(hexToRgb(color), { r: 255, g: 255, b: 255 });

    // Ajustement de la luminosité si le contraste est inférieur à la cible
    if (currentContrast < targetContrast) {
        const adjustmentFactor = targetContrast / currentContrast;
        return adjustBrightness(hexToRgb(color), adjustmentFactor);
    }

    // Retour de la couleur d'origine si le contraste est déjà suffisant
    return hexToRgb(color);
}

// Fonction pour appliquer le contraste automatique à toutes les couleurs d'une page
function applyAutomaticContrast(targetContrast) {
    // Sélection de toutes les balises avec une couleur de fond ou de texte
    const elementsWithColor = document.querySelectorAll('[style*="color"], [style*="background-color"]');

    // Parcours de chaque élément pour ajuster le contraste
    elementsWithColor.forEach((element) => {
        // Récupération de la couleur actuelle
        const currentColor = window.getComputedStyle(element).color || window.getComputedStyle(element).backgroundColor;

        // Ajustement du contraste et application de la nouvelle couleur
        const adjustedColor = adjustContrast(currentColor, targetContrast);
        element.style.setProperty(element.style.color ? 'color' : 'background-color', `rgb(${adjustedColor.r}, ${adjustedColor.g}, ${adjustedColor.b})`);
    });
}


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('color')
    if (message.action === "activateContrast") {

        // Application du contraste automatique avec un contraste cible de 0.5
        applyAutomaticContrast(0.5);

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
