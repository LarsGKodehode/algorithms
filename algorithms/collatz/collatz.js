 const collatz = () => {

  // ====== Methods Public ======

  /**
   * Runs Collatz Conjecture on number
   * @param {number} integer - Number to run Collatz Conjecture on
   * @param {boolean} - Options object
   * @return - {Object} {seed: {number}, steps: {number}, max: {number}}
   */
  async function CollatzThis(integer, options = false) {
    if(options.logInput) {console.log(`Starting with:\t${integer}`)};
    // Convert negative numbers to positve, Collatz Conjecture is not symetric around 0, and we don't want to deal with it
    if(integer < 0) {
      console.warn(`Only positive numbers allowed`);
      return;
    };
    // Special case for input = 0
    if(integer === 0) {return ({"seed:": 0, "steps": 0, "max": 0})};

    // Variables to keep through iterations
    let iterations = 0;
    let topNumber = 0;
    let currentNumber = integer;

    // Main algorithm
    while(currentNumber !== 1) {

      // Check which of Collatz path to take
      if(currentNumber % 2 === 0) {currentNumber = currentNumber / 2;
      } else {
        currentNumber = (currentNumber * 3) + 1;
      };

      // Replace highest number if larger
      if(currentNumber > topNumber) {topNumber = currentNumber};

      // Increment iterations
      iterations++;

      // DEBUG
      if(options.DEBUG_LOG) {console.log(currentNumber)};
    };

    // Add to "Display"
    return {"seed": integer, "steps": iterations, "max": topNumber};
  };



  return {
    CollatzThis
  };
};

export const Collatz = collatz();