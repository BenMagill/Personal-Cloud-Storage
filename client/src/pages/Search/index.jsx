import React, {useState, useContext, useEffect} from 'react'
import FilesTable from "../../components/filesTable"
import File from "../../components/File"
import {ApiContext} from "../../store/ApiStore"
import {AuthContext} from "../../store/AuthStore"
import {Redirect} from "react-router-dom"

export default function Index(props) {
    const Auth = useContext(AuthContext)
    const Api = useContext(ApiContext)
    const searchTerm = props.location.data.searchTerm
    if (props.location.data) console.log(props.location.data.searchTerm)
    const [files, setFiles] = useState([])
    useEffect(()=>{
        Api.Search(searchTerm, result => {
            setFiles(result)
        })
    }, [])
    return (
        <div>
            <FilesTable>
                    {   files !== undefined ?
                        files.map(item => {
                            const itemPath = item.Key.split("/")
                            console.log(item)
                            return <File type="file" data={item} name={item.Key}/>

                        })
                        : null
                    }
            </FilesTable>
            {Auth.loggedIn ? "" : <Redirect to="/login" />}
            
        </div>
    )
}
