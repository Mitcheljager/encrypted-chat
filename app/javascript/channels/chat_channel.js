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
    const textElement = createChatItem(data)
    chatElement.append(textElement)

    textElement.scrollIntoView()
  }
})

function getUUID() {
  const uuid = wrapperElement ? wrapperElement.dataset.uuid : 0
  return uuid
}

function createChatItem(data) {
  const element = document.createElement("chat-item")
  element.setAttribute("username", data.username || "")
  element.setAttribute("color", data.color)
  element.setAttribute("timestamp", createTimestamp(data.timestamp))
  element.setAttribute("type", data.type || "message")

  element.innerText = data.content

  return element
}

function createTimestamp(timestamp) {
  const dateTime = new Date(timestamp)
  return `${ ("0" + dateTime.getHours()).slice(-2) }:${ ("0" + dateTime.getMinutes()).slice(-2) }:${ ("0" + dateTime.getSeconds()).slice(-2) }`
}
