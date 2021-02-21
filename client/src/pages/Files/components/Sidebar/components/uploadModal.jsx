import React, {useContext, useState, useEffect} from 'react'
import {Modal, Button, FormControl, ProgressBar, Spinner} from "react-bootstrap"
import Redirect from "react-router-dom/Redirect"
import {AuthContext} from "../../../../../store/AuthStore"
import {FileContext} from "../../../../../store/FileStore"   
import {UploadContext} from "../../../../../store/UploadStore"   
import {Alert} from "react-bootstrap"

export default function UploadModal(props) {
    const authStore = useContext(AuthContext)
    const fileStore = useContext(FileContext)
    const uploadStore = useContext(UploadContext)

    const [filepath, setFilepath] = useState()
    const [message, setMessage] = useState(null)

    const onFileChange = (event) => {
        setFilepath(event.target.files[0])
    }

    const onClickHandler = () => {
        if (!filepath) return false
        const folderPath = ""
        if (fileStore.folders.length != 0) {
            folderPath = fileStore.folders.join("/")+"/"
        }
        uploadStore.addUpload("file", [filepath], folderPath)
        setMessage("Added to queue")
        setTimeout(() => {
            setMessage(null)
        }, 5000)
    }

    const handleClose = () => {
        props.close()
    }
    return (
        <Modal show={props.show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Upload a file to the current folder
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormControl type="file" name="" id="" onChange={onFileChange} />
                <br/> 
                {message?
                <Alert variant="success">
                    {message}
                </Alert>
                :
                null
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button onClick={onClickHandler}>Upload</Button>
            </Modal.Footer>
            {authStore.loggedIn ? "" : <Redirect to="/login" />}
        </Modal>
    )
}
