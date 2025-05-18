import {TOKEN} from '../const/index'

const setToken=(token)=>{
    return sessionStorage.setItem(TOKEN,JSON.stringify(token))
}

const getToken=()=>{
    return sessionStorage.getItem(TOKEN)
}

const removeToken =()=>{
    return sessionStorage.removeItem(TOKEN)
}

export {getToken, setToken, removeToken}