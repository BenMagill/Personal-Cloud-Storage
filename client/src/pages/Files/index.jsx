import React, {useContext, useState} from 'react'
import "./index.css"
import File from "../../components/File"
import {Table} from "react-bootstrap"
import Redirect from "react-router-dom/Redirect"
import {AuthContext} from "../../store/AuthStore"
import {FileContext} from "../../store/FileStore"   
import axios from "axios"

export default function Index() {
    const authStore = useContext(AuthContext)
    const fileStore = useContext(FileContext)

    const [filepath, setFilepath] = useState({})

    const onFileChange = (event) => {
        setFilepath(event.target.files[0])
        // console.log(event.target.files)
    }

    var currentFileStruct = fileStore.fileStruct

    var counter = 0
    var done = false
    var error = false
    if (fileStore.folders.length === 0) {
        currentFileStruct = fileStore.fileStruct
    } 

    while (done == false) {
        const tempFolderName = fileStore.folders[counter]
        var inChildFolders = false
        var tempFileStruc 
        // check child folders for the next folder
        for (let index = 0; index < currentFileStruct.folders.length; index++) {
            const element = currentFileStruct.folders[index];
            if (element.path === tempFolderName) {
                inChildFolders = true
                currentFileStruct = element
            }
            
        }
        if (inChildFolders == false) {
            done = true
            error = true
        }
        counter += 1
        if (counter == fileStore.folders.length) {
            done = true
        }
    }

    console.log({error, done, currentFileStruct})

    const getCorrectFolder = () => {

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
            <Table hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Date</th>
                        <th className="filesInfo">Info</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        currentFileStruct.path == "$" ? null : <File type="folder" folder=".."/>
                    }
                    
                    {
                        currentFileStruct.folders.map(item => {
                            return <File type="folder" folder={item.path}/>

                        })
                    }
                    {
                        currentFileStruct.files.map(item => {
                            return <File type="file" name={item.name}/>

                        })
                    }
           
                </tbody>
            </Table>
            <input type="file" name="" id="" onChange={onFileChange} />
            {console.log(filepath)}
            <button onClick={onClickHandler}>Click</button>
            {authStore.loggedIn ? "" : <Redirect to="/login" />}
        </div>
    )
}
