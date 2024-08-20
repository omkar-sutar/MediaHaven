

const tokenKey="token"
const imageQualityKey = "imageQuality"

export function retriveJWTToken(){
    return localStorage.getItem(tokenKey)
}
export function setJWTToken(token){
    localStorage.setItem(tokenKey,token)
}

export function deleteJWTToken(){
    localStorage.removeItem(tokenKey)
}

export function setImageQuality(val){
    localStorage.setItem(imageQualityKey,val)
}

export function retrieveImageQuality() {
    const quality = localStorage.getItem(imageQualityKey);
    return quality ? parseInt(quality) : 30;
  }