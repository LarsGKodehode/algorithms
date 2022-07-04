 const Collatz = () => {
  let targetNode;
  let virtualNode;

  // Holds structure of element to append to DOM
  const componentStructure = () => {
    const structureRaw = `
    <div>
      <p>Number:<span></span>Max:<span></span>Steps:<span></span></p>
    </div>
    `;
    return new DOMParser().parseFromString(structureRaw).body.firstChild;
  };

  // ====== Methods Public ======

  /**
   * Set where in the doccument to attach "Display"
   * @param {DOMNode} documentTarget
   */
  const setTarget = (documentTarget) => {
    targetNode = documentTarget;
  };
  
/**
 * Attaches component to DOM
 */
  function attachComponent() {
    targetNode.appendChild(virtualNode);
  };

  /**
   * Updates virtual component with new info
   */
  function update() {
    // copy main component

    // modify main component

    // return newVirtualNode;
  };

  /**
   * Draws new info to component
   */
  function draw() {

  };

  /**
   * Runs Collatz Conjecture on number and then updates virtual Construct
   * @param {number} integer - Number to run Collatz Conjecture on
   * @param {boolean} logSteps - Print eaece iteration to console
   * @returns - Object: {seed, steps, max}
   */
  function number(integer, options) {
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

      // Meat of Collatz
      if(currentNumber % 2 === 0) {currentNumber = currentNumber / 2;
      } else {
        currentNumber = (currentNumber * 3) + 1;
      };

      // Replace highest number if larger
      if(currentNumber > topNumber) {topNumber = currentNumber};

      // Increment iterations
      iterations++;

      // DEBUG
      if(options.logSteps) {console.log(currentNumber)};
    };

    // Add to "Display"
    update({"seed": integer, "steps": iterations, "max": topNumber});
  };


  // ===== Methods Private ======
  



  return {
    setTarget,
    attachComponent,
    draw,
    number
  };
};

export const collatz = Collatz();

/**
 * TASK:
 * 
 * Algorithm:
 * Dersom tallet er partall, del tallet på 2.
 * Dersom tallet er oddetall, gang tallet med 3 og pluss på 1.
 * Repeter prosessen over på det resulterende tallet.
 * 
 * output
 * “Antall steg før tallet endte på 1: (ANTALL STEG)”
 * “Høyeste tall nådd i sekvensen: (HØYESTE TALL)”
 */