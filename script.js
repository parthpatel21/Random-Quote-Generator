const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// show loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// hide loader

function complete(){
    if(!loader.hidden)
    {
        quoteContainer.hidden=false;
        loader.hidden=true;
    }
}
async function getQuote(){
    loading();
    const proxyUrl = 'https://jacinto-cors-proxy.herokuapp.com/';
    const apiUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    try{
        const response  = await fetch(proxyUrl + apiUrl);
        const data = await response.json();

        // if author is blank
        if(data.quoteAuthor === '')
        {
            authorText.innerHTML='Unknown';
        }else{
            authorText.innerHTML = data.quoteAuthor;
        }
        // reduce font size for long quote
        if(data.quoteText.length > 120){
            quoteText.classList.add('long-quote');
        }else{
            quoteText.classList.remove('long-quote');
        }

        quoteText.innerHTML = data.quoteText;
        // stop loader
        complete();
    }
    catch(error){
        getQuote();
        
    }

}
//tweet quote
function tweetQuote(){
    const quote = quoteText.innerHTML;
    const author = authorText.innerHTML;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl,'_blank')
}

// Event Listener

newQuoteBtn.addEventListener('click',getQuote);
twitterBtn.addEventListener('click',tweetQuote);
// On Load 

getQuote()
