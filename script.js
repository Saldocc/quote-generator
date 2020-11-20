const quoteContainer = document.querySelector("#container");
const quoteText = document.querySelector("#quote");
const authorText = document.querySelector("#author");
const twitterBtn = document.querySelector("#twitter");
const newQuoteBtn = document.querySelector("#new-quote");
const loader = document.querySelector("#loader");

function spinnerLoadingStart() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function spinnerLoadingEnd() {
  if (!loader.hidden) {
    loader.hidden = true;
    quoteContainer.hidden = false;
  }
}

/**
 * *Get data from API
 * ! If you clone this project and get CORS error in the console,
 * ! you have to use "https://chrome.google.com/webstore/detail/moesif-origin-cors-change/digfbfaphojjndkpccljibejjbppifbc?hl=en-US" this pluging
 * ! set plugin status on.
 */
async function getQuote() {
  spinnerLoadingStart();
  const apiUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.quoteAuthor === "") {
      authorText.innerText = "Unknown";
    } else {
      authorText.innerText = data.quoteAuthor;
    }

    if (data.quoteText.length > 100) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }

    quoteText.innerText = data.quoteText;

    spinnerLoadingEnd();
  } catch (error) {
    getQuote();
    console.log("Error", error);
  }
}

function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl =
    "https://twitter.com/intent/tweet?text=" + quote + " - " + author;
  window.open(twitterUrl, "_blank");
}

newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", tweetQuote);

/**
 * * On load page
 */

getQuote();
