
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