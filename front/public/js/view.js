const hidden = document.querySelector("#hidden")
const content = document.querySelector("#content")

const contentValue = hidden.value
content.innerHTML = `${contentValue}`
