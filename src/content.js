


let repositoryId = document.querySelector('meta[name="octolytics-dimension-repository_id"]').content
console.log(repositoryId)
save(repositoryId)


function save(repositoryId) {
    console.log('repo Id :' + repositoryId)
    chrome.storage.local.get(['apiKey'], function (result) {
        if (result.apiKey) {

                console.log(apiKey)
                chrome.storage.local.set({apiKey: apiKey}, function () {
                    console.log('Value is set to ' + apiKey)
                })
                console.log('fetching...')
                fetch(`https://127.0.0.1:8000/api/repository/add/${repositoryId}`, {
                    method: 'POST',
                    headers: {
                        'X-Access-Token': apiKey,
                    }
                }).then(response => {
                    if (response.status === 200) {
                        console.log('Success')
                    } else {
                        console.log('Error')
                    }
                }).catch(error => {
                    console.log(error)
                })
            } else {
                console.log('You must have an API key to continue')
            }



    })
}



