import Rails from "@rails/ujs"

(() => {
  const formElement = document.querySelector("[data-role='chat-message']")

  if (!formElement) return

  const inputElement = formElement.querySelector("textarea")
  inputElement.addEventListener("keypress", submitFormOnEnter)

  formElement.addEventListener("submit", onFormSubmit)

  function submitFormOnEnter(event) {
    if (event.keyCode != 13) return
    event.preventDefault()

    if (inputElement.value !== "") Rails.fire(formElement, "submit")
  }

  function onFormSubmit() {
    setTimeout(() => { inputElement.value = "" })
  }
})()
