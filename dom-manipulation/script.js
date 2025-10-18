// Array of quote objects
let quotes = [
  { text: "The best way to predict the future is to create it.", category: "Motivation" },
  { text: "Creativity is intelligence having fun.", category: "Inspiration" },
  { text: "Stay curious, stay foolish.", category: "Life" },
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Positivity" }
];

// Select DOM elements
const randomBtn = document.getElementById("newQuote");
const addBtn = document.getElementById("addQuoteBtn");
const quoteDisplay = document.getElementById("quoteDisplay")


// Function to display a random quote
function showRandomQoute() {
  const newIndex = Math.floor(Math.random() * quotes.length);
  const { text, category } = quotes[newIndex];
  quoteDisplay.innerHTML = `<p>"${text}"</p><p><em>— ${category}</em></p>`;
}


// Function to add new quotes
function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

const newQuote = {
    text: textInput.value.trim(),
    category: categoryInput.value.trim(),
  };

  if (newQuote.text && newQuote.category) {
    quotes.push(newQuote);
    alert("🎉 New quote added successfully!");
    textInput.value = "";
    categoryInput.value = "";
    showRandomQuote(); // Show the newly added quote
  } else {
    alert("Please fill in both fields before submitting.");
  }
}

// Event listeners
randomBtn.addEventListener("click", showRandomQuote);
addBtn.addEventListener("click", addQuote); 