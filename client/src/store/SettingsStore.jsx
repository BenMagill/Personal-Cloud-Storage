import React, {useState, useEffect, useContext} from 'react'
import {ApiContext} from "./ApiStore"
import {AuthContext} from "./AuthStore"

export const SettingsContext = React.createContext()

export function SettingsProvider(props){
    const Api = useContext(ApiContext)
    const Auth = useContext(AuthContext)
    const [settings, setSettings] = useState({})
    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        if (Auth.loggedIn) {
            Api.GetSettings(settings => {
                setSettings(settings)
                setLoaded(true)
            })    
        }
    }, [Auth.loggedIn])

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