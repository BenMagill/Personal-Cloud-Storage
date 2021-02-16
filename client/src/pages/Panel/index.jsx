import React, {useContext} from 'react'
import {Link, Switch, Route, Redirect} from "react-router-dom"
import { AuthContext } from '../../store/AuthStore'
import Settings from "./components/Settings"
import "./index.css"

export default function Index(props) {
    const Auth = useContext(AuthContext)
    return (
        <div>
            <div className="sidebar left">
                <Link to="/admin/settings">Settings</Link>
            </div>
            <div className="content">
                <Switch>
                    <Route path={"/admin"} exact component={Settings} />
                    <Route path={"/admin/settings"} component={Settings} />
                    <Route path={"/admin/logs"} component={Settings} />
                </Switch>
            </div>
            {Auth.loggedIn ? "" : <Redirect to="/login" />}
        </div>
    )
}
