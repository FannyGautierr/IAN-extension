function getDomainName(callback) {
    chrome.storage.local.get(['domainName'], function(res) {
        if (chrome.runtime.lastError) {
            console.error('Error fetching domain name:', chrome.runtime.lastError);
        } else {
            callback(res.domainName);
        }
    });
}

window.addEventListener('DOMContentLoaded', ()=>{

    chrome.storage.local.get(['identifier'], function(result) {
        if (result.identifier) {
            console.log('Identifiant récupéré:', result.identifier);
            
            const title = document.createElement('h1')
            title.id = 'selector'
            title.innerHTML = result.identifier
            document.body.appendChild(title)

            const input = document.createElement('input')
            input.type = 'textarea';
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
                //const companyName = inputCompany.value
                getDomainName(domainName => {
                   
                const selector = document.querySelector('#selector')
                if (localStorage.getItem(domainName) !== null){
                    console.log('update')
                    let companies = JSON.parse(localStorage.getItem(domainName))
                    const sectionDescription = {
                        selector : selector.innerHTML,
                        description : description
                    }
                    companies.push(sectionDescription)
                    localStorage.setItem(domainName,JSON.stringify(companies))
                    console.log(localStorage.getItem(domainName))
                } else {
                    console.log('create')
                    const array = []
                    const sectionDescription = {
                            selector : selector.innerHTML,
                            description : description
                    }
                    array.push(sectionDescription)
                    let string = JSON.stringify(array)
                    localStorage.setItem(domainName, string)
                    console.log(localStorage.getItem(domainName))
                    
                }

                const done = document.createElement('h1')
                done.innerHTML = 'Done !'
                document.body.appendChild(done)
                //window.close()
            });
            }) 
        }
    });

})