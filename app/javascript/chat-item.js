customElements.define("chat-item",
  class extends HTMLElement {
    constructor() {
      super()

      const template = document.getElementById("chat-item").content
      const shadowRoot = this.attachShadow({mode: "open"}).appendChild(templateContent.cloneNode(true))
  }
})
