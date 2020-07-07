import React, {useContext} from 'react'
import {Dropdown} from "react-bootstrap"
import {FileContext} from "../../store/FileStore"
import "./index.css"
import {ApiContext} from "../../store/ApiStore"

export default function Index(props) {
    const apiStore = useContext(ApiContext)
    const fileStore = useContext(FileContext)
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
            if (element == "dropdown-toggle") {
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

    if (type == "folder") {
        return (
            <tr onClick={folderClick}>
                <td className="test">
                    {props.folder}
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
                            <Dropdown.Item href="" onClick={()=>{console.log("click")}}>Download</Dropdown.Item>
                            <Dropdown.Item href="" onClick={()=>{console.log("click")}}>Delete</Dropdown.Item>
                            <Dropdown.Item href="" onClick={()=>{console.log("click")}}>Rename</Dropdown.Item>
                        </Dropdown.Menu>

                    </Dropdown>
                </td>
            </tr>
        )
    } else {
        return (
            <tr>
                <td>
                    {props.name}
                </td>
                <td>
                    01/02/2003
                </td>
                <td>
                    <Dropdown>
                        <Dropdown.Toggle>
                            ...
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="" onClick={()=>{console.log("click")}}>Download</Dropdown.Item>
                            <Dropdown.Item href="" onClick={()=>{console.log("click")}}>Share</Dropdown.Item>
                            <Dropdown.Item href="" onClick={()=>{console.log("click")}}>Delete</Dropdown.Item>
                            <Dropdown.Item href="" onClick={()=>{console.log("click")}}>Rename</Dropdown.Item>
                            <Dropdown.Item href="" onClick={()=>{console.log("click")}}>Other Versions</Dropdown.Item>
                        </Dropdown.Menu>

                    </Dropdown>
                </td>
            </tr>
        )
    }
}
