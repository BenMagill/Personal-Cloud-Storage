import React from 'react'
import { AuthProvider } from './AuthStore'
import { ApiProvider } from './ApiStore'
import { FileProvider } from "./FileStore"

// The only reason they are combined is to keep the index.js file render small and avoid confusion
// This just means that there will always be 1 import and that all the providers are collected here 
export function CombinedProvider(props) {
    return (
        <AuthProvider>
            <FileProvider>
                <ApiProvider>
                    {props.children}
              </ApiProvider>
            </FileProvider>
        </AuthProvider> 
    )
}