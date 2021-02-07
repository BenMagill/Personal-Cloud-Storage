import React from 'react'
import Table from "react-bootstrap/Table"
export default function index(props) {
    return (
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
                {props.children}
            </tbody>
        </Table>
    )
}
