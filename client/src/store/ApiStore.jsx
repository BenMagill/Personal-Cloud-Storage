import React, {useContext, useEffect} from 'react'
import {AuthContext} from './AuthStore'
import {FileContext} from "./FileStore"

export const ApiContext = React.createContext()

export function ApiProvider(props){

    const auth = useContext(AuthContext)
    const fileStore = useContext(FileContext)

    const ApiRequest = (uri, method, params, cb) => {
        console.log(uri)
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
                auth.setLoggedIn(false)
                return false
            }
        })
    }

    const CheckAuth = () => {
        ApiRequest("/api/user/", "GET", null, res => {})
    }

    const GetFiles = () => {
        console.log("get all files")
        ApiRequest("/api/files/all", "GET", null, res => {
            console.log(res)
            fileStore.setFileStruct(res.data.Contents)
        })
    }

    const DownloadFile = (filepath) => {
        console.log(filepath)
        ApiRequest("/api/files/item/"+encodeURIComponent(filepath), "GET", null, res => {
            console.log(res)
        })
    }

    const RenameFile = (oldName, newName) => {
        ApiRequest("/api/files/item/rename", "POST", {oldName, newName}, res => {
            console.log(res)
            GetFiles()
        })
    }

    const DeleteFile = (name) => {
        console.log(name)
        ApiRequest("/api/files/item/delete", "POST", {name}, res => {
            console.log(res)
            GetFiles()
        })
    }

    return (
        <ApiContext.Provider
            value={{
                LoginRequest,
                GetFiles,
                DownloadFile,
                CheckAuth,
                RenameFile,
                DeleteFile
            }}
        >
            {props.children}
        </ApiContext.Provider>
    )
}