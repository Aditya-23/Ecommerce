import React, { Component } from 'react'
import Layout from './layout/layout'
import {Form, Button, Container, Row, Col} from "react-bootstrap";
import {Signin_validators} from "./validators/auth_validation";
import Input from '../components/Input';
import { ErrorMessage, Formik} from "formik";
import {connect} from "react-redux"
import {adminLogin} from "../actions/authActions"
import { Redirect, Route, withRouter } from 'react-router-dom';
import {isUserLoggedIn} from "../actions/authActions"
import Home from './Home';
import authReducer from "../reducers/index"
import Cookies from 'js-cookie';

class Signin extends Component {

    constructor(props){
        super(props);

        this.emailReg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        this.state = {
                email : "",
                password : "",
                emailError : "",
                passwordError : "",   
            }

        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this)
    }

    validateEmail = (email) => {
        return this.emailReg.test(email)
    }

    validatePassword = (password) =>{
        if(password.length < 6){
            return "Min 6 characters required"
        }
        else if(password.length > 15){
            return "Max 15 characters"
        }
        return ""
    }


    handleEmail(e) {
        var isValid = this.validateEmail(e.target.value);
        this.setState((prevState) => {
            return {
                ...prevState,
                email : e.target.value,
                emailError : isValid ? "" : "Enter valid email"
            }
        })
    }

    handlePassword(e){
        var isPasswordValid = this.validatePassword(e.target.value)
        this.setState((prevState) => {
            return {
                ...prevState,
                password : e.target.value,
                passwordError : isPasswordValid
            }
        })
    }

    handleUserSubmit = async (e) => {
        e.preventDefault();
        await this.props.login({
            email : this.state.email,
            password : this.state.password,
            cookies : this.props.cookies,
        });
        // console.log("token : ", this.props.cookies.get("token"));
        // this.props.cookies.remove("token")
        // console.log("Now token : ", this.props.cookies.get("token"))
        this.props.history.push("/");
    }

    render() {
        if(this.props.cookies.get("admin-token")){
            console.log("logged in");
            return <Redirect to="/"/>
        }
        else{
            return (
                <Layout cookies={this.props.cookies}>
                    <Container>
                        <Row style={{ marginTop: '50px' }}>
                            <Col md={{ span: 6, offset: 3 }}>
                                <Form onSubmit={this.handleUserSubmit}>
                                    <Input
                                        name="email"
                                        label="Email"
                                        placeholder="Email"
                                        type="email"
                                        onChangeHandler={this.handleEmail}
                                    />
                                    <h6 style={{color : "red"}}>{this.state.emailError}</h6>
    
                                    <Input
                                        name="password"
                                        label="Password"
                                        placeholder="Password"
                                        type="password"
                                        onChangeHandler={this.handlePassword}
                                    />
                                    <h6 style={{color : "red"}}>{this.state.passwordError}</h6>
                                    <Button variant="primary" type="submit">
                                        Login
                                </Button>
                                </Form>
                            </Col>
                        </Row>
                    </Container>    
                </Layout>
            )
        }
        
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login : (user) => dispatch(adminLogin(user)),
        isUserLoggedIn : () => dispatch(isUserLoggedIn()),
    }
}

const mapStateTopProps = (state, ownProps) => {
    return {
        authenticated : state.authReducer.authenticated,
        token : state.authReducer.token,
        cookies : ownProps.cookies,
    }
}

export default withRouter(connect(mapStateTopProps, mapDispatchToProps)(Signin));
