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
const submit = document.getElementById("input-container"); // Get submit form
const outputTarget = document.getElementById("output-container"); // Get document display target

// Define publishing format
Publisher.define({
  definition: `
  <li class="output-element glass" style="display:grid;grid-template-columns:repeat(4,1fr);grid-template-rows:repeat(4,1fr);gap:10px">
    <h3 style="grid-column:1/-1;grid-row:1/1">Numbers up to: <span class="end-number"></span></h3>
    <span style="grid-column:2/3;grid-row:2/3">Seed</span>
    <span style="grid-column:3/4;grid-row:2/3">Stopping Time</span>
    <span style="grid-column:4/5;grid-row:2/3">Highest Score</span>

    <span style="grid-column:1/2;grid-row:3/4">Longest Running: </span>
    <span class="lr-seed" style="grid-column:2/3;grid-row:3/4"></span>
    <span class="lr-stopping-time" style="grid-column:3/4;grid-row:3/4"></span>
    <span class="lr-highest-score" style="grid-column:4/5;grid-row:3/4"></span>

    <span style="grid-column:1/2;grid-row:4/5">Highest Score: </span>
    <span class="hs-seed" style="grid-column:2/3;grid-row:4/5"></span>
    <span class="hs-stopping-time" style="grid-column:3/4;grid-row:4/5"></span>
    <span class="hs-highest-score" style="grid-column:4/5;grid-row:4/5"></span>
  </li>
  `,
  handles: [
    "end-number",
    "lr-seed",
    "lr-stopping-time",
    "lr-highest-score",
    "hs-seed",
    "hs-stopping-time",
    "hs-highest-score",
  ],
  target: outputTarget
});

// Add event listners
submit.addEventListener("submit", () => handleInput());



// ========== FUNCTIONS ==========

/**
 * Handles input gathering, checking, calculating and publishing
 */
async function handleInput() {
  // Grab input and parse to number.
  const newData = Number(inputField.value);
  // We got input, reset field for next input
  inputField.value = "";

  // Check if valid input
  if(!inputValid(newData)) {return};

  // Run algorithm here
  const newCollatzNumber = await Collatz.upTo(newData, OPTIONS);

  // Publish work
  Publisher.appendNumber(newCollatzNumber);
};

// If Web Worker supported, use threaded variant of function instead
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

    // We got input, reset field for next input
    inputField.value = "";
  
    // Check if valid input
    if(!inputValid(newNumber)) {return};
  
    // Run algorithm here
    worker.postMessage({number: newNumber, OPTIONS: OPTIONS});
  
    // Handle returned value
    worker.onmessage = (message) => {
      // Publish work
      Publisher.appendNumber(message.data);
    };
  };
};


/**
 * Only accepts numbers > 0
 */
function inputValid(newData) {
  // Input is acutally a number
  if(typeof(newData) !== "number" || isNaN(newData)) {
    cueInvalidForm(inputField);
    return false;
  };
  
  // Input is positive and non zero
  if(newData <= 0) {
    cueInvalidForm(inputField);
    return false;
  };

  return true;
};


// UX feedback cue for invalid input, higlights offending box
/** this solution works poorly
 * problem#1 if active it turns it off
 * problem#2 it does not provide cue on keypress "enter"
 * Theory:
 *  button click forces a browser page update
 *  keypress does not
 * rational:
 *  class is set correctly, but no change in renderer
 */
async function cueInvalidForm(node) {
  if(node.classList.toggle("invalid-form")) {
    setTimeout(() => {node.classList.remove("invalid-form")}, 1000);
  };
};