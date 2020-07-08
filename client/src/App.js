import React from 'react';
import Navbar from "./components/Navbar"
import {BrowserRouter, Switch, Route} from "react-router-dom"
import WelcomePage from "./pages/Welcome"
import FilesPage from "./pages/Files"
import RecentPage from "./pages/Recent"
import LoginPage from "./pages/Login"
import './App.css';

function App() {
    return (
        <div className="app">
            <BrowserRouter>
                <Navbar />
                <div className="main">
                    <div className="body">
                        <Switch>
                            <Route path="/" exact component={WelcomePage} />
                            <Route path="/login" component={LoginPage} />
                            <Route path="/files" component={FilesPage} />
                            <Route path="/recent" component={RecentPage} />
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
