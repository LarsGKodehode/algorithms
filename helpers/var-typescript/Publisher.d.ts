/**
 * HTML code formatted as string literal
 */
declare type Definition = string;
/**
 * Handles to classnames in Definition
 */
declare type Handles = Array<string>;
/**
 * The DOM parent element you want as parent element
 */
declare type Target = HTMLElement;
/**
 * Object needed for defining output element
 */
interface PublisherDefineString {
    definition: Definition;
    handles: Handles;
    target: Target;
}
declare const Publisher: () => {
    /**
     * Required for setup of output format
     * @param {object} defineInfo object
     */
    define: (defineInfo: PublisherDefineString) => void;
    /**
     * Returns node as defined earlier.
     * @returns {HTMLElement}
     */
    appendNumber: (newNumber: any) => void;
};
export default Publisher;
