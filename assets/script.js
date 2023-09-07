const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const newQuoteButton = document.getElementById('quote-button');
const twitterButton = document.getElementById('twitter');
const loader = document.getElementById('loader');

let apiQuotes = [];

// Loading
const showLoader = () => {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

const hideLoader = () => {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Show new quote
const newQuote = () => {
    showLoader();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if author field is blank
    if (!quote.author) {
        authorText.textContent = "Unknown";
    } else {
        authorText.textContent = quote.author;
    }
    
    // Check Quote length
    if (quote.text.length > 80) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // Set Quote and hide loader
    quoteText.textContent = quote.text;
    hideLoader();
}

// Get Quotes from API
const getQuotes = async function () {
    showLoader();
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        // Hadle error
        
    }
}

// Twitt Quote
const twittQuote = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
twitterButton.addEventListener('click', twittQuote);
newQuoteButton.addEventListener('click', () => location.reload());

// On Load
getQuotes();
