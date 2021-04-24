import React, { useState } from 'react'
import Link from "react-router-dom/Link"
import UploadModal from "./components/uploadModal"
import {Button, Dropdown, DropdownButton} from "react-bootstrap"
import NewFolderModal from "./components/newFolderModal"
import UploadFolderModal from "./components/uploadFolderModal"
import "./index.css"

export default function Index() {
    const [uploadModal, setUploadModal] = useState(false)
    const [newFolderModal, setNewFolderModal] = useState(false)
    const [uploadFolderModal, setUploadFolderModal] = useState(false)
    return (
        <div className="topbar">
            <DropdownButton id="dropdown-basic-button" title="Upload" variant="primary">
                <Dropdown.Item href="#" onClick={()=>setUploadModal(true)}>File</Dropdown.Item>
                <UploadModal show={uploadModal} close={() => setUploadModal(false)} />
                <Dropdown.Item href="#" onClick={()=>setUploadFolderModal(true)}>Folder</Dropdown.Item>
                <UploadFolderModal show={uploadFolderModal} close={() => setUploadFolderModal(false)} />
            </DropdownButton>
            <Button onClick={()=>setNewFolderModal(true)}>New folder</Button>
            <NewFolderModal show={newFolderModal} close={() => setNewFolderModal(false)} />
        </div>
    )
}
