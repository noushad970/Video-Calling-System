import  Express  from "express";
import { createServer} from "http";
import {Server} from "socket.io";
import { fileURLToPath } from "url";
import { dirname,join } from "path";
const app= Express();
const __dirname= dirname(fileURLToPath(import.meta.url))
const server= createServer(app);
const io= new Server(server);
app.get("/",(req,res)=>{
    console.log("Get Request");
    res.sendFile(join(__dirname+"/app/index.html"));
})
app.use(Express.static("public"));
app.listen(9000,()=>{
    console.log("Server listening on port 9000");
})
//handle socket connection
io.on("connection", (socket)=>{
console.log("Connected to socket server and socket ID is:",socket.id);
})