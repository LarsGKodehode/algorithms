// handles incomming messages
onmessage = function(message) {
  number = message.data;
  // Variables to keep through iterations
  let iterations = 0;
  let topNumber = number;
  let currentNumber = number;

  // Main algorithm
  while(currentNumber !== 1) {
    // Check which of Collatz path to take
    if(currentNumber & 1) { // bitwise isOdd test
      currentNumber = (currentNumber * 3) + 1;
    } else {
      currentNumber = currentNumber / 2;
    };

    // Replace highest number if larger
    if(currentNumber > topNumber) {topNumber = currentNumber};

    // Increment iterations
    iterations++;
  };

  // Add to "Display"
  postMessage({
    "seed": number,
    "steps": iterations,
    "max": topNumber,
  });
};