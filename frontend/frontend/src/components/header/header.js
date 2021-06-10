import React, {Component} from 'react'
import {Navbar, Nav, Form, Button, FormControl, NavLink, Container, NavItem, NavDropdown, Dropdown} from "react-bootstrap";
import { Link, Redirect, withRouter } from 'react-router-dom';
import { adminSignout } from '../../actions/authActions';
import {connect } from "react-redux"
import { getCategories } from '../../actions/category.action';
import NavCategories from '../NavCategories';

class Header extends Component {
    constructor(props){
        super(props);
        this.handleSignout = this.handleSignout.bind(this)
        this.state = {
            categoriesLoaded : false,
            topCategories : ["Electronics", "Fashion", "Essentials", "Luxury"],
            dropdown : false,
            categoryDropdownList : [],
        }
    }

    showDropdown = async () => {
        this.setState({dropdown : true})
    }

    hideDropdown = async () => {
        this.setState({dropdown : false})
    }

    handleSignout = async () => {
        console.log("About to signout")
        await this.props.signout(this.props.cookies);
        window.location.reload();
        console.log("Signed out")
    }

    showAllCategories = (allCategories) => {
        var newCategories = [];
        for (var i of allCategories) {
            newCategories.push(
                <li key={i.name}>
                    {i.name}
                    {i.children.length > 0 ? <ul>{this.showAllCategories(i.children)}</ul>: null}                    
                </li>
            )
        }
        return newCategories;
    }

    loggedOutUser = () => {
        return(
            <Container style={{display:"flex", justifyContent:"flex-end"}}>
                <Nav>
                    <Nav.Item>
                        <Nav.Link href="/signin">SignIn</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="/signup" >SignUp</Nav.Link>
                    </Nav.Item>
                </Nav>
            </Container>
        )
    }
 
    handleCategoryClick = (categoryName) => {
        <Link to={"/" + categoryName}/>
    }

    renderChildCategories = (category) => {
        if(!category.children.length){
            return (
                    <NavDropdown.Item eventKey={category.name} href={"/" + category.name}>
                        {category.name}
                    </NavDropdown.Item>            
            )
        }
        return (
            <>
                {category.children.map(childCategory => {
                    return (      
                        <NavDropdown.Item>
                            <NavDropdown title={<div style={{color:'black', fontSize:"12px"}}>{childCategory.name}</div>}
                                id="collasible-nav-dropdown"
                                show={this.state.dropdown}
                                onMouseEnter={this.showDropdown}
                                onMouseLeave={this.hideDropdown}
                                drop="right"
                            >   
                                {/* {console.log("with children", childCategory.name)} */}
                                {this.renderChildCategories(childCategory)}
                            </NavDropdown> 
                        </NavDropdown.Item>     
                    )
                })}  
            </>
        )
    }

    loggedInUser = () => {
        return (
            <Container style={{display:"flex", justifyContent:"flex-start"}}>
            
                <Nav className="mr-auto">
                    {this.props.allCategories.map(category => {
                        return(
                            <NavDropdown title={category.name} id="collasible-nav-dropdown" key={category.name}>
                                {/* {this.renderChildCategories(category)} */}
                                <NavCategories category={category} another="aditya"/>
                                
                            </NavDropdown>
                        )
                    })}
                </Nav>
                <div style={{marginLeft:'auto', display:"flex", justifyContent:"flex-start"}}>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-light">Search</Button>
                    </Form>
                    <div className="nav-item">
                        <span className="nav-link" onClick={this.handleSignout} style={{cursor:"pointer", color:"white"}}>Signout</span>
                    </div>     
                </div> 
            </Container>
        )
    }

    componentDidMount = async () => {
        await this.props.getAllCategories(this.props.cookies.get("user-token"));
        await this.setState({categoriesLoaded: true});
        console.log("Header : " ,this.props.allCategories);
    }

    render(){
        // {console.log(this.props.cookies)}
        return (
            <Navbar bg="primary" variant="dark">
                <Navbar.Brand href="#home">Ecom Logo</Navbar.Brand>
                {this.props.cookies.get("user-token") ? this.loggedInUser() : this.loggedOutUser()}
            </Navbar>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        allCategories : state.categoryReducer.categories,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signout : (cookies) => dispatch(adminSignout(cookies)),
        getAllCategories : (token) => dispatch(getCategories(token)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));