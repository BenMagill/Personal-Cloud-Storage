import React, {useContext, useState} from 'react'
import {AuthContext} from "../../store/AuthStore"
import {ApiContext} from "../../store/ApiStore"
import {Form, Button} from "react-bootstrap"
import Redirect from "react-router-dom/Redirect"
import "./index.css"

export default function Login() {
    const authStore = useContext(AuthContext)
    const apiStore = useContext(ApiContext)

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const onUsernameChange = (e) => {
        setUsername(e.target.value)
        e.preventDefault()
    }

    const onPasswordChange = (e) => {
        setPassword(e.target.value)
        e.preventDefault()
    }

    const onSubmit = (e) => {
        if (e) e.preventDefault()
        apiStore.LoginRequest(username, password)
    }
    return (
        <div className="loginContainer">
            <div className="login">
                <h1 className="loginText">Sign in</h1>
                <Form onSubmit={onSubmit}>
                    <Form.Group controlId="formBasicEText" >
                        <Form.Control type="text" placeholder="Username" value={username} onChange={onUsernameChange}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword" >
                        <Form.Control type="password" placeholder="Password" value={password} onChange={onPasswordChange}/>
                    </Form.Group>
                    <Button variant="primary" type="submit" onSubmit={onSubmit} onClick={onSubmit}>
                        Login
                    </Button>
                </Form>
            </div>

            {authStore.loggedIn ? <Redirect to="/" /> : ""}
        </div>
    )
}
