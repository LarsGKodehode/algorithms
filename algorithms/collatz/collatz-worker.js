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

  async function upTo(number, OPTIONS = false) {
    // Create simple array to iterate through, this might benefit from changing to a js generator expression
    let tempArray = [];
    for(let i = 1; i <= number; i++) {
      tempArray.push(i);
    };
    
    // Run Collatz on values in array
    const returnArray = await Promise.all(tempArray.map( async (number) => {
      return thisNumber(number, OPTIONS);
    }));

    // If OPTIONS args, then sort/extract
    const sort = OPTIONS.sort;
    if(sort) {
      switch(sort) {
        case "getLongestStoppingTime":
          returnArray.sort((a, b) => {return a.steps - b.steps});
          break
        case "getShortestStoppingTime":
          returnArray.sort((a, b) => {return b.steps - a.steps});
          break;
        case "getHighScore":
          returnArray.sort((a, b) => {return a.max - b.max});
          break;
        case "getLowScore":
          returnArray.sort((a, b) => {return b.max - a.max});
          break;
      };
    };

    // Return
    return returnArray.pop()
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

// handles incomming messages
onmessage = async (message) => {
  // deconstruct message
  const { number, OPTIONS } = message.data;

  console.log(`Calculating Collatz for all numbers upto:\t${number}`)
  
  // Run algorithm
  const newStats = await Collatz.upTo(number, OPTIONS);

  // Return to main functio
  postMessage(newStats);
};