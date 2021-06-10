import React, {Component} from 'react'
import {Navbar, Nav, Form, Button, FormControl, NavLink} from "react-bootstrap";
import { withRouter } from 'react-router-dom';
import { adminSignout } from '../../actions/authActions';
import {connect } from "react-redux"

class Header extends Component {
    constructor(props){
        super(props);
        this.handleSignout = this.handleSignout.bind(this)
    }

    handleSignout = async () => {
        console.log("About to signout")
        await this.props.signout(this.props.cookies);
        window.location.reload();
        console.log("Signed out")
    }

    loggedOutUser = () => {
        return(
            <Nav>
                <Nav.Item>
                    <Nav.Link href="/signin">SignIn</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/signup">SignUp</Nav.Link>
                </Nav.Item>
            </Nav>
        )
    }

    loggedInUser = () => {
        return (
            <Nav>
                <li className="nav-item">
                    <span className="nav-link" onClick={this.handleSignout}>Signout</span>
                </li>
            </Nav>
        )
    }

    render(){
        {console.log(this.props.cookies)}
        return (
            <Navbar bg="dark" variant="dark" style={{zIndex:1}}>
                <Navbar.Brand href="/">Admin</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                </Nav>
                {this.props.cookies.get("admin-token") ? this.loggedInUser() : this.loggedOutUser()}
            </Navbar>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signout : (cookies) => dispatch(adminSignout(cookies))
    }
}

export default withRouter(connect(null, mapDispatchToProps)(Header));