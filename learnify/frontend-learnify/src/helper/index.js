import {TOKEN} from '../const/index'

const setToken=(token)=>{
    return localStorage.setItem(TOKEN,JSON.stringify(token))
}

const getToken=()=>{
    return localStorage.getItem(TOKEN)
}

const removeToken =()=>{
    return localStorage.removeItem(TOKEN)
}

export {getToken, setToken, removeToken}