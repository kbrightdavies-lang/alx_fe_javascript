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
  //Clear any existing quote
  quoteDisplay.innerHTML = ""

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const { text, category } = quotes[randomIndex];

  // Create elements dynamically
  const quoteText = document.createElement("p");
  quoteText.textContent = `"${text}"`;

  const quoteCategory = document.createElement("p");
  quoteCategory.textContent = `— ${category}`;
  quoteCategory.style.fontStyle = "italic";

  // Append elements to the quote display
  quoteDisplay.appendChild(quoteText);
  quoteDisplay.appendChild(quoteCategory);
}


// Function to add new quotes
function createAddQuoteForm() {
  const textInput = document.getElementById("newQuoteText");
  const categoryInput = document.getElementById("newQuoteCategory");

const newQuote = {
    text: textInput.value.trim(),
    category: categoryInput.value.trim(),
  };

  if (newQuote.text && newQuote.category) {
    quotes.push(newQuote);

    //Create and append a small confirmation message dynamically
    const confirmation = document.createElement("p");
    confirmation.textContent = "🎉 New quote added successfully!";
    confirmation.style.color = "green";

    // Clear any old message first
    const existingMsg = document.getElementById("confirmationMsg");
    if (existingMsg) existingMsg.remove();

    confirmation.id = "confirmationMsg";
    document.body.appendChild(confirmation);

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