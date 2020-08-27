import React, {useContext, useState} from 'react'
import {AuthContext} from "../../store/AuthStore"
import {ApiContext} from "../../store/ApiStore"
import {Form, Button} from "react-bootstrap"
import Redirect from "react-router-dom/Redirect"

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

    const onSubmit = () => {
        apiStore.LoginRequest(username, password)
    }
    return (
        <div>
            <h1 className="centerText">Login</h1>
            <Form onSubmit={onSubmit}>
                <Form.Group controlId="formBasicEText" >
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter Username here:" value={username} onChange={onUsernameChange}/>
                </Form.Group>
                <Form.Group controlId="formBasicPassword" >
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password here:" value={password} onChange={onPasswordChange}/>
                </Form.Group>
                <Button variant="primary" type="submit" onSubmut={onSubmit} onClick={onSubmit}>
                    Login
                </Button>
            </Form>

            {authStore.loggedIn ? <Redirect to="/" /> : ""}
        </div>
    )
}
