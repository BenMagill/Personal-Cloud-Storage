import React, { useContext, useEffect, useState } from 'react'
import {SettingsContext} from "../../store/SettingsStore"
import {AuthContext} from "../../store/AuthStore"
import {Redirect} from "react-router-dom"
import {Form, Button, Modal, FormControl} from "react-bootstrap"
import axios from "axios"
import "./index.css"

export default function Settings() {
    const auth = useContext(AuthContext)
    const {settings, updateSettings, resetSettings, loaded, reload} = useContext(SettingsContext)
    const [editExtension, setEditExtension] = useState(settings.changeFileExtension)
    const [showModal, setShowModal] = useState(false)
    const [filepath, setFilepath] = useState({})

    useEffect(()=>{
        setEditExtension(settings.changeFileExtension)
    }, [loaded, settings])

    const save = () => {
        updateSettings({changeFileExtension: editExtension})
    }

    const handleReset = () => {
        resetSettings()
    }

    const handleDownload = () => {
        const fileData = JSON.stringify(settings);
        const blob = new Blob([fileData], {type: "text/plain"});
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = 'settings.json';
        link.href = url;
        link.click();
    }

    const handleUpload = () => {
        const data = new FormData()
        data.append("file", filepath)
        
        axios.post("/api/settings/import", data, {headers: {"content-type": "multipart/form-data"}})
            .then(res => {
                console.log(res)
                console.log("success")
                reload()
            })
            .catch(err => {
                console.log("fail")
            })
    }

    return (
        <div>
            <div style={{display: "flex", justifyContent: "space-between", padding: "4px"}}>
                <h2>Settings</h2>
                <div className="buttonList">
                    <Button onClick={handleDownload}>Download</Button>
                    <Button variant="warning" onClick={()=>setShowModal(true)}>Import</Button>
                    <Button variant="danger" onClick={handleReset}>Reset</Button>
                </div>
            </div>
            <div>
                <Form.Check type="checkbox" label="Edit file extensions" checked={editExtension} onChange={()=>setEditExtension(!editExtension)} />
                <Button onClick={save}>Save</Button>
            </div>
            <Modal show={showModal} onHide={()=>setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        Import a settings file
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormControl type="file" name="" id="" onChange={(e)=>setFilepath(e.target.files[0])} />
                    {/* {isUploading? 
                    <div style={{marginTop: "10px"}}>
                        {isDone?"File uploaded!":
                        <div style={{display:"inline-flex"}}>
                        <Spinner animation="border" variant="primary" />
                        <p style={{margin: "auto 10px"}}>{uploadStage==2?"Saving file in storage":"Uploading file to server"}</p>
                        </div>
                        }
                        <ProgressBar now={progress} label={`${progress}%`}/>
                    </div>
                    :null} */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={()=>setShowModal(false)}>Close</Button>
                    <Button onClick={handleUpload}>Upload</Button>
                </Modal.Footer>
            </Modal>
            {auth.loggedIn ? "" : <Redirect to="/login" />}
        </div>
    )
}
