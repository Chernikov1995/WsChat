const button = document.querySelector('.sendmessage')
const msg = document.querySelector('.inputmessage')
const messages = document.querySelector('.outputmessages')
const status = document.querySelector('.status')
const userName = `user${~~(Math.random() * 10)}`

const ws = new WebSocket('ws://localhost:8080')

ws.onopen = (event) => {
  status.innerHTML = 'Client Status: Online'
}

ws.onclose = (event) => {
  status.innerHTML = 'Client Status: Offline'
}

ws.onmessage = (event) => {
  const ms = JSON.parse(event.data)
  const newMessage = `<p> ${ms.user} : ${ms.text} </p>`
  const messageNode = document.createElement('div')

  messageNode.innerHTML = newMessage
  messages.append(messageNode)
}

ws.onerror = (event) => {
  status.innerHTML = `Client status: Offline, Error Code: ${event.code}`
}

function buttonHandler (event) {
  event.preventDefault()

  const message = {
    user: userName,
    text: msg.value
  }

  if (msg.value === '') {
    alert('Invalid input')
  } else {
    ws.send(JSON.stringify({ ...message }))
    msg.value = ''
  }
}

button.addEventListener('click', buttonHandler)

document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    buttonHandler(event)
  }
})
