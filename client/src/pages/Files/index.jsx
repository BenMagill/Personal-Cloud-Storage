import React, {useContext, useState, useEffect} from 'react'
import "./index.css"
import Redirect from "react-router-dom/Redirect"
import {AuthContext} from "../../store/AuthStore"
import {FileContext} from "../../store/FileStore"   
import axios from "axios"
import { ApiContext } from '../../store/ApiStore'
import FileRenderer from "./components/fileRenderer"
import Sidebar from "./components/Sidebar"

export default function Index() {
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
        data.append('path', "folder1")
        data.append('file', filepath)
        axios.post("http://localhost:3030/api/files/item", data, {headers: {'content-type': 'multipart/form-data'}}, {
          onUploadProgress: ProgressEvent => {
          },
        })
          .then(res => { // then print response status
            console.log('upload success')
          })
          .catch(err => { // then print response status
            console.log('upload fail')
          })
    }
    return (
        <div className="fileList">
            <Sidebar />

            <FileRenderer />

            {/* <input type="file" name="" id="" onChange={onFileChange} />
            <button onClick={onClickHandler}>Click</button> */}
            {authStore.loggedIn ? "" : <Redirect to="/login" />}
        </div>
    )
}
