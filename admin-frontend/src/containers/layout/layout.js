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
                props.sidebar ?
                <Container fluid>
                    <Row>
                        <Col className={styles.container} sm={2}>
                            <NavLink href="/">Home</NavLink>
                            <NavLink href="/products">Products</NavLink>
                            <NavLink href="/categories">Categories</NavLink>
                            <NavLink href="/orders">Orders</NavLink>
                        </Col>
                        <Col sm={10}>
                            {props.children}
                        </Col>
                    </Row>
                </Container> :
                props.children
            }
            
        </>
    )
}
