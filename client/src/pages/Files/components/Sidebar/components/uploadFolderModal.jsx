import React, {useContext, useState, useEffect} from 'react'
import {Modal, Button, FormControl, Spinner, ProgressBar} from "react-bootstrap"
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
    const [currentFileName, setCurrentFileName] = useState("")
    const [uploadingCount, setUploadingCount] = useState(0)
    const [isUploading, setIsUploading] = useState(false)
    const [uploadStage, setUploadStage] = useState(1) // 1 = uploading file, 2 = saving file 
    const [isDone, setDone] = useState(false)
    const [toastId, setToastId] = useState("")

    const onFileChange = (event) => {
        setFilepath(event.target.files)
        setIsUploading(false)
        console.log(event.target.files)
    }

    useEffect(() => {
        console.log({show: props.show, isDone, isUploading})
        if (!props.show && isUploading && !isDone && toastId === "") {
            setToastId(toast.info(`Uploading ${uploadingCount}/${filepath.length}`))
        } else if (!props.show && toastId !== "" && isUploading && !isDone) {
            toast.update(toastId, {render: `Uploading ${uploadingCount}/${filepath.length}`, type:"info"})
        } else if (isDone && toastId !== "") {
            toast.update(toastId, {render: "Uploaded", type:"success", autoClose: 5000})
        }
    }, [isUploading, isDone, props.show, uploadingCount])

    const onClickHandler = async () => {
        setIsUploading(true)
        setCurrentFileName("")
        setUploadStage(0)
        setUploadingCount(0)
        setDone(false)
        for (let i = 0; i < filepath.length; i++) {
                setUploadingCount(prev => prev+1)
                setProgress(0)
            const file = filepath[i];
            const brokenPath = file.webkitRelativePath.split("/")
            const folderPath = brokenPath.slice(0, brokenPath.length-1).join("/")+"/"
            setCurrentFileName(file.webkitRelativePath)
            const data = new FormData() 
            if (fileStore.folders.length == 0) {
                data.append("path", ""+folderPath)
            } else {
                data.append('path', fileStore.folders.join("/")+"/"+folderPath)
            }
            data.append('file', file)

            try {
                var res = await axios.post("/api/files/item", data, {headers: {'content-type': 'multipart/form-data'}, onUploadProgress: ProgressEvent => {
                    var percentCompleted = Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)
                    console.log(ProgressEvent)
                    if (percentCompleted == 100) {
                        setProgress(100)
                    } else {
                        setProgress(percentCompleted)
                    }
                }})
                console.log('upload success')
                console.log(uploadingCount)
            } catch (err) {
                console.log('upload fail')
                setUploadingCount(uploadingCount+1)
            }
            // axios.post("/api/files/item", data, {headers: {'content-type': 'multipart/form-data'}, onUploadProgress: ProgressEvent => {
            //     var percentCompleted = Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)
            //     console.log(ProgressEvent)
            //     if (percentCompleted == 100) {
            //         setUploadStage(2)
            //         setProgress(100)
            //     } else {
            //         setProgress(percentCompleted)
            //     }
            // }})
            //     .then(res => { // then print response status
            //         console.log('upload success')
            //         setUploadingCount(uploadingCount+1)
            //         apiStore.GetFiles()
                
            //     // Needs to close or show a message
            //   })
            //   .catch(err => { // then print response status
            //       console.log('upload fail')
            //   })
        }
        apiStore.GetFiles()
        setDone(true)

    }

    const handleClose = () => {
        // Reset all data
        props.close()
        // setIsUploading(false)
        // setDone(false)
        // setProgress(0)
        // setUploadStage(1)
    }

    return (
        <Modal show={props.show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    Upload a folder to the current location
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <input type="file" onChange={onFileChange} webkitdirectory="" mozdirectory directory/>
                {isUploading? 
                <div style={{marginTop: "10px"}}>
                    {isDone?"Files uploaded!":
                    <div style={{display:"inline-flex"}}>
                      <Spinner animation="border" variant="primary" />
                      <p style={{margin: "auto 10px"}}>{
                          `Uploading ${currentFileName}`
                      }</p>
                    </div>
                    }
                    <ProgressBar now={uploadingCount/filepath.length * 100} label={`${uploadingCount}/${filepath.length}`}/>
                    <br/>
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
