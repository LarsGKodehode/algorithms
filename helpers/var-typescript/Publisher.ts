/**
 * HTML code formatted as string literal
 */
type Definition = string;

/**
 * Handles to classnames in Definition
 */
type Handles = Array<string>;

/**
 * The DOM parent element you want as parent element
 */
type Target = HTMLElement;

/**
 * Object needed for defining output element
 */
interface PublisherDefineString {
  // HTML element as string
  definition: Definition,
  // Classname handles into HTML element
  handles: Handles,
  // DOM node to append result to
  target: Target,
};

// Internal types
// Structure of handles we have implemented
interface VirtualNodeHandles {
  [key: string]: Element,
};


const Publisher = () => {
  // ===== PUBLIC =====

  function define(defineInfo: PublisherDefineString): void {
    // Check if define info correct
    if(!defineInfoCorrect(defineInfo)) {
      console.warn(`Define info is non valid`);
      console.dir(defineInfo);
      return;
    };

    // All good. Create internal variables
    nodeMother = parsStringToNode(defineInfo.definition);
    motherlyHandles = attachHandles(nodeMother, defineInfo.handles);
    DOMTarget = defineInfo.target;
  };

  function appendNumber(newNumber: any): void {
    // Set all variables in new element
    for(const entry in motherlyHandles) {
      motherlyHandles[entry].textContent = new Intl.NumberFormat(UserLanguage).format(newNumber[entry]);
    };

    // Create a deep copy of edited node
    const newNode = nodeMother.cloneNode(true);

    // Insert into DOM
    DOMTarget.appendChild(newNode);
  };


  // ===== PRIVATE =====

  // private members
  let nodeMother: HTMLElement;
  let motherlyHandles: VirtualNodeHandles;
  let DOMTarget: Target;
  const UserLanguage = navigator.language; // Used for loacle specific number formatting

  /**
   * Putting all checks for definition we want to have here
   */
  function defineInfoCorrect(defineInfo: PublisherDefineString): boolean {
    // Required keys
    const requiredKeys = [
      "definition",
      "handles",
      "target",
    ];

    // Store any keys that is missing
    let missingKeys: Array<string> = [];
    for(const key of requiredKeys) {
      if(!(key in defineInfo)) {
        missingKeys.push(key);
      };
    };

    // Were there any missing keys?
    if(missingKeys.length > 0) {
      for(const entry of missingKeys) {
        console.warn(`Publisher defineInfo flawed. Missing key:\t${entry}`);
      };
      return false;
    };

    // We here? We good.
    return true;
  };

  /**
   * Parses string into DOM Node
   */
  function parsStringToNode(definition: Definition): HTMLElement {
    const nodeParsed = new DOMParser().parseFromString(definition, "text/html").body.firstChild;

    /**
     * Best way i could find for locally type 'casting'
     * @link https://stackoverflow.com/a/43525969
     */
    if (!(nodeParsed instanceof HTMLElement)) {
      const element = nodeParsed && nodeParsed.constructor || nodeParsed;
      throw new Error(`Expected element to be an HTMLElement, was ${element}`);
    };

    return nodeParsed;
  };

  /**
   * Returns refrences into DOM node
   */
  function attachHandles(element: HTMLElement, handleNames: Handles): VirtualNodeHandles {
    let handles: VirtualNodeHandles = {};
    // Query for all the .classNames
    for(const entry of handleNames) {
      const node = element.querySelector("." + entry);
      if(node) {
        handles[entry] = node;
      };
    };

    return handles;
  };

  /**
   * Returned handles
   */
  return {
    /**
     * Required for setup of output format
     * @param {object} defineInfo object
     */
    define,
    /**
     * Returns node as defined earlier.
     * @returns {HTMLElement}
     */
    appendNumber,
  };
};

export default Publisher;