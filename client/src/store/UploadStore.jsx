import React, {useState, useEffect, useContext} from 'react'
import {toast} from "react-toastify"
import axios from "axios"
import {ApiContext} from "./ApiStore"
import {FileContext} from "./FileStore"
export const UploadContext = React.createContext()

export function UploadProvider(props){

    const fileStore = useContext(FileContext)
    const apiStore = useContext(ApiContext)

    const [currentFiles, setCurrentFiles] = useState([])
    const [hasUploaded, setHasUploaded] = useState(false)
    const [uploadQueue, setUploadQueue] = useState([])
    const [isUploading, setIsUploading] = useState(false)
    const [fileProgress, setFileProgress] = useState(0)
    const [uploadType, setUploadType] = useState("")
    const [folderProgress, setFolderProgress] = useState(0)
    // const [toastId, setToastId] = useState("")
    const [currentFileName, setCurrentFileName] = useState("")

    const addUpload = (type, files, location) => {
        setUploadQueue([...uploadQueue, {type, files, location}])
    }

    // Handles uploading files
    useEffect(() => {
        if (!isUploading && uploadQueue.length > 0) {
            doUpload()
        }
    }, [isUploading, uploadQueue])

    const doUpload = async () => {

        setIsUploading(()=>true )

        var tempToastId = ""

        setHasUploaded(true)
        
        console.log("uploading")
        
        // Get operation to do
        var operation = uploadQueue[0]
        console.log({operation})
        
        // Remove first item from array
        var newUploadQueue = [...uploadQueue]
        newUploadQueue.shift()
        setUploadQueue(newUploadQueue)
        
        // Store current files
        setCurrentFiles(operation.files)
        
        // Set details
        setUploadType(operation.type)
        setFolderProgress(0)
        
        // For all files in operation
        for (let i = 0; i < operation.files.length; i++) {
            const file = operation.files[i];
            console.log(file.webkitRelativePath)
            // Reset file progress
            setFileProgress(0)
            // Increment folder progress count
            setFolderProgress(prev => prev+1)

            // Get the folder path
            const brokenPath = file.webkitRelativePath.split("/")
            const folderPath = brokenPath.slice(0, brokenPath.length-1).join("/")+"/"
            setCurrentFileName(file.name)
            const data = new FormData()
            if (operation.type === "file") {
                data.append("path", operation.location)
            } else {
                data.append("path", operation.location+folderPath)
            }
            data.append('file', file)

            if (tempToastId !== "") {
                toast.update(tempToastId, {render: <UploadToast progress={fileProgress} file={file.name} total={operation.files.length} current={i+1}/>, autoClose: false})
            } else {
                tempToastId = toast.info(<UploadToast progress={fileProgress} file={file.name} total={operation.files.length} current={i+1} />, {autoClose: false}) 
            }

            
            // Upload
            try {
                var res = await axios.post("/api/files/item", data, {headers: {'content-type': 'multipart/form-data'}, onUploadProgress: ProgressEvent => {
                    var percentCompleted = Math.round((ProgressEvent.loaded * 100) / ProgressEvent.total)
                    console.log(percentCompleted)
                    if (percentCompleted == 100) {
                        setFileProgress(100)
                    } else {
                        setFileProgress(percentCompleted)
                    }
                    toast.update(tempToastId, {render: <UploadToast progress={percentCompleted} file={file.name} total={operation.files.length} current={i+1}/>, autoClose: false})
                }})
                console.log('upload success')
                
            } catch (err) {
                console.log('upload fail')
            }
            
        }

        // After all files done no longer uploading
        setIsUploading(false)
        console.log(newUploadQueue)
        toast.update(tempToastId, {render: <UploadToast done /> , autoClose: 2000})
        apiStore.GetFiles()
    }

    return (
        <UploadContext.Provider
            value={{addUpload}}
        >
            {props.children}
        </UploadContext.Provider>
    )
}

const UploadToast = ({file, progress, total, current, done}) => {
    // const {hasUploaded, isUploading, uploadQueue} = useContext(FileContext)

    return (
        <div>
            {done? 
            "Done!"
 
            :
            <div>
                {`${file}: ${progress}% ${current}/${total}`}
            </div>
            }
            {/* {hasUploaded&&uploadQueue.length == 0? "Done": null} */}
            {/* {isUploading? "Uploading": null} */}
        </div>
    )
    
}