const maxMessagesOnServer = 100

const WebSocket = require('ws')

const wss = new WebSocket.Server({ port: 8080 }, () => {
  console.log(`Server is running at 8080 port`)
})

let messages = []
const clients = new Set()

wss.on('connection', ws => {
  if (!clients.has(ws)) {
    console.log('New client has connected')

    for (let msg of messages) {
      if (messages.length) {
        ws.send(JSON.stringify(msg))
      }
    }

    clients.add(ws)
  }

  ws.on('message', data => {
    if (messages.length >= maxMessagesOnServer) {
      messages = messages.slice(50)
    }

    const msg = JSON.parse(data)

    messages.push(msg)
    clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(msg))
      }
    })
  })
  ws.on('close', () => {
    clients.delete(ws)
  })
})
