import React from 'react'
import {Form, Button, Container, Row, Col} from "react-bootstrap";

export default function Input(props) {
    return (
        <Form.Group as={Row} >
            <Form.Label>{props.label}</Form.Label>
            <Form.Control name={props.name} type={props.type} placeholder={props.placeholder} value={props.value} onChange={props.onChangeHandler}/>
            <Form.Text style={{color : "red"}} >
                {props.error}
            </Form.Text>
        </Form.Group>
    )
}
