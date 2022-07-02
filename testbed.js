import { collatz as Collatz } from "./collatz/collatz.js";

// create new instance
const collatz = Collatz;

// place in DOM
const targetNode = document.getElementById("target-publish");
collatz.setTarget(targetNode);



collatz.number(3, true);
collatz.number(7, true);
collatz.number(27, true);
collatz.number(25, true);

