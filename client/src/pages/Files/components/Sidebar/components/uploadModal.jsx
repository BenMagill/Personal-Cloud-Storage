import React, {useContext, useState, useEffect} from 'react'
import {Modal, Button, FormControl, ProgressBar, Spinner} from "react-bootstrap"
import Redirect from "react-router-dom/Redirect"
import {AuthContext} from "../../../../../store/AuthStore"
import {ApiContext} from "../../../../../store/ApiStore"
import axios from "axios"
import {FileContext} from "../../../../../store/FileStore"   
import {toast} from "react-toastify"

export default function UploadModal(props) {
    const authStore = useContext(AuthContext)
    const fileStore = useContext(FileContext)
    const apiStore = useContext(ApiContext)

    const [filepath, setFilepath] = useState({})
    const [progress, setProgress] = useState(0)
    const [isUploading, setIsUploading] = useState(false)
    const [uploadStage, setUploadStage] = useState(1) // 1 = uploading file, 2 = saving file 
    const [isDone, setDone] = useState(false)
    const [toastId, setToastId] = useState("")
    const onFileChange = (event) => {
        setFilepath(event.target.files[0])
        // console.log(event.target.files)
    }

    useEffect(() => {
        if (!props.show && isUploading && !isDone && toastId === "") {
            setToastId(toast.info("Uploading " + filepath.name))
        } else if (isDone && toastId !== "") {
            toast.update(toastId, {render: "Uploaded", type:"success", autoClose: 5000})
        }
    }, [isUploading, isDone, props.show])

    const onClickHandler = () => {
        setIsUploading(true)
        setDone(false)
        setProgress(0)
        setUploadStage(1)

        const data = new FormData() 
        if (fileStore.folders.length == 0) {
            data.append("path", "")
        } else {
            data.append('path', fileStore.folders.join("/")+"/")
        }
        data.append('file', filepath)


        axios.post("/api/files/item", data, {headers: {'content-type': 'multipart/form-data'}, onUploadProgress: ProgressEvent => {
            var percentCompleted = Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)
            console.log(ProgressEvent)
            if (percentCompleted == 100) {
                setUploadStage(2)
                setProgress(0)
            } else {
                setProgress(percentCompleted)
            }
        }})
        // TODO get saving progress and show it
            .then(res => { // then print response status
                console.log('upload success')
                setProgress(100)
                setDone(true)
                apiStore.GetFiles()
            
            // Needs to close or show a message
          })
          .catch(err => { // then print response status
              console.log('upload fail')
          })
    }

    const handleClose = () => {
        // Reset all data
        props.close()
        setIsUploading(false)
        setDone(false)
        setProgress(0)
        setUploadStage(1)
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
                {isUploading? 
                <div style={{marginTop: "10px"}}>
                    {isDone?"File uploaded!":
                    <div style={{display:"inline-flex"}}>
                      <Spinner animation="border" variant="primary" />
                      <p style={{margin: "auto 10px"}}>{uploadStage==2?"Saving file in storage":"Uploading file to server"}</p>
                    </div>
                    }
                    <ProgressBar now={progress} label={`${progress}%`}/>
                </div>
                :null}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button onClick={onClickHandler}>Upload</Button>
            </Modal.Footer>
            {authStore.loggedIn ? "" : <Redirect to="/login" />}
        </Modal>
    )
}
