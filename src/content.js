
console.log('heyeyyeyeyyeye')
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

    function moveRight(delta) {
        const elements = document.querySelectorAll('*');
        elements.forEach(element => {
            const currentSize = parseInt(window.getComputedStyle(element).right);
            element.style.right = `${currentSize + delta}px`;
        });
    }

    function moveLeft(delta) {
        const elements = document.querySelectorAll('*');
        elements.forEach(element => {
            const currentSize = parseInt(window.getComputedStyle(element).left);
            element.style.left = `${currentSize + delta}px`;
        });
    }

    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        console.log('moving')
        if (message.action === "right") {
            moveRight(1); // Moving the body content to the right by 1px
        } else if (message.action === "left") {
            moveLeft(1); // Moving the body content to the left by 1px
        }
        sendResponse({status: "done"}); // Optional: send a response back
    });
});