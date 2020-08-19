import React, {useContext, useState} from 'react'
import {Modal} from "react-bootstrap"
import Redirect from "react-router-dom/Redirect"
import {AuthContext} from "../../../../../store/AuthStore"
import {ApiContext} from "../../../../../store/ApiStore"
import {FileContext} from "../../../../../store/FileStore"   

export default function UploadModal(props) {
    const authStore = useContext(AuthContext)
    const fileStore = useContext(FileContext)
    const apiStore = useContext(ApiContext)

    const [folderName, setFolderName] = useState({})
    
    const onFolderChange = (event) => {
        setFolderName(event.target.value)
        // console.log(event.target.files)
    }

    const onClickHandler = () => {
        var newPath = ""
        if (fileStore.folders.length == 0) {
            newPath = folderName
        } else {
            newPath = fileStore.folders.join("/")+"/"+folderName
        }
        apiStore.CreateFolder(newPath)
        console.log(newPath)
    }
    return (
        <Modal show={props.show} onHide={props.close}>
            Upload a file to the current folder
            <input type="text" name="" id="" onChange={onFolderChange} />
            <button onClick={onClickHandler}>Click</button>
            {authStore.loggedIn ? "" : <Redirect to="/login" />}
        </Modal>
    )
}
