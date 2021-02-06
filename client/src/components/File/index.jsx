import React, {useContext, useState} from 'react'
import {Dropdown, Modal, Button, FormControl, InputGroup} from "react-bootstrap"
import {FileContext} from "../../store/FileStore"
import "./index.css"
import DateHandler from "../../DateHandler"
import BytesToSize from "../../BytesToSize"
import {ApiContext} from "../../store/ApiStore"

export default function Index(props) {
    const apiStore = useContext(ApiContext)
    const fileStore = useContext(FileContext)
    const [renameModal, setRenameModal] = useState(false)
    const [renameFolderModal, setRenameFolderModal] = useState(false)
    const [newFileName, setNewFileName] = useState(props.name ? props.name.split(".")[0]:"")
    const [newFolderName, setNewFolderName] = useState(props.folder)
    const type = props.type
    const folder = props.folder
    // console.log(fileStore)
    // apiStore.GetFiles()
    const folderClick = (e) => {
        e.persist()
        console.log("kaboom")
        console.log(e)
        
        var flag = false
        for (let i = 0; i < e.target.classList.length; i++) {
            const element = e.target.classList[i];
            if (element == "dropdown-toggle" || element == "dropdown-item") {
                flag = true
            }
        }
        
        if (flag) {
            
        } else {
            if (folder == "..") {
                fileStore.popFolder()
            } else {
                fileStore.pushFolder(folder)
            }
        }
    }

    const fileClick = (e => {
        e.persist()
        console.log(e)
        if (e.target.className.includes("dropdown-toggle")) {
            console.log("file click")
        }
    })

    const handleFileRenameClick = () => {
        // Open file rename modal
        var newName, oldName
        if (fileStore.folders.length == 0) {
            newName = newFileName+"."+props.name.split(".")[1]
            oldName = props.name
        } else {
            newName = fileStore.folders.join("/")+"/"+newFileName+"."+props.name.split(".")[1]
            oldName = fileStore.folders.join("/")+"/"+props.name
        }
        console.log({newName, oldName})
        apiStore.RenameFile(oldName, newName, () => {
            apiStore.GetFiles()
            setRenameModal(false)
        })
    }

    const handleFolderRenameClick = () => {
        // Open file rename modal
        var newName, oldName
        if (fileStore.folders.length == 0) {
            oldName = props.folder+"/"
            newName = newFolderName+"/"
        } else {
            oldName = fileStore.folders.join("/")+"/"+props.folder+"/"
            newName = fileStore.folders.join("/")+"/"+newFolderName+"/"
        }
        console.log({newName, oldName})
        apiStore.RenameFolder(oldName, newName, () => {
            setTimeout(() => {
                setRenameFolderModal(false)
                apiStore.GetFiles()
            }, 2000);
        })
    }

    const handleFileDelete = () => {
        var filePath
        if (fileStore.folders.length == 0) {
            filePath = props.name
        } else {
            filePath = fileStore.folders.join("/") + "/" + props.name
        }
        apiStore.DeleteFile(filePath)
    }

    const handleFolderDelete = () => {
        var filePath
        if (fileStore.folders.length == 0) {
            filePath = props.folder
        } else {
            filePath = fileStore.folders.join("/") + "/" + props.folder
        }
        console.log(filePath)
        console.log(props)
        apiStore.DeleteFolder(filePath)
    }

    if (type == "folder") {
        return (
            <React.Fragment>
            <tr onClick={folderClick}>
                <td className="test">
                    {props.folder}
                </td>
                <td className="test">
                    --
                </td>
                <td className="test">
                    --
                </td>
                <td>
                    <Dropdown>
                        <Dropdown.Toggle>
                            ...
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href={"/api/files/folder/"+(fileStore.folders.length > 0 ? encodeURIComponent(fileStore.folders.join("/") + "/" + props.folder+"/") : encodeURIComponent(props.folder+"/"))} target="_blank">Download</Dropdown.Item>
                            <Dropdown.Item href="" onClick={()=>{handleFolderDelete()}}>Delete</Dropdown.Item>
                            <Dropdown.Item href="" onClick={()=>setRenameFolderModal(true)}>Rename</Dropdown.Item>
                        </Dropdown.Menu>

                    </Dropdown>
                </td>
            </tr>
            <Modal autoFocus show={renameFolderModal} onHide={()=>setRenameFolderModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Rename Folder</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup>
                        <FormControl placeholder="New Name" value={newFolderName} onChange={(e)=>setNewFolderName(e.target.value)}  />
                    </InputGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleFolderRenameClick} variant="primary">Update</Button>
                    <Button variant="secondary" onClick={()=>setRenameFolderModal(false)}>Cancel</Button>
                </Modal.Footer>
            </Modal>
            </React.Fragment>
        )
    } else {
        return (
            <React.Fragment>
                <tr onClick={fileClick}>
                    <td>
                        {props.name}
                    </td>
                    <td>
                        {BytesToSize(props.data.Size)}
                    </td>
                    <td>
                        {DateHandler(props.data.LastModified)}
                    </td>
                    <td>
                        <Dropdown>
                            <Dropdown.Toggle>
                                ...
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href={"/api/files/item/"+encodeURIComponent(props.data.Key)} target="_blank">Download</Dropdown.Item>
                                {/* <Dropdown.Item href="" onClick={()=>{console.log("click")}}>Share</Dropdown.Item> */}
                                <Dropdown.Item href="" onClick={handleFileDelete}>Delete</Dropdown.Item>
                                <Dropdown.Item href="" onClick={()=>setRenameModal(true)}>Rename</Dropdown.Item>
                                {/* <Dropdown.Item href="" onClick={()=>{console.log("click")}}>Other Versions</Dropdown.Item> */}
                            </Dropdown.Menu>

                        </Dropdown>
                    </td>
                </tr>
                <Modal autoFocus show={renameModal} onHide={()=>setRenameModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Rename</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <InputGroup>
                            <FormControl placeholder="New Name" value={newFileName} onChange={(e)=>setNewFileName(e.target.value)}  />
                            <InputGroup.Append>
                                <InputGroup.Text id="basic-addon2">{"."+props.name.split(".")[1]}</InputGroup.Text>
                            </InputGroup.Append>
                        </InputGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={handleFileRenameClick} variant="primary">Update</Button>
                        <Button variant="secondary" onClick={()=>setRenameModal(false)}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        )
    }
}
