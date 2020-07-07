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
    // const [fileStruct, setFileStruct] = useState({
    //     "path":"$",
    //     "files":[
    //       {"name":"picture.jpg", "otherinfo":"otherinfo"},
    //       {"name":"info.txt", "otherinfo":"otherinfo"}
    //     ],
    //     "folders":[
    //       {
    //         "path":"Documents",
    //         "files":[
    //           {"name":"homework.otf", "otherinfo":"otherinfo"}  
    //         ],
    //         "folders":[
    //           {
    //             "path":"secret",
    //             "files":[
    //               {"name":"passwords.txt", "otherinfo":"otherinfo"}  
    //             ],
    //             "folders":[
                  
    //             ]
    //           }
    //         ]
    //       }
    //     ]
    //   })
    // const [fileStruct, setFileStruct] = useState({
    //   "RootFolder": {
    //     "FolderA": {
    //       "FolderB": {
    //         "files": [],
    //         "FolderC": {
    //           "files":[]
    //         }
    //       }
    //     }
    //   }
    // })
    const [fileStruct, setFileStruct] = useState([
      {
        Key: '/folder11/ddww/2.png',
        ETag: '"573037e71fbcf803d5962c411a6d3938"',
        Size: 112127,
        StorageClass: 'STANDARD',
        Owner: { DisplayName: '', ID: '8b62d5586a5b' }
      },
      {
        Key: '1.png',
        ETag: '"aa8169269f3ad7586206c0e8d6aeb518"',
        Size: 157540,
        StorageClass: 'STANDARD',
        Owner: { DisplayName: '', ID: '8b62d5586a5b' }
      },
      {
        Key: '2.png',
        ETag: '"573037e71fbcf803d5962c411a6d3938"',
        Size: 112127,
        StorageClass: 'STANDARD',
        Owner: { DisplayName: '', ID: '8b62d5586a5b' }
      },
      {
        Key: 'MAINPROJECTS.zip',
        ETag: '"bfe1debb3b5075fac6b33d311025e5b8"',
        Size: 3862358,
        StorageClass: 'STANDARD',
        Owner: { DisplayName: '', ID: '8b62d5586a5b' }
      },
      {
        Key: 'drawing.svg',
        ETag: '"4d29b0fefd5bcf851fb842d582bafb51"',
        Size: 2882,
        StorageClass: 'STANDARD',
        Owner: { DisplayName: '', ID: '8b62d5586a5b' }
      },
      {
        Key: 'folder1/.bzEmpty',
        ETag: '"d41d8cd98f00b204e9800998ecf8427e"',
        Size: 0,
        StorageClass: 'STANDARD',
        Owner: { DisplayName: '', ID: '8b62d5586a5b' }
      },
      {
        Key: 'folder1/pyt.py',
        ETag: '"823c0e3721270cd14b05a3b0a70f9fda"',
        Size: 391,
        StorageClass: 'STANDARD',
        Owner: { DisplayName: '', ID: '8b62d5586a5b' }
      },
      {
        Key: 'folder11/ddww/2.png',
        ETag: '"573037e71fbcf803d5962c411a6d3938"',
        Size: 112127,
        StorageClass: 'STANDARD',
        Owner: { DisplayName: '', ID: '8b62d5586a5b' }
      },
      {
        Key: 'hello.txt',
        ETag: '"ed076287532e86365e841e92bfc50d8c"',
        Size: 12,
        StorageClass: 'STANDARD',
        Owner: { DisplayName: '', ID: '8b62d5586a5b' }
      },
      {
        Key: 'power.txt',
        ETag: '"0f10e71f56a9dc5761b67fe78385fc91"',
        Size: 808,
        StorageClass: 'STANDARD',
        Owner: { DisplayName: '', ID: '8b62d5586a5b' }
      },
      {
        Key: 'tester.txt',
        ETag: '"ed076287532e86365e841e92bfc50d8c"',
        Size: 12,
        StorageClass: 'STANDARD',
        Owner: { DisplayName: '', ID: '8b62d5586a5b' }
      },
      {
        Key: 'upload/2.png',
        ETag: '"573037e71fbcf803d5962c411a6d3938"',
        Size: 112127,
        StorageClass: 'STANDARD',
        Owner: { DisplayName: '', ID: '8b62d5586a5b' }
      },
      {
        Key: 'upload/3.png',
        ETag: '"97ec36cd6067fde8b6eb3a160f8eaa43"',
        Size: 118181,
        StorageClass: 'STANDARD',
        Owner: { DisplayName: '', ID: '8b62d5586a5b' }
      },
      {
        Key: 'upload/Screenshot from 2019-12-21 21-03-54.png',
        ETag: '"b17778456b358bfbb7d1b65bb2a752d6"',
        Size: 112907,
        StorageClass: 'STANDARD',
        Owner: { DisplayName: '', ID: '8b62d5586a5b' }
      },
      {
        Key: 'uploadScreenshot from 2020-05-28 19-37-04.png',
        ETag: '"ab27a7ca36ef9622bcacefc3360ef8bd"',
        Size: 884539,
        StorageClass: 'STANDARD',
        Owner: { DisplayName: '', ID: '8b62d5586a5b' }
      }
    ])
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
                fileStruct
            }}
        >
            {props.children}
        </FileContext.Provider>
    )
    
}