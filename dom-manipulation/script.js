// Array of quote objects
let quotes = [
  { text: "The best way to predict the future is to create it.", category: "Motivation" },
  { text: "Creativity is intelligence having fun.", category: "Inspiration" },
  { text: "Stay curious, stay foolish.", category: "Life" },
  { text: "The only limit to our realization of tomorrow is our doubts of today.", category: "Positivity" }
];

// Select DOM elements
const randomBtn = document.getElementById("randomQuoteBtn");
const addBtn = document.getElementById("addQuoteBtn");
const quoteDisplay = document.getElementById("quoteText");
const categoryDisplay = document.getElementById("quoteCategory");
const formContainer = document.getElementById("formContainer");

// Function to display a random quote
function showNewQuote() {
  const newIndex = Math.floor(Math.random() * quotes.length);
  const { text, category } = quotes[newIndex];

  quoteDisplay.textContent = `"${text}"`;
  categoryDisplay.textContent = `— ${category}`;
}

// Function to create a dynamic form for adding new quotes
function createAddQuoteForm() {
  // Clear any existing form
  formContainer.innerHTML = "";

  const form = document.createElement("form");
  form.classList.add("quote-form");

  // Create input for quote text
  const textInput = document.createElement("input");
  textInput.type = "text";
  textInput.placeholder = "Enter a new quote...";
  textInput.required = true;

  // Create input for quote category
  const categoryInput = document.createElement("input");
  categoryInput.type = "text";
  categoryInput.placeholder = "Enter the category...";
  categoryInput.required = true;

  // Create submit button
  const submitBtn = document.createElement("button");
  submitBtn.type = "submit";
  submitBtn.textContent = "Add Quote";

  // Append all to form
  form.append(textInput, categoryInput, submitBtn);
  formContainer.appendChild(form);

  // Add form event listener
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const newQuote = {
      text: textInput.value.trim(),
      category: categoryInput.value.trim(),
    };

    // Validate and add new quote
    if (newQuote.text && newQuote.category) {
      quotes.push(newQuote);
      alert("🎉 New quote added successfully!");
      form.reset();
      formContainer.innerHTML = ""; // Clear form after submission
      showRandomQuote(); // Show new quote
    } else {
      alert("Please fill in both fields before submitting.");
    }
  });
}

// Event listeners
randomBtn.addEventListener("click", showRandomQuote);
addBtn.addEventListener("click", createAddQuoteForm);
