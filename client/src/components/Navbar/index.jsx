import React from 'react'
import {Navbar} from "react-bootstrap"
import {Link} from "react-router-dom"
import "./index.css"

export default function Index() {
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Link className="navbarLink" to="/files">Files</Link>
                <Link className="navbarLink" to="/recent">Recent</Link>
            </Navbar>
        </div>
    )
}
