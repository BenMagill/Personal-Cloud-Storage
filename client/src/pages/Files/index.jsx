import React, {useContext, useState, useEffect} from 'react'
import "./index.css"
import Redirect from "react-router-dom/Redirect"
import {AuthContext} from "../../store/AuthStore"
import FileRenderer from "./components/fileRenderer"
import Sidebar from "./components/Sidebar"

export default function Index() {
    const authStore = useContext(AuthContext)
    
    return (
        <div className="fileList main">
            <Sidebar />

            <FileRenderer />

            {/* <input type="file" name="" id="" onChange={onFileChange} />
            <button onClick={onClickHandler}>Click</button> */}
            {authStore.loggedIn ? "" : <Redirect to="/login" />}
        </div>
    )
}
