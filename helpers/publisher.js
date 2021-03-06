const publisher = (OPTIONS = false) => {

  // ===== PUBLIC METHODS =====
  function define(createInfo) {
    // Checks if valid createInfo supplied
    if(!createInfoValid(createInfo)) {
      console.warn(`CreateInfo is invalid:`);
      console.dir(createInfo);
      return;
    };

    // All good. Set internal variable
    nodeMother = parseStringToNode(createInfo.definition);
    motherlyHandles = attachHandles(nodeMother, createInfo.handles);
    DOMTarget = createInfo.target;
  };


  function appendNumber(newNumber) {
    // set all variables in new element
    for(const entry in motherlyHandles) {
      motherlyHandles[entry].textContent = new Intl.NumberFormat(UserLanguage).format(newNumber[entry]);
    };

    // Clone edited node
    const newNode = nodeMother.cloneNode("deep");

    // Insert into DOM
    DOMTarget.appendChild(newNode);
  };


  async function clearOutput() {
    console.log(`NOT YET INPLEMENTED`);
  };


  // ===== PRIVATE MEMBERS =====
  let DOMTarget; // Holds place in DOM to add display
  let nodeMother; // Keeps the mother around
  let motherlyHandles; // Handles for mother node

  /** Acquire user prefered properties */
  const UserLanguage = navigator.language;

  // ===== PRIVATE METHODS =====
  // Checks that all the pices is there, verbose when flawed
  function createInfoValid(createInfo) {
    let faulty = [];

    // Keys that are recquired
    const correctkeys = [
      "definition",
      "handles",
      "target",
    ];

    // Check if all the keys are there, we don't care if we got more
    for(const key of correctkeys) {
      if(!(key in createInfo)) {
        faulty.push(key);
      };
    };


    // Decide on outcome
    const epxression = faulty.length;
    switch (epxression) {
      case 0:
        return true;
      default:
        for(entry of faulty) {
          console.warn(`Missing key in:`);
          console.dir(entry);
        };
        return false;
    }
  };

  // Parses string to DOM Node
  function parseStringToNode(string) {
    const nodeParsed = new DOMParser().parseFromString(string, "text/html").body.firstChild;
    return nodeParsed;
  };

  // Attaches handles to DOM elemente
  function attachHandles(element, handleNames) {
    // Return object
    let handles = {};
    // Run though handle names
    for(const entry of handleNames) {
      handles[entry] = element.querySelector("." + entry);
    };

    // Return
    return handles;
  };

  // Object handles
  return {
    /**
     * Recquired to internally setup the "gallery".
     * @param {object} createInfo object
     */
    define,
    /**
     * Add another number to "gallery"
     * @param {object} newNumber {
        end-number,
        {longestRunning},
        {highestScor}
      };
     */
    appendNumber,
    /**
     * NOT YET IMPLEMENTED
     */
    //clearOutput,
  };
};

export const Publisher = publisher();