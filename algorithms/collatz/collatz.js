 const collatz = () => {

  // ====== Methods Public ======

  /**
   * Runs Collatz Conjecture on number
   * @param {number} number - Number to run Collatz Conjecture on
   * @param {object} - Options object
   * @return - {Object} {seed: {number}, steps: {number}, max: {number}}
   */
  async function CollatzThis(number, OPTIONS = false) {
    // DEBUG
    if(OPTIONS.DEBUG_LOG) {console.log(`Starting with:\t${number}`)};

    // Variables to keep through iterations
    let iterations = 0;
    let topNumber = 0;
    let currentNumber = number;

    // Main algorithm
    while(currentNumber !== 1) {

      // Check which of Collatz path to take
      if(currentNumber % 2 === 0) {
        currentNumber = currentNumber / 2;
      } else {
        currentNumber = (currentNumber * 3) + 1;
      };

      // Replace highest number if larger
      if(currentNumber > topNumber) {topNumber = currentNumber};

      // Increment iterations
      iterations++;

      // DEBUG
      if(OPTIONS.DEBUG_LOG) {console.log(currentNumber)};
    };

    // Add to "Display"
    return {"seed": number, "steps": iterations, "max": topNumber};
  };

  /**
   * Runs Collatz Conjecture on every number from: 1 through {number}
   * @param {number} number - Number to run reach for
   * @param {object} OPTIONS - Options object
   */
  async function CollatzUpTo(number, OPTIONS = false) {
    // Create simple array to iterate through
    let tempArray = [];
    for(let i = 1; i <= number; i++) {
      tempArray.push(i);
    };
    
    // Cpdate all values
    const returnArray = await Promise.all(tempArray.map( async (element) => {
      return await CollatzThis(element, OPTIONS);
    }));

    // Cf option args, then sort/extract

    // Return
    return returnArray
  };



  return {
    CollatzThis,
    CollatzUpTo,
  };
};

export const Collatz = collatz();