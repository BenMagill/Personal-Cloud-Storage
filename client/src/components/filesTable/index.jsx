import React, {useState} from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faSort, faSortDown, faSortUp} from "@fortawesome/free-solid-svg-icons"
import Table from "react-bootstrap/Table"
import Spinner from "react-bootstrap/Spinner"

// TODO: finish this off
/**
 * Props should containa function to set the parents sorting operator (eg size asc or name desc)
 * By default each title uses faSort then once clicked uses either faSortUp or faSortDown
 * When one is clicked it is passed back and with the type it changes to.
 * 
 */
export default function Index(props) {
    const sortable = props.sortable
    const [state, setState] = useState({name: null, size: null, date: null})

    const handleHeaderClick = (e) => {
        if (sortable) {
            var temp = {...state}
            if (state[e.target.id] === null) temp[e.target.id] = "a"
            else if (state[e.target.id] === "a") temp[e.target.id] = "d"
            else if (state[e.target.id] === "d") temp[e.target.id] = "a"
            props.setCurrent({name: e.target.id, type: temp[e.target.id]})
            setState(temp)
        }
    }

    return (
        <React.Fragment>
            <Table hover>
                <thead>
                    <tr>
                        <th id="name" onClick={handleHeaderClick}>Name{sortable?<FontAwesomeIcon icon={state.name?state.name=="a"?faSortUp:faSortDown:faSort} />:null}</th>
                        <th id="size" onClick={handleHeaderClick}>Size{sortable?<FontAwesomeIcon icon={state.size?state.size=="a"?faSortUp:faSortDown:faSort} />:null}</th>
                        <th id="date" onClick={handleHeaderClick}>Date{sortable?<FontAwesomeIcon icon={state.date?state.date=="a"?faSortUp:faSortDown:faSort} />:null}</th>
                        <th className="filesInfo">Info</th>
                    </tr>
                </thead>
                <tbody>
                    {props.loaded ? props.children : null}
                </tbody>
            </Table>
            {props.loaded ? null : <div style={{columnSpan: "100", display: "flex", justifyContent: "center", alignItems: "center"}}><Spinner animation="border" variant="primary" /></div>}
        </React.Fragment>
    )
}
