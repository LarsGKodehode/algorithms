// Non threaded variant of algorithm
import { Collatz } from "./algorithms/collatz/collatz.js";
// Helper to publish formated content to DOM
import { Publisher } from "./helpers/publisher.js";



// ========== CONFIGS ==========
// DEBUG OPTIONS
const DEBUG_OPTIONS = {
  "DEBUG_LOG": false, // Currently not logging anything
};

// OPTIONS
const OPTIONS = {
  ...DEBUG_OPTIONS,
  sort: "getHighScore",
};
// Sort:
// {getLongestStoppingTime} {getHighScore}



// ========== EVENT FLOW ==========

/** Acquire DOM element targets */
const inputField = document.getElementById("input-field"); // Get document input field
const buttonSubmit = document.getElementById("input-field-submit"); // Get submit button
const outputTarget = document.getElementById("output-container"); // Get document display target

// Define publishing format
Publisher.define({
  definition: `
  <li class="output-element glass">
    <p class="output">Start: <span class="seed"></span</p>
    <p class="output">Steps: <span class="steps"></span</p>
    <p class="output">HighScore: <span class="max"></span</p>
  </li>
  `,
  handles: [
    "seed",
    "steps",
    "max",
  ],
  target: outputTarget
});

// Add event listners
buttonSubmit.addEventListener("click", () => handleInput());



// ========== FUNCTIONS ==========

/**
 * Handles input gathering, checking, calculating and publishing
 */
async function handleInput() {
  // Grab input and parse to number.
  const newData = Number(inputField.value);

  // Check if valid input
  if(!inputValid(newData)) {return};

  // Run algorithm here
  const newCollatzNumber = await Collatz.upTo(newData, OPTIONS);

  // Publish work
  Publisher.appendNumber(newCollatzNumber);
};
// If supported setup Web Worker, use threaded variant of function instead
/**
 * this is a hack, redefines exsisting function
 * using this because JS lacks conditional imports and I could not find a better way
 * to change program path to use a "better" function when available
 */
if(typeof(Worker) !== undefined) {
  // Initialize worker
  const worker = new Worker("./algorithms/collatz/collatz-worker.js");
  // Redefine function too use threads
  handleInput = () => {
    // Grab input and parse to number.
    const newNumber = Number(inputField.value);
  
    // Check if valid input
    if(!inputValid(newNumber)) {return};
  
    // Run algorithm here
    worker.postMessage({number: newNumber, OPTIONS: OPTIONS});
  
    // Handle returned value
    worker.onmessage = (message) => {
      const numberStats = message.data;
      // Publish work
      Publisher.appendNumber(numberStats);
    };
  };
};

/**
 * Only accepts numbers > 0
 */
function inputValid(newData) {
  // Input is acutally a number
  if(typeof(newData) !== "number" || isNaN(newData)) {
    inputField.value = ""; // Clear out corrupted input
    return false;
  };

  // Input is positive and non zero
  if(newData <= 0) {return false};

  inputField.value = ""; // Clear out acceppted input
  return true;
};