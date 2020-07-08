import React, {useState} from 'react'
import Link from "react-router-dom/Link"
import UploadModal from "./components/uploadModal"
import "./index.css"

export default function Index() {
    const [uploadModal, setUploadModal] = useState(false)
    return (
        <div className="sidebar">
            <Link to="#" onClick={()=>setUploadModal(true)}><p>Upload file</p></Link>
            <UploadModal show={uploadModal} close={()=>setUploadModal(false)} />
            <Link to="/"><p>Upload folder</p></Link>
            <Link to="/"><p>New folder</p></Link>
        </div>
    )
}
