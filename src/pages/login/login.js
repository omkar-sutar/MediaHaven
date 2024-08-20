import { useEffect, useState } from "react"
import "./login.css"
import { GetJWTToken, setJWTToken,UnauthorizedError} from "../media/apis"
import { Navigate } from "react-router-dom"

export default function Login(){

    const [showLogin,setShowLogin] = useState(true)

    // useEffect(()=>{
    //     // Set height of top level container to screen size
        
    //     document.getElementById("login-main-container").style.height=`${window.innerHeight}px`

    //     // Also add eventhandler to listen to screen resize events
    //     function setLoginContainerHeight(){
    //         document.getElementById("login-main-container").style.height=`${window.innerHeight}px`
    //     }
    //     window.addEventListener("resize",setLoginContainerHeight)
    //     return function(){
    //         window.removeEventListener("resize",setLoginContainerHeight)
    //     }
    // },[])

    function onLogin(){
        const username = document.getElementById("username").value
        const password = document.getElementById("password").value
        GetJWTToken(username,password).then((jsonData)=>{
            setJWTToken(jsonData.token)
            setShowLogin(false)
        }).catch((error)=>{
            if(error===UnauthorizedError){
                console.log("Invalid username/password")
                alert("Invalid credentials")
            }
            else if(error.message==="Failed to fetch"){
                alert("Backend service unreachable")
            }
            console.log("Error fetching jwt token, ",error.stack)
        })
    }
    if(!showLogin){
        return <Navigate to={"/media"}></Navigate>
    }

    return <>
<div id="login-main-container">
        <div className="login">
            <input type="text" className="login-username" id="username" placeholder="Username"></input>
            <input type="password" className="login-password" id="password" placeholder="Password"></input>
            <button onClick={onLogin}>Login</button>
        </div>
    </div>
    </>
}