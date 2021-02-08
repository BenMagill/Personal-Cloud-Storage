import React, {useContext, useState, useEffect} from 'react'
import {Table} from "react-bootstrap"
import {AuthContext} from "../../../store/AuthStore"
import {FileContext} from "../../../store/FileStore"   
import { ApiContext } from '../../../store/ApiStore'
import File from "../../../components/File"
import FilesTable from "../../../components/filesTable"

export default function FileRenderer() {
    const authStore = useContext(AuthContext)
    const fileStore = useContext(FileContext)
    const apiStore = useContext(ApiContext)

    const [current, setCurrent] = useState({})

    useEffect(() => {
        apiStore.GetFiles()
        return () => {
            
        }
    }, [""])

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
            var stringShortPath = (element.Key.replace(currentPath,""))
            var arrayShortPath = stringShortPath.split("/")
            if (arrayShortPath.length == 1) {
                // it is a file in the current directory
                // check for if it is a "hidden file" of such that is used to create an empty folder
                if (element.Key.split("/")[element.Key.split("/").length-1] != ".hidden"){
                    files.push(element)
                }
            } else if (arrayShortPath.length > 1) {
                // file is in a folder in directory
                const folderName = arrayShortPath[0]
                folders.push(folderName)
            } else {
                // error so do nothing
            }
        }
    }
    console.log(current)

    if (current.name === "size") {
        files.sort((a, b) => {
            if (a.Size > b.Size) return 1
            if (a.Size < b.Size) return -1
            return 0
        })
        if (current.type === "d") files.reverse()
    } else if (current.name === "name") {
        files.sort((a, b) => {
            var _a = a.Key.split("/")
            var _b = b.Key.split("/")
            a = _a[_a.length-1]
            b = _b[_b.length-1]
            if (a > b) return 1
            if (a < b) return -1
            return 0
        })
        if (current.type === "d") files.reverse()
    } else if (current.name === "date") {
        files.sort((a, b) => {
            if (a.LastModified > b.LastModified) return 1
            if (a.LastModified < b.LastModified) return -1
            return 0
        })
        if (current.type === "d") files.reverse()

    }
 
    return (

        <FilesTable sortable setCurrent={setCurrent}>
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
                        return <File type="file" data={item} name={itemPath[itemPath.length-1]}/>

                    })
                }
        </FilesTable>
    )
}
