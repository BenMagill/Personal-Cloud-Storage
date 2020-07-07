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
 
    var folderFiles = []
    var folders = []
    var files = []
    var currentPath = (fileStore.folders.join("/"))
    if (currentPath != "") {
        currentPath = currentPath + "/"
    }
    for (let i = 0; i < fileStore.fileStruct.length; i++) {
        const element = fileStore.fileStruct[i];
        if (element.Key.startsWith(currentPath) && !element.Key.startsWith("/")) {
            console.log(element)
            var stringShortPath = (element.Key.replace(currentPath,""))
            var arrayShortPath = stringShortPath.split("/")
            console.log(arrayShortPath)
            if (arrayShortPath.length == 1) {
                // it is a file in the current directory
                // could have a check for if it is a "hidden file" of such that is used to create an empty folder
                files.push(element)
            } else if (arrayShortPath.length > 1) {
                // file is in a folder in directory
                const folderName = arrayShortPath[0]
                folders.push(folderName)
            } else {
                // error so do nothing
            }
        }
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
                        fileStore.folders.length == 0 ? null : <File type="folder" folder=".."/>
                    }
                    
                    {
                        [...new Set(folders)].map(item => {
                            return <File type="folder" folder={item}/>

                        })
                    }
                    {
                        files.map(item => {
                            const itemPath = item.Key.split("/")
                            return <File type="file" name={itemPath[itemPath.length-1]}/>

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
