import React, {useState, useContext, useEffect} from 'react'
import FilesTable from "../../components/filesTable"
import File from "../../components/File"
import {ApiContext} from "../../store/ApiStore"
import {AuthContext} from "../../store/AuthStore"
import {Redirect} from "react-router-dom"
import {Spinner} from "react-bootstrap"

export default function Index(props) {
    const Auth = useContext(AuthContext)
    const Api = useContext(ApiContext)
    const searchTerm = props.match.params.term
    const [loading, setLoading] = useState(true)
    const [files, setFiles] = useState([])
    useEffect(()=>{
        setLoading(true)
        Api.Search(searchTerm, result => {
            setFiles(result)
            setLoading(false)
        })
    }, [searchTerm])
    return (
        <div>
            <FilesTable>
                    {   !loading?files.length !== 0 ?
                        files.map(item => {
                            const itemPath = item.Key.split("/")
                            return <File type="file" data={item} name={item.Key} key={item.Key}/>

                        })
                        : <p>No files found</p>:<p>Loading...</p> 
                    }
            </FilesTable>
            {Auth.loggedIn ? "" : <Redirect to="/login" />}
            
        </div>
    )
}
