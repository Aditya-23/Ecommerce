import React from 'react'
import Header from "../../components/header/header"
import {Jumbotron, Button} from "react-bootstrap"
import { Col, Container, NavLink, Row } from 'react-bootstrap'
import styles from "./layout.module.css"

export default function Layout(props) {
    return (
        <>
            <Header cookies={props.cookies}/>
            {
                props.children
            }
            
        </>
    )
}
