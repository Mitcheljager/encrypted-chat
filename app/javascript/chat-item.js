customElements.define("chat-item",
  class ChatItem extends HTMLElement {
    constructor() {
      super()

      const template = document.getElementById("chat-item")
      const shadowRoot = this.attachShadow({mode: "open"})
      shadowRoot.appendChild(template.content.cloneNode(true))
    }

    connectedCallback() {
      const usernameElement = this.shadowRoot.querySelector("[part='username']")
      if (this.getAttribute("username")) {
        usernameElement.innerText = this.getAttribute("username")
        usernameElement.style.color = this.getAttribute("color")
      } else {
        usernameElement.remove()
      }

      const timestampElement = this.shadowRoot.querySelector("[part='timestamp']")
      timestampElement.innerText = this.getAttribute("timestamp")

      const timerElement = this.shadowRoot.querySelector("[part='timer']")
      const time = document.querySelector("[data-role='chat-container']").dataset.expiration
      time > 0 ? this.initiateCountdown(time, timerElement) : timerElement.remove()
    }

    initiateCountdown(time, element) {
      element.style.animationDuration = time + "s"
      element.style.background = `#606060`

      let i = 0
      const interval = setInterval(() => {
        element.style.background = `conic-gradient(#606060 ${ 100 - (i * 2) }%, transparent 0%)`

        i >= 50 ? clearInterval(interval) : i++
      }, (time / 50) * 1000)

      setTimeout(() => { this.classList.add("is-fading-out") }, time * 1000)
      this.addEventListener("transitionend", () => {
        this.remove()
      })
    }
  }
)
