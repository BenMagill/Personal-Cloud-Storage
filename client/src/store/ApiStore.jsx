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

    const RenameFile = (oldName, newName, cb) => {
        ApiRequest("/api/files/item/rename", "POST", {oldName, newName}, res => {
            cb(res)
        })
    }

    const DeleteFile = (name) => {
        console.log(name)
        ApiRequest("/api/files/item/delete", "POST", {name}, res => {
            console.log(res)
            GetFiles()
        })
    }

    const DeleteFolder = (path) => {
        ApiRequest("/api/files/folder/delete", "POST", {path}, res => {
            GetFiles()
        })
    }

    const CreateFolder = (path) => {
        ApiRequest("/api/files/folder/new", "POST", {path}, res => {
            GetFiles()
        })
    }

    const GetRecents = (cb) => {
        ApiRequest("/api/files/recent", "GET", null, res => {
            cb(res)
        })
    }

    const RenameFolder = (oldName, newName, cb) => {
        ApiRequest("/api/files/folder/rename", "POST", {oldName, newName}, res => {
            cb(res)
        })
    }

    const Search = (searchTerm, cb) => {
        ApiRequest("/api/files/search?searchTerm="+searchTerm, "GET", null, res => {
            cb(res)
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
                DeleteFile,
                CreateFolder,
                DeleteFolder,
                GetRecents,
                RenameFolder,
                Search
            }}
        >
            {props.children}
        </ApiContext.Provider>
    )
}