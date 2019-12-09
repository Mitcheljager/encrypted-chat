import consumer from "./consumer"

const wrapperElement = document.querySelector("[data-uuid]")

consumer.subscriptions.create({ channel: "ChatChannel", uuid: getUUID() } , {
  connected() {
    console.log("We're connected, boys")
    console.log(this)
  },

  disconnected() {

  },

  received(data) {
    const chatElement = document.querySelector("[data-role='chat-container']")
    const textElement = data.type == "server" ? createServerItem(data) : createChatItem(data)
    chatElement.append(textElement)

    textElement.scrollIntoView()

    if (chatElement.dataset.expiration > 0) timeOutRemoveElement(textElement, chatElement.dataset.expiration)
  }
})

function getUUID() {
  const uuid = wrapperElement ? wrapperElement.dataset.uuid : 0
  return uuid
}

function createChatItem(data) {
  const element = document.createElement("div")
  element.classList.add("chat-item")
  element.innerText = data.content

  const usernameElement = document.createElement("span")
  usernameElement.classList.add("chat-item__user")
  usernameElement.style.color = data.color
  usernameElement.innerText = data.username

  const timeElement = createTimestamp(data.timestamp)

  element.prepend(usernameElement)
  element.append(timeElement)

  return element
}

function createServerItem(data) {
  const element = document.createElement("div")
  element.classList.add("chat-item")
  element.classList.add("chat-item--server")
  element.innerText = data.content

  const timeElement = createTimestamp(data.timestamp)

  element.append(timeElement)

  return element
}

function createTimestamp(timestamp) {
  const dateTime = new Date(timestamp)
  const timeElement = document.createElement("span")
  timeElement.classList.add("chat-item__time")
  timeElement.title = timestamp
  timeElement.innerText = `${ ("0" + dateTime.getHours()).slice(-2) }:${ ("0" + dateTime.getMinutes()).slice(-2) }:${ ("0" + dateTime.getSeconds()).slice(-2) }`

  return timeElement
}

function timeOutRemoveElement(element, time) {
  const timerElement = document.createElement("div")
  timerElement.classList.add("chat-item__timer")
  timerElement.style.animationDuration = time + "s"

  element.append(timerElement)

  setTimeout(() => { element.classList.add("chat-item--is-fading-out") }, time * 1000)
  element.addEventListener("transitionend", () => {
    element.remove()
  })
}

function buildChatItem() {
  customElements.define("chat-item",
    class ChatItem extends HTMLElement {
      connectedCallback() {
        this.addEventListener("click", this.removeElement)
      }

      constructor() {
        super()

        const template = document.createElement("template")
        template.innerHTML = `
          <div class="toast">
            <slot></slot>

            <div part="progress"></div>
          </div>
        `

        const shadowRoot = this.attachShadow({mode: "open"})
        shadowRoot.appendChild(template.content.cloneNode(true))

        this.startProgress()
        this.determinePosition()
      }

      determinePosition() {
        const elements = document.querySelectorAll("toast-message")

        if (elements.length <= 1) return

        const offset = elements[1].getBoundingClientRect()
        const elementHeight = elements[1].offsetHeight
        const screenHeight = document.documentElement.clientHeight

        this.style.bottom = `calc(1rem + (${ screenHeight - offset.y }px))`
      }

      startProgress() {
        const progressElement = this.shadowRoot.querySelector("[part='progress']")
        progressElement.style.width = "100%"
        setTimeout(() => { progressElement.style.width = 0 })
        setTimeout(() => { this.removeElement() }, 3000)
      }

      removeElement() {
        this.classList.add("is-fading-out")

        setTimeout(() => {
          this.remove()
        }, 500)
      }
    }
  )
}
