import React, {useContext} from 'react'
import Redirect from "react-router-dom/Redirect"
import {AuthContext} from "../../store/AuthStore"

export default function Index() {
    const authStore = useContext(AuthContext)
    return (
        <div>
            {authStore.loggedIn ? "" : <Redirect to="/login" />}
        </div>
    )
}
