import React, {useContext, useState, useEffect} from 'react'
import {Navbar, Form, FormControl, Button, Nav} from "react-bootstrap"
import {Link, withRouter} from "react-router-dom"
import { AuthContext } from '../../store/AuthStore'
import "./index.css"

export default withRouter(function Index(props) {
    const Auth = useContext(AuthContext)
    const [searchTerm, setSearchTerm] = useState("")
    const isSearchPage = props.location.pathname === "/search"

    const handleLogout = () => {
        Auth.setLoggedIn(false)
        Auth.setUserData({})
        document.cookie = "Auth=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;"
    }

    const handleSearch = (e) => {
        if (e) e.preventDefault()
        console.log(searchTerm)
        props.history.push({
            pathname: "/search/"+searchTerm,
        })
    }

    return (
        <div>
            {Auth.loggedIn? 
                <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
                <Navbar.Brand>PCS</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="#features">Files</Nav.Link>
                        <Nav.Link href="#pricing">Recent</Nav.Link>
                    </Nav>
                    <Nav>
                        <Form inline onSubmit={handleSearch}>
                            <FormControl className="searchBar" placeholder="Search..." value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} />
                            <Button type="submit" >Go</Button>
                        </Form>
                    </Nav>
                    <Nav>
                        <Nav.Link href="#deets">Settings</Nav.Link>
                        <Nav.Link href="#memes">Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                </Navbar>
            :null}
        </div>
    )
})


function index() {
    return (
        <div>

        </div>
    )
}
