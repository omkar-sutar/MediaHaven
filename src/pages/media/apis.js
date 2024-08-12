
const serverurl = process.env.REACT_APP_SERVER_URL || "http://localhost:5001";

const listmediaurl = serverurl+"/api/media"
const getThumbnailUrl = serverurl + "/api/media/thumbnails"
const getJWTTokenUrl = serverurl + "/login"

export const UnauthorizedError = new Error("Unauthorized")
const tokenKey="token"

export function retriveJWTToken(){
    return localStorage.getItem(tokenKey)
}
export function setJWTToken(token){
    localStorage.setItem(tokenKey,token)
}

export function deleteJWTToken(){
    localStorage.removeItem(tokenKey)
}

export  async function GetFilenames(){
    const url = new URL(listmediaurl)
        const queryParams={
            "sortby":"ctime", "orderby":"desc"
        }
        for (let key in queryParams){
            url.searchParams.set(key,queryParams[key])
        }

        try{    
            const response = await fetch(url,{
                method:"GET",
            headers:{
                "x-access-token":retriveJWTToken()
            }
            })
            if(response.status===401){
                throw UnauthorizedError
            }
            const jsonData = await response.json()
            return jsonData
        }catch(error){
            console.error("Error fetching data:", error);
            throw error;
        }
}

export async function GetThumbnails(filenames) {
    const url = new URL(getThumbnailUrl)
    const body={
        "filenames":filenames
    }
    const response = await fetch(url,{
        body:JSON.stringify(body),
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "x-access-token":retriveJWTToken()
            }
    })
    if(response.status===401){
        throw UnauthorizedError
    }
    const jsonData= await response.json()
    return jsonData.thumbnails
}


export async function GetJWTToken(username,password) {
    const url = new URL(getJWTTokenUrl)
    const body={
        "username":username,
        "password":password
    }
    const response = await fetch(url,{
        body:JSON.stringify(body),
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        }
    })
    if(response.status===401){
        throw UnauthorizedError
    }
    console.log(response)
    const jsonData= await response.json()
    if(!jsonData.token){
        throw new Error("Token not fount in response")
    }
    return jsonData
}