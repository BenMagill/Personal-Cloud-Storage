import React, {useContext} from 'react'
import {AuthContext} from '../store/AuthStore'

export const ApiContext = React.createContext()

export function ApiProvider(props){

    const auth = useContext(AuthContext)

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

    const LoginRequest = (type, username, password) => {
        // ApiRequest("/api/user/login", "POST", {username, password}, res => {
        //     console.log(res)
        //     if (res.message === "AUTH_SUCCESS") {
        //         auth.setLoggedIn(true)
        //     }
        // })
        auth.setLoggedIn(true)
        auth.setUserType(type.toLowerCase())
        auth.setApiKey("keygozoom")
        auth.setUserData({name: "jeff"})

        return true
    }

    return (
        <ApiContext.Provider
            value={{
                LoginRequest
            }}
        >

            {props.children}
        </ApiContext.Provider>
    )
}