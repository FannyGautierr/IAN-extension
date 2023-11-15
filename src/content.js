
console.log('heyeyyeyeyyeye') // vérifier si les fonctions natifs sont éxécuter lors de l'activation d'une fonctionnalité


// // Agrandissement/Rétrécissement des taille police écriture + modification résolution écran


function changeFontSize(delta) {
    const elements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, a, li, button, input, textarea, select, option, label');
    elements.forEach(element => {
        const currentSize = parseInt(window.getComputedStyle(element).fontSize);
        element.style.fontSize = `${currentSize + delta}px`;
    });
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('hey')
    if (message.action === "increaseFontSize") {
        changeFontSize(1); // Increase font size by 1px
    } else if (message.action === "decreaseFontSize") {
        changeFontSize(-1); // Decrease font size by 1px
    }
    sendResponse({status: "done"}); // Optional: send a response back
});


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