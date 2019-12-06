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
