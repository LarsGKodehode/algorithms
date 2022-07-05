import { collatz as Collatz } from "./collatz/collatz.js";

// Create new instance
const collatz = Collatz;

// stores collected data
let collatzArray = [];

collatzArray.push(collatz.CollatzThis(3));
collatzArray.push(collatz.CollatzThis(7));
collatzArray.push(collatz.CollatzThis(25));
collatzArray.push(collatz.CollatzThis(27, {"DEBUG_LOG": true}));


for(const entry of collatzArray) {
  console.log(entry);
};