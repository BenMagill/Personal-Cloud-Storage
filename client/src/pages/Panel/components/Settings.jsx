import React, { useContext, useEffect, useState } from 'react'
import {SettingsContext} from "../../../store/SettingsStore"
import {Form, Button} from "react-bootstrap"

export default function Settings() {
    const {settings, updateSettings, loaded} = useContext(SettingsContext)
    const [editExtension, setEditExtension] = useState(settings.changeFileExtension)
    
    useEffect(()=>{
        setEditExtension(settings.changeFileExtension)
    }, [loaded])

    const save = () => {
        updateSettings({changeFileExtension: editExtension})
    }
    return (
        <div>
            <h2>Settings</h2>
            <div>
                <Form.Check type="checkbox" label="Edit file extensions" checked={editExtension} onChange={()=>setEditExtension(!editExtension)} />
                <Button onClick={save}>Save</Button>
            </div>
        </div>
    )
}
