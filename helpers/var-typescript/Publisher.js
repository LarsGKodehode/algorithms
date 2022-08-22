;
;
const Publisher = () => {
    // ===== PUBLIC =====
    function define(defineInfo) {
        // Check if define info correct
        if (!defineInfoCorrect(defineInfo)) {
            console.warn(`Define info is non valid`);
            console.dir(defineInfo);
            return;
        }
        ;
        // All good. Create internal variables
        nodeMother = parsStringToNode(defineInfo.definition);
        motherlyHandles = attachHandles(nodeMother, defineInfo.handles);
        DOMTarget = defineInfo.target;
    }
    ;
    function appendNumber(newNumber) {
        // Set all variables in new element
        for (const entry in motherlyHandles) {
            motherlyHandles[entry].textContent = new Intl.NumberFormat(UserLanguage).format(newNumber[entry]);
        }
        ;
        // Create a deep copy of edited node
        const newNode = nodeMother.cloneNode(true);
        // Insert into DOM
        DOMTarget.appendChild(newNode);
    }
    ;
    // ===== PRIVATE =====
    // private members
    let nodeMother;
    let motherlyHandles;
    let DOMTarget;
    const UserLanguage = navigator.language; // Used for loacle specific number formatting
    /**
     * Putting all checks for definition we want to have here
     */
    function defineInfoCorrect(defineInfo) {
        // Required keys
        const requiredKeys = [
            "definition",
            "handles",
            "target",
        ];
        // Store any keys that is missing
        let missingKeys = [];
        for (const key of requiredKeys) {
            if (!(key in defineInfo)) {
                missingKeys.push(key);
            }
            ;
        }
        ;
        // Were there any missing keys?
        if (missingKeys.length > 0) {
            for (const entry of missingKeys) {
                console.warn(`Publisher defineInfo flawed. Missing key:\t${entry}`);
            }
            ;
            return false;
        }
        ;
        // We here? We good.
        return true;
    }
    ;
    /**
     * Parses string into DOM Node
     */
    function parsStringToNode(definition) {
        const nodeParsed = new DOMParser().parseFromString(definition, "text/html").body.firstChild;
        /**
         * Best way i could find for locally type 'casting'
         * @link https://stackoverflow.com/a/43525969
         */
        if (!(nodeParsed instanceof HTMLElement)) {
            const element = nodeParsed && nodeParsed.constructor || nodeParsed;
            throw new Error(`Expected element to be an HTMLElement, was ${element}`);
        }
        ;
        return nodeParsed;
    }
    ;
    /**
     * Returns refrences into DOM node
     */
    function attachHandles(element, handleNames) {
        let handles = {};
        // Query for all the .classNames
        for (const entry of handleNames) {
            const node = element.querySelector("." + entry);
            if (node) {
                handles[entry] = node;
            }
            ;
        }
        ;
        return handles;
    }
    ;
    /**
     * Returned handles
     */
    return {
        /**
         * Setup the internal "gallery"
         * @param {object} defineInfo object
         */
        define,
        /**
         * Add another number statistics to component
         */
        appendNumber,
    };
};
export default Publisher;
