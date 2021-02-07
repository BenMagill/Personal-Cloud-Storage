import React, {useContext} from 'react'
import {Navbar} from "react-bootstrap"
import {Link} from "react-router-dom"
import { AuthContext } from '../../store/AuthStore'
import "./index.css"

export default function Index() {
    const Auth = useContext(AuthContext)

    const handleLogout = () => {
        Auth.setLoggedIn(false)
        Auth.setUserData({})
    }


    return (
        <div>
            <Navbar bg="light" expand="lg">
                {Auth.loggedIn? 
                <div style={{display: "flex", justifyContent: "space-between", width: "100%"}}>
                    <div>
                        <Link className="navbarLink" to="/files">Files</Link>
                        <Link className="navbarLink" to="/recent">Recent</Link>
                    </div>

                    <div>{/* Search goes here */}</div>

                    <div>
                        <Link className="navbarLink" onClick={handleLogout}>Logout</Link>
                    </div>
                </div>
                :null}
            </Navbar>
        </div>
    )
}
