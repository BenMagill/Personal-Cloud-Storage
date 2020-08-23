import React, {useContext, useState} from 'react'
import {Modal, Button, FormControl} from "react-bootstrap"
import Redirect from "react-router-dom/Redirect"
import {AuthContext} from "../../../../../store/AuthStore"
import {ApiContext} from "../../../../../store/ApiStore"
import axios from "axios"
import {FileContext} from "../../../../../store/FileStore"   

export default function UploadModal(props) {
    const authStore = useContext(AuthContext)
    const fileStore = useContext(FileContext)
    const apiStore = useContext(ApiContext)

    const [filepath, setFilepath] = useState({})
    
    const onFileChange = (event) => {
        setFilepath(event.target.files[0])
        // console.log(event.target.files)
    }

    const onClickHandler = () => {
        const data = new FormData() 
        if (fileStore.folders.length == 0) {
            data.append("path", "")
        } else {
            data.append('path', fileStore.folders.join("/")+"/")
        }
        data.append('file', filepath)
        axios.post("http://localhost:3030/api/files/item", data, {headers: {'content-type': 'multipart/form-data'}}, {
            onUploadProgress: ProgressEvent => {
            },
        })
            .then(res => { // then print response status
                console.log('upload success')
                apiStore.GetFiles()
            
            // Needs to close or show a message
          })
          .catch(err => { // then print response status
              console.log('upload fail')
          })
    }
    return (
        <Modal show={props.show} onHide={props.close}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Upload a file to the current folder
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormControl type="file" name="" id="" onChange={onFileChange} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.close}>Close</Button>
                <Button onClick={onClickHandler}>Upload</Button>
            </Modal.Footer>
            {authStore.loggedIn ? "" : <Redirect to="/login" />}
        </Modal>
    )
}
