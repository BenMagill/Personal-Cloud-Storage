import React, {useContext, useEffect} from 'react'
import {AuthContext} from './AuthStore'
import {FileContext} from "./FileStore"

export const ApiContext = React.createContext()

export function ApiProvider(props){

    const auth = useContext(AuthContext)
    const fileStore = useContext(FileContext)

    const ApiRequest = (uri, method, params, cb) => {
    
        var body = {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        }
    
        if (params) body.body = JSON.stringify(params)
    
        fetch(uri, body)
            .then(res => res.json())
            .then(res => {
                if (res.message === "AUTH_FAILED") {
                    auth.setLoggedIn(false)
                } else{
                    auth.setLoggedIn(true)
                    cb(res)
                }
                auth.setLoaded(true)
                cb(res)
            })
    }

    const LoginRequest = (username, password) => {
        ApiRequest("/api/user/login", "POST", {username, password}, res => {
            console.log(res)
            if (res.success === true) {
                auth.setApiKey("keygozoom")
                auth.setUserData({name: "jeff"})
                auth.setLoggedIn(true)
                return true
            } else {
                return false
            }
        })
    }

    const GetFiles = () => {
        console.log("get all files")
        ApiRequest("/api/files/all", "GET", null, res => {
            console.log(res)
            fileStore.setFileStruct(res.data.Contents)
        })
    }

    return (
        <ApiContext.Provider
            value={{
                LoginRequest,
                GetFiles
            }}
        >

            {props.children}
        </ApiContext.Provider>
    )
}