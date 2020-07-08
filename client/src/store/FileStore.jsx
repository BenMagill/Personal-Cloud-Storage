import React, {useState} from 'react'

export const FileContext = React.createContext()

export function FileProvider(props){

    /**
     * Folders structure for showing and viewing files
     * It is an array with the lowest index being the root + 1
     * Eg: 
     *      (root)/Documents/images/misc/
     *      is stored as
     *      [
     *          "Documents",
     *          "images",
     *          "misc"
     *      ] 
     *      
     */
    const [folders, setFolders] = useState([])
    const [fileStruct, setFileStruct] = useState([])
    
    const getFolders = () => {
        // Return the folder array
        // Needed if a class is used so accessing folders var returns something useless
    }

    const popFolder = () => {
        // Remove the bottom item from the array
        var newFolders = [...folders]
        console.log(newFolders)
        // newFolders[newFolders.length -1] = null
        newFolders.pop()
        console.log(newFolders)
        setFolders(newFolders)
    }

    const pushFolder = (newFolder) => {
        // Add a item to the array at the bottom
        var newFolders = [...folders]
        console.log(newFolders)
        newFolders.push(newFolder)
        console.log(newFolders)
        setFolders(newFolders)
    }

    const gotoFolder = () => {
        // Remove all folders under a point
        // Eg gotoFolder(1) would get of 2,3,4,...
    }

    return (
        <FileContext.Provider
            value = {{
                folders,
                popFolder,
                pushFolder,
                gotoFolder,
                fileStruct,
                setFileStruct
            }}
        >
            {props.children}
        </FileContext.Provider>
    )
    
}