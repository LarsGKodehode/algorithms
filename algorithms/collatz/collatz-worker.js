const collatz = () => {
  // ====== Methods Public ======
  async function thisNumber(number) {
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
    return {
      "seed": number,
      "steps": iterations,
      "max": topNumber,
    };
  };

  async function upTo(number) {
    // Create simple array to iterate through, this might benefit from changing to a JS generator expression
    let numbersToCheck = [];
    for(let i = 1; i <= number; i++) {
      numbersToCheck.push(i);
    };
    
    // Run Collatz on values in array
    const tempArray = await Promise.all(numbersToCheck.map( async (number) => {
      return thisNumber(number);
    }));

    let longestRunning = {steps: 0};
    let highestScore = {max: 0};
    for(const entry of tempArray) {
      if(entry.steps > longestRunning.steps) {
        longestRunning = entry;
      };
      if(entry.max > highestScore.max) {
        highestScore = entry;
      };
    };


    // Return
    return {
      "end-number": number,
      "lr-seed": longestRunning.seed,
      "lr-stopping-time": longestRunning.steps,
      "lr-highest-score": longestRunning.max,
      "hs-seed": highestScore.seed,
      "hs-stopping-time": highestScore.steps,
      "hs-highest-score": highestScore.max,
    };
  };



  return {
  /**
   * Runs Collatz Conjecture on number
   * @param {number} number - Number to run Collatz Conjecture on
   * @param {object} - Options {highestStoppingTime} {lowestStoppingTime} {highScore} {lowScore}
   * @return - {Object} {seed: {number}, steps: {number}, max: {number}}
   */
    thisNumber,
  /**
   * Runs Collatz Conjecture on every number from: 1 up to and including {number}
   * @param {number} number - Number to run Collatz up to
   * @param {object} OPTIONS - Options object
   */
    upTo,
  };
};

const Collatz = collatz();

// Handles incomming messages
onmessage = async (message) => {
  // Deconstruct message
  const { number, OPTIONS } = message.data;
  
  // Run algorithm
  let newStats;
  const variant = OPTIONS.variant;
  switch (variant) {
    case "single":
      const temp = await Collatz.thisNumber(number);
      newStats = {
        "end-number": NaN,
        "lr-seed": temp.seed,
        "lr-stopping-time": temp.steps,
        "lr-highest-score": temp.max,
        "hs-seed": NaN,
        "hs-stopping-time": NaN,
        "hs-highest-score": NaN,
      };
      break;
    case "upTo":
      newStats = await Collatz.upTo(number);
      break;
  };

  /**
   * Return to main function
   */
  postMessage(newStats);
};