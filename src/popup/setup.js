
window.addEventListener('DOMContentLoaded', ()=>{

    chrome.storage.local.get(['identifier'], function(result) {
        if (result.identifier) {
            console.log('Identifiant récupéré:', result.identifier);
            // Utiliser l'identifiant comme nécessaire
            const title = document.createElement('h1')
            title.id = 'selector'
            title.innerHTML = result.identifier
            document.body.appendChild(title)

            const input = document.createElement('input')
            input.type = 'textarea'; // For a text input
            input.id = 'newInput';
            input.name = 'newInputName';
            input.placeholder = 'Enter the description for this section';
            document.body.appendChild(input);

            const button = document.createElement('button')
            button.id='submitDescription'
            button.innerHTML ='Submit'
            button.classList.add('button')
            document.body.appendChild(button)

            button.addEventListener('click',()=>{
             
                const input = document.querySelector('#newInput')
                const description = input.value
        
                const inputCompany = document.querySelector('#companyName')
                const companyName = inputCompany.value
        
                const selector = document.querySelector('#selector')
                if (localStorage.getItem('companies') !== null){
                    let companies = JSON.parse(localStorage.getItem('companies'))
                    const sectionDescription = {
                        selector : selector.innerHTML,
                        description : description
                    }
                    companies.push(sectionDescription)
                    localStorage.setItem("companies",JSON.stringify(companies))
                } else {
                    const array = []
                    const sectionDescription = {
                            selector : selector.innerHTML,
                            description : description
                    }
                    array.push(sectionDescription)
                    let string = JSON.stringify(array)
                    localStorage.setItem('companies', string)
                    
                }

            }) 
        }
    });

})