const createUserBtn=document.getElementById("create-user");
const username=document.getElementById("username");
const socket= io();
const allUsersHtml= document.getElementById("allusers");
const PeerConnection=(function(){
    let peerConnection;
    const createPeerConnection=()=>{
        const confg={
            iceServers:[
                {
                    urls:'stun:stun.l.google.com:19302'
                }
            ]
        };
        peerConnection=new RTCPeerConnection(confg);
    }
    return {
        getInstance:()=>{
            if(!peerConnection){
                peerConnection=createPeerConnection();
            }
            return peerConnection;
        }
    }
})()
// handle browser events
createUserBtn.addEventListener("click",(e)=>{
    if(username.value!=="")
    {
       const usernameContainer = document.querySelector(".username-input");
        socket.emit("join-user", username.value);
        usernameContainer.style.display = 'none';
    }
})

// handle socket events
socket.on("joined",allUsers=>{
    
    console.log("All Users: ",allUsers);
    const createUsershtml=()=>{
        allUsersHtml.innerHTML="";
        for(const user in allUsers){
            const li=document.createElement("li");
            li.textContent=`${user} ${user=== username.value? "(You)":""}`
        if(user!==username.value){
            const button=document.createElement("button");
            button.classList.add("call-btn");
            button.addEventListener("click",(e)=>{
                startCall(user);
            })
            const img= document.createElement("img");
            img.setAttribute("src","/images/phone.png");
            img.setAttribute("width",20);
            button.appendChild(img);
            li.appendChild(button);
        }
        allUsersHtml.appendChild(li);
        }
    }
    createUsershtml();
})
startCallMethod=(user)=>{
console.log("User in Call: ",user);
}

//initialize app
const startMyVideo=async()=>{
    try{
        const stream= await navigator.mediaDevices.getUserMedia({audio:true,video:true});
        console.log({stream});
    }catch(e){
        console.log("Errors: ",console.error());

    }
}
startMyVideo();