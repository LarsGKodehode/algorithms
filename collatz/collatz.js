 const Collatz = () => {

  // ====== Methods Public ======

  /**
   * Runs Collatz Conjecture on number
   * @param {number} integer - Number to run Collatz Conjecture on
   * @param {boolean} - options object
   * @returns - Object: {seed, steps, max}
   */
  async function CollatzThis(integer, options = false) {
    if(options.logInput) {console.log(`Starting with:\t${integer}`)};
    // Convert negative numbers to positve, Collatz Conjecture is symetric
    if(integer < 0) {integer * -1};
    // Special case for input = 0
    if(integer === 0) {updata({"seed:": 0, "steps": 0, "max": 0})};

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

export const collatz = Collatz();