import { collatz as Collatz } from "./collatz/collatz.js";

// Create new instance
const collatz = Collatz;

// Place in DOM
const targetNode = document.getElementById("target-publish");
collatz.setTarget(targetNode);

const debugOptions = {
  "logSteps": false,
};

collatz.number(3, debugOptions);
collatz.number(7, debugOptions);
collatz.number(27, debugOptions);
collatz.number(25, debugOptions);


