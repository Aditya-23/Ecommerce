import React, { Component } from 'react';
import Layout from './layout/layout'
import {Form, Button, Container, Row, Col} from "react-bootstrap";
import Input from '../components/Input';
import {adminRegister} from "../actions/user_actions"
import {withRouter, Redirect} from "react-router-dom"
import {connect} from "react-redux"

class Signup extends Component {

    constructor(props){
        super(props);

        this.state = {
            firstname : "",
            lastname : "",
            email : "",
            password : "",
            phone : "",
            username : "",
            firstnameError : "",
            lastnameError : "",
            usernameError : "",
            emailError : "",
            phoneError : "",
            passwordError : ""
        }
        this.mapFieldToValidator = {
            "firstname" : this.nameValidator,
            "lastname" : this.nameValidator,
            "phone" : this.phoneValidator,
            "email" : this.emailValidator,
            "password" : this.passwordValidator,
            "username" : this.nameValidator
        }
        this.emailReg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        this.passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/
    }

    nameValidator = (name) => {
        if(name.length < 3){
            return "Min length should be 3"
        }
        else if(name.length > 15){
            return "Max length can be 15"
        }
        return ""
    }

    phoneValidator = (phone) => {
        return phone.length == 10
    }

    emailValidator = (email) => {
        return this.emailReg.test(email) ? "" : "Enter a valid email address"
    }

    passwordValidator = (password) => {
        if(!this.passwordReg.test(password)){
            return "Password should contain min 8 character, max 15 character, atleast 1 uppercase, one lowercase, one number and one special character"
        }
        return ""
    }

    handleInputChange = (event) => {
        const stateVarName = event.target.name;
        var errorVarValue = this.mapFieldToValidator[stateVarName](event.target.value);
        var errorVar = stateVarName + "Error";
        this.setState({
            [stateVarName] : event.target.value,
            [errorVar] : errorVarValue
        })
        console.log(this.state)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log("axios")
        this.props.register({
            firstname : this.state.firstname,
            lastname : this.state.lastname,
            username : this.state.username,
            password : this.state.password,
            email : this.state.email,
            phone : this.state.phone
        });
        
        this.props.history.push("/signin")
    }

    render() {
        if(window.localStorage.getItem("token")){
            console.log("logged in");
            return <Redirect to="/"/>
        }else {
            return (
                <Layout cookies={this.props.cookies}>
                    <Container>
                        <Row >
                            <Form onSubmit={this.handleSubmit}>
                            <Col md={{span : 6, offset : 3}} style={{ marginTop: 20, marginInline : 250 }}>
                                <Row>
                                    <Col md={{span : 5}} style={{marginInline : 30, paddingInline : 20}}>
                                        <Input
                                            name="firstname"
                                            label="Firstname"
                                            placeholder="firstname"
                                            type="text"
                                            onChangeHandler={this.handleInputChange}
                                        /> 
                                        <h6 style={{color : "red"}}>{this.state.firstnameError}</h6>
                                    </Col>
                                    <Col  md={{span : 5}}>
                                        <Input
                                            name="lastname"
                                            label="Lastname"
                                            placeholder="lastname"
                                            type="text"
                                            onChangeHandler={this.handleInputChange}
                                        /> 
                                        <h6 style={{color : "red"}}>{this.state.lastnameError}</h6>
                                    
                                    </Col>
                                </Row>
                                <Row>
                                    <Col style={{marginInline : 30, paddingInline : 20}}>
                                        <Input
                                            name="username"
                                            label="Username"
                                            placeholder="Username"
                                            type="text"
                                            onChangeHandler={this.handleInputChange}
                                        /> 
                                        <h6 style={{color : "red"}}>{this.state.usernameError}</h6>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col style={{marginInline : 30, paddingInline : 20}}>
                                        <Input
                                            name="email"
                                            label="Email"
                                            placeholder="Email"
                                            type="text"
                                            onChangeHandler={this.handleInputChange}
                                        /> 
                                        <h6 style={{color : "red"}}>{this.state.emailError}</h6>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col style={{marginInline : 30, paddingInline : 20}}>
                                        <Input
                                            name="password"
                                            label="Password"
                                            placeholder="Password"
                                            type="password"
                                            onChangeHandler={this.handleInputChange}
                                        /> 
                                        <h6 style={{color : "red"}}>{this.state.passwordError}</h6>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col style={{marginInline : 30, paddingInline : 20}}>
                                        <Input
                                            name="phone"
                                            label="Phone"
                                            placeholder="Phone"
                                            type="number"
                                            onChangeHandler={this.handleInputChange}
                                        /> 
                                        <h6 style={{color : "red"}}>{this.state.phoneError}</h6>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col style={{paddingInline : 20}}>
                                    <Button name="submit" variant="primary" type="submit">
                                        Register
                                    </Button>
                                    </Col>
                                </Row>
                            </Col>
                            </Form>
                        </Row>
                    </Container>
                    
                </Layout>
            )   
        }
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        register : (user) => dispatch(adminRegister(user)),
    }
};

export default withRouter(connect(null, mapDispatchToProps)(Signup));