import React, {useState} from 'react'

export const AuthContext = React.createContext()

export function AuthProvider(props){
    const [loggedIn, setLoggedInInt] = useState(sessionStorage.getItem("loggedIn") || false)
    const [userType, setUserTypeInt] = useState(sessionStorage.getItem("userType") || "")
    const [apiKey, setApiKeyInt] = useState(sessionStorage.getItem("apiKey") || "")

    const [userData, setUserDataInt] = useState(JSON.parse(sessionStorage.getItem("userData")) || {})

    const setLoggedIn = (e) => {
        sessionStorage.setItem("loggedIn", e)
        setLoggedInInt(e)
    }

    const setUserType = (e) => {
        sessionStorage.setItem("userType", e)
        setUserTypeInt(e)
    }
    
    const setApiKey = (e) => {
        sessionStorage.setItem("apiKey", e)
        setApiKeyInt(e)
    }

    const setUserData = (e) => {
        sessionStorage.setItem("userData", JSON.stringify(e))
        setUserDataInt(e)
    }

    return (
        <AuthContext.Provider
            value = {{
                loggedIn,
                setLoggedIn,
                userType,
                setUserType,
                apiKey,
                setApiKey,
                userData,
                setUserData
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
    
}