const SocketIO = require("socket.io")
const axios = require("axios")
const crypto = require("crypto")
const JWT = require("../lib/jwt")
const SALT = process.env.SALT || "test"
const jwt = new JWT({ crypto })

module.exports = async (server, app) => {
    const io = SocketIO(server, { path: "/socket.io" })
    const noti = io.of("/notify")
    io.on("connection", (socket) => {
        //data 이벤트 발생시
        socket.on("data", ({ data, userNick }) => {
            const json = {
                chunk: userNick,
                data,
            }
            console.log(JSON.stringify(json))
            socket.broadcast.emit("reply", JSON.stringify(json))
        })

        //hello 이벤트 발생시
        socket.on("hello", (data) => {
            console.log(data)
        })
    })
    noti.on("connection", (socket) => {
        const token = socket.handshake.headers.cookie.slice(6)
        // const { userId } = jwt.verify(token, SALT)
        socket.on(`notify`, ({ boardWriter, data }) => {
            socket.join(boardWriter)
            const json = {
                boardWriter,
                data,
            }
            socket.to(boardWriter).emit("notify", JSON.stringify(json))
        })
    })
}
