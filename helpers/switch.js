const toggle = () => {
  // ===== PUBLIC =====
  /**
   * Toggle design by Jon Kantner, 2019
   * @link https://jonkantner.com/
   * @param {*} createInfo 
   * @returns 
   */
  function JonKantner(createInfo) {
    // Node definition
    const newNodeRaw = `
    <label for="toggle" class="toy-toggle">
      <span class="border1"></span>
      <span class="border2"></span>
      <span class="border3"></span>
      <span class="handle">
      <span class="handle-off"></span>
      <span class="handle-on"></span>
      </span>
    </label>
    `;

    // Parse to DOM node
    const newNode = new DOMParser().parseFromString(newNodeRaw, "text/html").body;

    // get elements
    console.log(newNode);
    const toyToggle = newNode.querySelector("toy-toggle");
    const input = newNode.querySelector("input");
    const span = newNode.querySelectorAll("span");
    const border1 = newNode.querySelector("border1");
    const border2 = newNode.querySelector("border2");
    const border3 = newNode.querySelector("border3");
    const handle = newNode.querySelector("handle");
    const handleOff = newNode.querySelector("handle-off");
    const handleOn = newNode.querySelector("handle-on");

    console.log(toyToggle);
    setCSS(toyToggle, {
      "background": "radial-gradient(at top left,#fff 10%,#fff0 20%), radial-gradient(at top right,#fff 20%,#e4e4e4 35%)",
      "border-radius": "6em",
      "box-shadow": "0 0 0.25em #0002, 0 3em 1.5em 0.5em #0002",
      "cursor": "pointer",
      "display": "block",
      "font-size": "12px",
      "position": "relative",
      "margin": "auto",
      "width": "20em",
      "height": "12em",
      "-webkit-tap-highlight-color": "transparent",
      });

    setCSS(input, {
        "position": "fixed",
        "transform": "translateX(-100%)",
    });

    return newNode.firstChild;
  };

  // ===== PRIVATE =====
  function setCSS(element, style) {
    for (const property in style) {
        element.style[property] = style[property];
    };
  };



  return {
    JonKantner,
  }};

  export const Toggle = toggle();