// Collatz algorithm
import { Collatz } from "./algorithms/collatz/collatz.js";
// Helper to publish formatetd content to DOM
import { Publisher } from "./helpers/publisher.js";



// ========== CONFIGS ==========
// DEBUG OPTIONS
const DEBUG_OPTIONS = {
  "DEBUG_LOG": false,
};

// OPTIONS
const OPTIONS = {
  ...DEBUG_OPTIONS,
  sort: "getLongestStoppingTime",
};

// available types of sorts
// {getLongestStoppingTime} {getShortestStoppingTime}
// {getHighScore} {getLowScore}(only returns number 1)

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

  // Clear input field
  inputField.value = "";

  // Run algorithm here
  const newCollatzNumber = await Collatz.CollatzUpTo(newData, OPTIONS);

  // Publish work
  Publisher.appendNumber(newCollatzNumber);
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

  return true;
};