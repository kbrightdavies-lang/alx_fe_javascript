// Array of quote objects
let quotes = []
  
// Select DOM elements
const randomBtn = document.getElementById("newQuote");
const addBtn = document.getElementById("addQuoteBtn");
const exportBtn = document.getElementById("exportBtn");
const quoteDisplay = document.getElementById("quoteDisplay");
const categoryDisplay = document.getElementById("quoteCategory");
const formContainer = document.getElementById("formContainer");
const importFileInput = document.getElementById("importFile");
const categoryFilter = document.getElementById("categoryFilter");
const syncStatus = document.getElementById("syncStatus"); // Optional: add <p id="syncStatus"></p> in your HTML



// =======================
// LOCAL & SESSION STORAGE
// =======================

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
    saveQuotes();
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


// =======================
// RANDOM QUOTE FUNCTION
// =======================
function showRandomQoute() {
  if (quotes.length === 0) {
    quoteDisplay.textContent = "No quotes available.";
    categoryDisplay.textContent = "";
    return;
  }

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const { text, category } = quotes[randomIndex];

  // Create elements dynamically
  quoteDisplay.textContent = `"${text}"`;
  categoryDisplay.textContent = `— ${category}`;
  saveLastViewedQuote({ text, category });
}



 // =======================
// ADD NEW QUOTE
// =======================
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
    populateCategories();
    postQuoteToServer(newQuote); // 👈 added this line

    alert("🎉 New quote added successfully!");
    textInput.value = "";
    categoryInput.value = "";
    showRandomQuote();

    // Push update to "server"
    syncWithServer();
  } else {
    alert("Please fill in both fields before submitting.");
  }

}

// =======================
// CATEGORY FILTER SYSTEM
// =======================

function populateCategories() {
  const categories = ["all", ...new Set(quotes.map(q => q.category))];
  categoryFilter.innerHTML = "";

  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });

  const savedCategory = localStorage.getItem("selectedCategory");
  if (savedCategory) {
    categoryFilter.value = savedCategory;
    filterQuotes();
  }
}

function filterQuotes() {
  const selectedCategory = categoryFilter.value;
  localStorage.setItem("selectedCategory", selectedCategory);

  const filteredQuotes = selectedCategory === "all"
    ? quotes
    : quotes.filter(q => q.category === selectedCategory);

  if (filteredQuotes.length > 0) {
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const { text, category } = filteredQuotes[randomIndex];
    quoteDisplay.textContent = `"${text}"`;
    categoryDisplay.textContent = `— ${category}`;
  } else {
    quoteDisplay.textContent = "No quotes found for this category.";
    categoryDisplay.textContent = "";
  }
}



  // =======================
// JSON IMPORT / EXPORT
// =======================
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
        populateCategories();
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



// =======================
// CATEGORY FILTER SYSTEM
// =======================

function populateCategories() {
  const categoryFilter = document.getElementById("categoryFilter");
  const categories = ["all", ...new Set(quotes.map(q => q.category))];

  // Clear existing options
  categoryFilter.innerHTML = "";

  // Add each category as an <option>
  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });

  // Restore last selected category (if any)
  const savedCategory = localStorage.getItem("selectedCategory");
  if (savedCategory) {
    categoryFilter.value = savedCategory;
    filterQuotes(); // Show quotes from that category
  }
  populateCategories();

  function filterQuotes() {
  const categoryFilter = document.getElementById("categoryFilter");
  const selectedCategory = categoryFilter.value;

  localStorage.setItem("selectedCategory", selectedCategory); // Remember filter

  const filteredQuotes = selectedCategory === "all"
    ? quotes
    : quotes.filter(q => q.category === selectedCategory);

  // Randomly display one of the filtered quotes
  if (filteredQuotes.length > 0) {
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const { text, category } = filteredQuotes[randomIndex];
    quoteDisplay.textContent = `"${text}"`;
    categoryDisplay.textContent = `— ${category}`;
  } else {
    quoteDisplay.textContent = "No quotes found for this category.";
    categoryDisplay.textContent = "";
  }
}
// =======================
// JSON IMPORT/EXPORT
// =======================

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

function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      populateCategories();
      alert("✅ Quotes imported successfully!");
      displayRandomQuote();
    } else {
        alert("⚠️ Invalid JSON format!");
      }
    } catch (error) {
      alert("⚠️ Error reading JSON file!");
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

// =======================
// SERVER SYNC SIMULATION
// =======================

async function fetchQuotesFromServer() {
    // Simulate fetching server data (JSONPlaceholder dummy endpoint)
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const serverData = await response.json();

    // Simulate server storing quotes
    const serverQuotes = serverData.slice(0, 3).map(item => ({
      text: item.title,
      category: "Server Sync"
    }));

    return serverQuotes;
}

// =======================
// POST NEW QUOTE TO SERVER
// =======================
async function postQuoteToServer(newQuote) {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newQuote)
    });

    if (response.ok) {
      console.log("✅ Quote successfully posted to server!");
    } else {
      console.warn("⚠️ Failed to post quote. Server returned an error.");
    }
  } catch (error) {
    console.error("❌ Error posting quote:", error);
  }
}

async function syncWithServer() {
  try {
    updateSyncStatus("🔄 Syncing with server...");

    // Fetch quotes from the simulated server
    const serverQuotes = await fetchQuotesFromServer();

    // Conflict resolution: server takes precedence
    const combined = [...quotes, ...serverQuotes];
    const unique = Array.from(new Map(combined.map(q => [q.text, q])).values());

    if (unique.length !== quotes.length) {
      quotes = unique;
      saveQuotes();
      populateCategories();
      updateSyncStatus("✅ Data synced (server updates applied)");
    } else {
      updateSyncStatus("☁️ No new server updates");
    }

  } catch (error) {
    updateSyncStatus("❌ Sync failed. Working offline.");
  }
}

// Helper to update sync status text
function updateSyncStatus(message) {
  if (syncStatus) {
    syncStatus.textContent = message;
  } else {
    console.log(message);
  }
}

// Periodically sync with server every 30 seconds
setInterval(syncWithServer, 30000);

}

// =======================
// EVENT LISTENERS
// =======================
randomBtn.addEventListener("click", showRandomQuote);
addBtn.addEventListener("click", addQuote); 
exportBtn.addEventListener("click", exportToJsonFile);
importFileInput.addEventListener("change", importFromJsonFile);
categoryFilter.addEventListener("change", filterQuotes);

// === Initialization ===
loadQuotes();
populateCategories();



// =======================
// INITIALIZE APP
// =======================
loadQuotes();
populateCategories();

// Restore last viewed quote (from session)
const lastQuote = getLastViewedQuote();
if (lastQuote) {
  quoteDisplay.textContent = `"${lastQuote.text}"`;
  categoryDisplay.textContent = `— ${lastQuote.category}`;
} else {
  displayRandomQuote();
}

syncWithServer(); // Run initial sync