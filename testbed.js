// collatz algorithm
import { Collatz } from "./algorithms/collatz/collatz.js";
// helper to publish formatetd content to DOM
import { Publisher } from "./helpers/publisher.js";



// ========== EVENT FLOW ==========

/** Acquire DOM elements to target */
const inputField = document.getElementById("input-field"); // get document input field
const buttonSubmit = document.getElementById("input-field-submit"); // get submit button
const outputTarget = document.getElementById("output-container"); // get document display target


// define publishing format
Publisher.define(definePublishingFormat());


// Add event listners
buttonSubmit.addEventListener("click", () => handleInput());



// ========== FUNCTIONS ==========

/**
 * Handles input gathering, dispatching and clearing
 */
async function handleInput() {
  // grab input and parse to number. Why do ES have to use integer and float interchangeably?
  const newData = Number(inputField.value);

  // check if valid input
  if(!inputValid(newData)) {return};

  // clear input field
  inputField.value = "";

  // run algorithm here
  const newCollatzNumber = await Collatz.CollatzThis(newData);

  // publish work
  Publisher.appendNumber(newCollatzNumber);
};

/**
 * Helper function to define structure of publishing format.
 * Hides away all the ugly stuff
 */
function definePublishingFormat() {
  // main element definition
  const nodeDefinition = `
    <li class="output-element glass">
      <p class="output">Start: <span class="seed"></span</p>
      <p class="output">Steps: <span class="steps"></span</p>
      <p class="output">HighScore: <span class="max"></span</p>
    </li>
    `;
  
  // parse to DOM Node
  const newNode = new DOMParser().parseFromString(nodeDefinition, "text/html").body.firstChild;

  // fetch new handlers
  const handles = {
    "seed": newNode.querySelector(".seed"),
    "steps": newNode.querySelector(".steps"),
    "max": newNode.querySelector(".max"),
  };

  return {
    "target": outputTarget, // This looks for a global variable
    "DOMNode": newNode,
    "handles": handles,
  };
};

/**
 * Only accepts numbers >0
 */
function inputValid(newData) {
  // input is pure number
  if(typeof(newData) !== "number" || isNaN(newData)) {
    inputField.value = "";
    return false;
  };

  // input is positive and non zero
  if(newData <= 0) {return};

  return true;
};