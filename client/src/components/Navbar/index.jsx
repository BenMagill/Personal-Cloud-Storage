import React, {useContext, useState} from 'react'
import {Navbar, Form, FormControl, Button} from "react-bootstrap"
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
            <Navbar bg="light" expand="lg">
                {Auth.loggedIn? 
                <div style={{display: "flex", justifyContent: "space-between", width: "100%"}}>
                    <div>
                        <Link className="navbarLink" to="/files">Files</Link>
                        <Link className="navbarLink" to="/recent">Recent</Link>
                    </div>

                    <div>
                        <Form inline onSubmit={handleSearch}>
                            <FormControl placeholder="Search..." value={searchTerm} onChange={e=>setSearchTerm(e.target.value)} />
                            <Button type="submit" >Go</Button>
                        </Form>
                    </div>

                    <div>
                        <Link className="navbarLink" onClick={handleLogout}>Logout</Link>
                    </div>
                </div>
                :null}
            </Navbar>
        </div>
    )
})
