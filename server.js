const maxMessagesOnServer = 100

const WebSocket = require("ws")

const wss = new WebSocket.Server({port:8080})

let messages = []
let clients = []

wss.on("connection", ws =>{
    if (!clients.includes(ws)){
        clients.push(ws)
        console.log('New client has connected')
        for (let i = 0; i <= messages.length; i++){
            if (messages.length > 1){
                ws.send(messages[i])
            }

        }
    }
    ws.on("message", data =>{
        if (messages.length >= maxMessagesOnServer){
            messages = messages.slice(50)
        }
        messages.push(data)

        clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(data)
            }
        })
             console.log(`Somethig went wrong with the message: ${e.data}  `)
    })
})




