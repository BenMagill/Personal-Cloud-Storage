import React, {useState, useEffect, useContext} from 'react'
import {ApiContext} from "./ApiStore"
import {AuthContext} from "./AuthStore"

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

    const updateSettings = (newSettingsIn) => {
        const newSettings = {...settings, ...newSettingsIn}
        setSettings(newSettings)
        Api.UpdateSettings(newSettings, res => {
            console.log(res)
        })
    }

    const resetSettings = () => {
        Api.ResetSettings(res => {
            setSettings(res)
        })
    }

    return (
        <SettingsContext.Provider
            value = {{
                reload,
                settings,
                updateSettings,
                resetSettings,
                loaded
            }}
        >
            {props.children}
        </SettingsContext.Provider>
    )
    
}