import React, {useContext, useEffect, useState} from 'react'
import Redirect from "react-router-dom/Redirect"
import {AuthContext} from "../../store/AuthStore"
import {ApiContext} from "../../store/ApiStore"
import Table from "react-bootstrap/Table"
import File from "../../components/File"
import FilesTable from "../../components/filesTable"

export default function Index() {
    const authStore = useContext(AuthContext)
    const apiStore = useContext(ApiContext)

    const [recentFiles, setRecentFiles] = useState([])
    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        apiStore.GetRecents(res => {
            setRecentFiles(res)
            setLoaded(true)
        })
    }, [""])
    return (
        <div>
            {console.log(recentFiles)}

            <FilesTable loaded={loaded}>
                {   recentFiles !== undefined ?
                        recentFiles.map(item => {
                            const itemPath = item.Key.split("/")
                            console.log(item)
                            return <File type="file" data={item} name={item.Key}/>

                        })
                        : null
                    }
            </FilesTable>
            {authStore.loggedIn ? "" : <Redirect to="/login" />}
        </div>
    )
}
