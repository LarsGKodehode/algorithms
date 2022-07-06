const publisher = (options = false) => {

  // ===== PUBLIC METHODS =====
  /**
   * Recquired to setup the "gallery".
   * @param {object} createInfo object
   */
  function define(createInfo) {
    // checks if valid createInfo supplied
    if(!createInfoValid(createInfo)) {
      console.warn(`CreateInfo is invalid:\t ${createInfo}`);
      return;
    };

    // All good. set interanl variable
    DOMTarget = createInfo.target;
    nodeMother = createInfo.DOMNode;
    motherlyHandles = createInfo.handles;
  };

  /**
   * Add another number to "gallery"
   * @param {object} newNumber {seed: {number}, steps: {number}, max: {number}}
   */
  function appendNumber(newNumber) {
    // setup newNode
    motherlyHandles.seed.textContent = newNumber.seed;
    motherlyHandles.steps.textContent = newNumber.steps;
    motherlyHandles.max.textContent = newNumber.max;

    // clone edited node
    const newNode = nodeMother.cloneNode("deep");
    
    // insert into DOM
    DOMTarget.appendChild(newNode);
  };

  async function clearOutput() {
    console.log(`NOT YET INPLEMENTED`);
  };

  // ===== PRIVATE MEMBERS =====
  let DOMTarget; // holds place in DOM to add display
  let nodeMother; // keeps the mother around
  let motherlyHandles; // Handles for mother node

  // ===== PRIVATE METHODS =====
  // checks that all the pices is there, verbose when flawed
  function createInfoValid(createInfo) {
    let faulty = [];

    // keys that are recquired
    const correctkeys = [
      "target",
      "DOMNode",
      "handles",
    ];

    // check if all the keys are there, we don't care if we got more
    for(const key of correctkeys) {
      if(!(key in createInfo)) {
        faulty.push(key);
      };
    };


    // decide on outcome
    const epxression = faulty.length;
    switch (epxression) {
      case 0:
        return true;
      default:
        for(entry of faulty) {
          console.warn(`This is wrong:\t${entry}`);
        };
        return false;
    }
  };

  // object handles
  return {
    define,
    appendNumber,
    clearOutput,
  };
};

export const Publisher = publisher();