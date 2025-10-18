// Array of quote objects
let quotes = []
  
// Select DOM elements
const randomBtn = document.getElementById("newQuote");
const addBtn = document.getElementById("addQuoteBtn");
const exportBtn = document.getElementById("exportBtn");
const quoteDisplay = document.getElementById("quoteDisplay")

// === Local Storage Functions ===
function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

function loadQuotes() {
  const storedQuotes = localStorage.getItem("quotes");
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  } else {
    // Default quotes if local storage is empty
    quotes = [
      { text: "The best way to predict the future is to create it.", category: "Motivation" },
      { text: "Creativity is intelligence having fun.", category: "Inspiration" },
      { text: "Stay curious, stay foolish.", category: "Life" },
      { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Positivity" }
    ];
  }
}

// === Session Storage Example ===
function saveLastViewedQuote(quote) {
  sessionStorage.setItem("lastViewedQuote", JSON.stringify(quote));
}

function getLastViewedQuote() {
  const savedQuote = sessionStorage.getItem("lastViewedQuote");
  return savedQuote ? JSON.parse(savedQuote) : null;
}


// Function to showa random quote
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

  // Save last viewed quote in session storage
  saveLastViewedQuote({ text, category });
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
    saveQuotes(); // Save to local storage
    alert("🎉 New quote added successfully!");
    textInput.value = "";
    categoryInput.value = "";
    showRandomQuote();
  } else {
    alert("Please fill in both fields before submitting.");
  }

  // === Export Quotes as JSON File ===
function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();

  URL.revokeObjectURL(url);
}

// === Import Quotes from JSON File ===
function importFromJsonFile(event) {
  const fileReader = new FileReader();

  fileReader.onload = function (e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        saveQuotes();
        alert("✅ Quotes imported successfully!");
        showRandomQuote();
      } else {
        alert("⚠️ Invalid JSON format! Must be an array of quotes.");
      }
    } catch (error) {
      alert("⚠️ Error reading JSON file!");
    }
  };

  fileReader.readAsText(event.target.files[0]);
}


// Event listeners
randomBtn.addEventListener("click", showRandomQuote);
addBtn.addEventListener("click", addQuote); 
exportBtn.addEventListener("click", exportToJsonFile);

// === Initialization ===
loadQuotes();

// Display last viewed quote if exists
const lastQuote = getLastViewedQuote();
if (lastQuote) {
  quoteDisplay.innerHTML = `<p>"${lastQuote.text}"</p><p><em>— ${lastQuote.category}</em></p>`;
} else {
  showRandomQuote();
}

}