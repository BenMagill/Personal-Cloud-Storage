import React, {useState, useEffect, useContext} from 'react'
import {ApiContext} from "./ApiStore"
import {AuthContext} from "./AuthStore"
import {toast} from "react-toastify"
import axios from "axios"

export const SettingsContext = React.createContext()

export function SettingsProvider(props){
    const Api = useContext(ApiContext)
    const Auth = useContext(AuthContext)
    const [settings, _setSettings] = useState(JSON.parse(sessionStorage.getItem("settings")) || {})
    const [loaded, setLoaded] = useState(false)

    const setSettings = (data) => {
        sessionStorage.setItem("settings", JSON.stringify(data))
        _setSettings(data)
    }

    useEffect(() => {
        if (Auth.loggedIn) {
            reload()
        }
    }, [Auth.loggedIn])

    const reload = () => {
        Api.GetSettings(settings => {
            setSettings(settings)
            setLoaded(true)
        })
    }

    const updateSettings = (newSettingsIn, cb) => {
        const newSettings = {...settings, ...newSettingsIn}
        setSettings(newSettings)
        var toastId = toast.info("Saving...")
        Api.UpdateSettings(newSettings, res => {
            console.log(res)
            toast.update(toastId, {render: "Updated settings", type: "success", autoClose: 5000})
            if (cb) cb()
        })
    }

    const resetSettings = (cb) => {
        var toastId = toast.info("Resetting...")
        Api.ResetSettings(res => {
            setSettings(res)
            toast.update(toastId, {render: "Reset all settings", type: "success", autoClose: 5000})
            if (cb) cb()
        })
    }

    const importSettings = (data) => {
        var toastId = toast.info("Uploading...")
        axios.post("/api/settings/import", data, {headers: {"content-type": "multipart/form-data"}})
            .then(res => {
                console.log(res)
                console.log("success")
                toast.update(toastId, {render: "Settings uploaded", type: "success"})
                reload()
            })
            .catch(err => {
                console.log("fail")
                toast.update(toastId, {render: "Error uploading", type: "error"})
            })
    }

    return (
        <SettingsContext.Provider
            value = {{
                reload,
                settings,
                updateSettings,
                resetSettings,
                loaded,
                importSettings
            }}
        >
            {props.children}
        </SettingsContext.Provider>
    )
    
}