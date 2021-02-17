import React from 'react';
import Navbar from "./components/Navbar"
import {BrowserRouter, Switch, Route} from "react-router-dom"
import { ToastContainer } from 'react-toastify'
import WelcomePage from "./pages/Welcome"
import FilesPage from "./pages/Files"
import RecentPage from "./pages/Recent"
import SearchPage from "./pages/Search"
import LoginPage from "./pages/Login"
import SettingsPage from "./pages/Settings"
import 'react-toastify/dist/ReactToastify.css'
import './App.css';

function App() {
    return (
        <div className="app">
            <BrowserRouter>
                <Navbar />
                <div className="body">
                    <Switch>
                        <Route path="/" exact component={WelcomePage} />
                        <Route path="/login" component={LoginPage} />
                        <Route path="/files" component={FilesPage} />
                        <Route path="/recent" component={RecentPage} />
                        <Route path="/settings" component={SettingsPage} />
                        <Route path="/search/:term" component={SearchPage} />
                        <Route path="/search" component={SearchPage} />
                    </Switch>
                </div>
            </BrowserRouter>
            <ToastContainer 
                position="bottom-right"
                // autoClose={5000}
                hideProgressBar={true}
                newestOnTop={false}
                pauseOnFocusLoss
                pauseOnHover/>
        </div>
    );
}

export default App;
