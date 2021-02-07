import React, {useContext, useEffect, useState} from 'react'
import Redirect from "react-router-dom/Redirect"
import {AuthContext} from "../../store/AuthStore"
import {ApiContext} from "../../store/ApiStore"
import Table from "react-bootstrap/Table"
import File from "../../components/File"
export default function Index() {
    const authStore = useContext(AuthContext)
    const apiStore = useContext(ApiContext)

    const [recentFiles, setRecentFiles] = useState([])
    useEffect(() => {
        apiStore.GetRecents(res => {
            setRecentFiles(res)
        })
        return () => {
            
        }
    }, [""])
    return (
        <div>
            {console.log(recentFiles)}
            <Table hover>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Size</th>
                    <th>Date</th>
                    <th className="filesInfo">Info</th>
                </tr>
            </thead>
            <tbody>
                
                {   recentFiles !== undefined ?
                    recentFiles.map(item => {
                        const itemPath = item.Key.split("/")
                        console.log(item)
                        return <File type="file" data={item} name={item.Key}/>

                    })
                    : null
                }
        
            </tbody>
        </Table>
            {authStore.loggedIn ? "" : <Redirect to="/login" />}
        </div>
    )
}
