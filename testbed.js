// collatz algorithm
import { Collatz } from "./collatz/collatz.js";
// helper to publish formatetd content to DOM
import { Publisher } from "./publisher.js";



// ========== EVENT FLOW ==========

/** Acquire DOM elements to target */
const inputField = document.getElementById("input-field"); // get document input field
const buttonSubmit = document.getElementById("input-field-submit"); // get submit button
const outputTarget = document.getElementById("output-field"); // get document display target


// define publishing format
Publisher.define(definePublishingFormat());


// Event listners
buttonSubmit.addEventListener("click", () => handleInput());





// ========== FUNCTIONS ==========

/**
 * Handles input gathering, dispatching and clearing
 */
function handleInput() {
  // grab input
  const newData = inputField.ariaValueMax;

  // check if valid input
  if(!inputValid(newData)) {return};

  // clear input field
  inputField.value = "";

  // do work on input here
  const newCollatzNumber = Collatz.CollatzThis(newData);

  // publish work
  Publisher.appendNumber(newCollatzNumber);
};

/**
 * Helper function to define structure of publishing format
 * hides away all the ugly stuff
 */
function definePublishingFormat() {
  const nodeDefinition = `
    <div class="output-wrapper">
      <p class="seed">Start Number:</p>
      <p class="steps">Steps:</p>
      <p class="max">HighScore:</p>
    </div>
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