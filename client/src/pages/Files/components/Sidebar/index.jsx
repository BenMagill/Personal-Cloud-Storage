import React, {useState} from 'react'
import Link from "react-router-dom/Link"
import UploadModal from "./components/uploadModal"
import NewFolderModal from "./components/newFolderModal"
import UploadFolderModal from "./components/uploadFolderModal"
import "./index.css"

export default function Index() {
    const [uploadModal, setUploadModal] = useState(false)
    const [newFolderModal, setNewFolderModal] = useState(false)
    const [uploadFolderModal, setUploadFolderModal] = useState(false)
    return (
        <div className="sidebar">
            <Link to="#" onClick={()=>setUploadModal(true)}><p>Upload file</p></Link>
            <UploadModal show={uploadModal} close={()=>setUploadModal(false)} />
            <Link to="#" onClick={()=>setUploadFolderModal(true)} ><p>Upload folder</p></Link>
            <UploadFolderModal show={uploadFolderModal} close={()=>setUploadFolderModal(false)} />
            <Link to="#" onClick={()=>setNewFolderModal(true)}><p>New folder</p></Link>
            <NewFolderModal show={newFolderModal} close={()=>setNewFolderModal(false)} />
        </div>
    )
}
