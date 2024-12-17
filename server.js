import Express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
const app = Express();
const __dirname = dirname(fileURLToPath(import.meta.url))
const server = createServer(app);
const io = new Server(server);
const allUser= {};
app.get("/", (req, res) => {
    console.log("Get Request");
    res.sendFile(join(__dirname + "/app/index.html"));
})
app.use(Express.static("public"));
server.listen(9000, () => {
    console.log("Server listening on port 9000");
})
//handle socket connection
io.on("connection", (socket) => {
    console.log("Connected to socket server and socket ID is:", socket.id);
    socket.on("join-user", username => {
        console.log("User joined. Username", username);
        allUser[username]={username,id:socket.id};
        io.emit("joined",allUser);
    });
    socket.on("offer",({from,to,offer})=>{
        io.to(allUser[to].id).emit("offer",{from,to,offer});
    })
    socket.on("answer",({from,to,answer})=>{
        io.to(allUser[from].id).emit("answer",{from,to,answer});
    })
    socket.on("end-call",({from,to})=>{
        io.to(allUser[to].id).emit("end-call",{from,to});
    });
    socket.on("icecandidate",candidate=>{
        //broadcast to other candidate
        socket.broadcast.emit("icecandidate",candidate)
    });
}) 