// Format of define object
type Defention = string;
type Handles = Array<string>;
type Target = HTMLElement; // Is this the correct HTML element?

interface PublisherDefineString {
  // HTML element as string
  definition: Defention,
  // Classname handles into HTML element
  handles: Handles,
  // DOM node to append result to
  target: Target,
};

// Structure of handles we have implemented
interface VirtualNodeHandles {
  [key: string]: HTMLElement,
};


const Publisher = () => {
  // ===== PUBLIC =====

  /**
   * Setup the internal "gallery"
   * @param {object} defineInfo object
   */
  function define(defineInfo: PublisherDefineString): void {
    // Check if define info correct
    if(!defineInfoCorrect(defineInfo)) {
      console.warn(`Define info is non valid`);
      console.dir(defineInfo);
      return;
    };

    // All good. Create internal variables
    const nodeMother = parsStringToNode(defineInfo.definition);
    const motherlyHandles = attachHandles(nodeMother, defineInfo.handles);
    const DOMTarget = defineInfo.target;
  };

  /**
   * Add another number statistics to component
   */
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
      'definition',
      'handles',
      'target',
    ];

    // Store any keys that is missing
    const flawed = requiredKeys.map((key) => {
      if(!(key in defineInfo)) {
        return key;
      };
    });

    // Were there any missing keys?
    if(flawed) {
      for(const entry of flawed) {
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
  function parsStringToNode(definition: Defention): HTMLElement {
    const nodeParsed = new DOMParser().parseFromString(definition, "text/html").body.firstChild;

    /**
     * Best way i could find for locally type 'casting'
     * @link https://stackoverflow.com/a/43525969
     */
    if (!(nodeParsed instanceof HTMLElement)) {
      const element = nodeParsed && nodeParsed.constructor && nodeParsed.constructor.name || nodeParsed;
      throw new Error(`Expected element to be an HTMLElement, was ${element}`);
    };

    return nodeParsed;
  };

  /**
   * Returns refrences into DOM node
   */
  function attachHandles(element: HTMLElement, handleNames: Handles): VirtualNodeHandles {
    let handles = {};
    // Query for all the .classNames
    for(const entry of handleNames) {
      handles[entry] = element.querySelector("." + entry);
    };
    

    return handles;
  };


  return {
    define,
    appendNumber,
  };
};

export default Publisher;