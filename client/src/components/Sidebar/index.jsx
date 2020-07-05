import React from 'react'
import Link from "react-router-dom/Link"
import "./index.css"

export default function index() {
    return (
        <div className="sidebar">
            <Link to="/"><p>Upload file</p></Link>
            <Link to="/"><p>Upload folder</p></Link>
            <Link to="/"><p>New folder</p></Link>
        </div>
    )
}
