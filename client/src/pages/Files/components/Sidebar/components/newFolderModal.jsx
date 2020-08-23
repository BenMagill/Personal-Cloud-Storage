import React, {useContext, useState} from 'react'
import {Modal, Button, FormControl} from "react-bootstrap"
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
        props.close()
        console.log(newPath)
    }
    return (
        <Modal show={props.show} onHide={props.close}>
            <Modal.Header closeButton>
                <Modal.Title>
                    New Folder
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormControl type="text" name="" id="" placeholder="Name" onChange={onFolderChange} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.close}>Close</Button>
                <Button onClick={onClickHandler}>Create</Button>
            </Modal.Footer>
            {authStore.loggedIn ? "" : <Redirect to="/login" />}
        </Modal>
    )
}
