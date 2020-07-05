import React, {useContext} from 'react'
import {Dropdown} from "react-bootstrap"
import {FileContext} from "../../store/FileStore"
import "./index.css"

export default function Index(props) {
    const fileStore = useContext(FileContext)
    const type = props.type
    const folder = props.folder
    console.log(fileStore)
    const folderClick = (e) => {
        if (folder == "..") {
            fileStore.popFolder()
        } else {
            fileStore.pushFolder(folder)
        }
    }

    if (type == "folder") {
        return (
            <tr onClick={folderClick}>
                <td>
                    {props.folder}
                </td>
                <td>
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
