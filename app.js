document.addEventListener('DOMContentLoaded', function(){
    const tweetForm = document.getElementById('tweetForm');
    const tweetText = document.getElementById('tweetText');
    const responseDiv = document.getElementById('response');

    tweetForm.addEventListener('submit', function(event){
        event.preventDefault(); 
        event.stopImmediatePropagation();

        const content = tweetText.value;

        let post = {"content" : content};
        fetch(`https://one00x-data-analysis.onrender.com/posts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*'
                },
                body: JSON.stringify({post})
        })
        .then(response => {
            if(response.ok){
                return response.json();
            }
            else{
                throw new Error('Tweet posting failed');
            }
        })
        .then(data => {
            console.log(data);
            responseDiv.innerHTML = `Tweet posted successfully! Tweet ID: ${data.id}`;
        })
        .catch(error => {
            console.log(error);
            responseDiv.innerHTML = `Error: ${error.message}`;
        })
    })
})
