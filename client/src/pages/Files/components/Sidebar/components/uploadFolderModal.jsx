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
        setFilepath(event.target.files)
        console.log(event.target.files)
    }

    const onClickHandler = () => {
        for (let i = 0; i < filepath.length; i++) {
            const file = filepath[i];
            const brokenPath = file.webkitRelativePath.split("/")
            const folderPath = brokenPath.slice(0, brokenPath.length-1).join("/")+"/"
            console.log(folderPath)
            const data = new FormData() 
            if (fileStore.folders.length == 0) {
                data.append("path", ""+folderPath)
            } else {
                data.append('path', fileStore.folders.join("/")+"/"+folderPath)
            }
            data.append('file', file)
            axios.post("/api/files/item", data, {headers: {'content-type': 'multipart/form-data'}}, {
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
    }
    return (
        <Modal show={props.show} onHide={props.close}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Upload a folder to the current location
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input type="file" onChange={onFileChange} webkitdirectory="" mozdirectory directory/>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.close}>Close</Button>
                <Button onClick={onClickHandler}>Upload</Button>
            </Modal.Footer>
            {authStore.loggedIn ? "" : <Redirect to="/login" />}
        </Modal>
    )
}
