import React, { Component } from 'react'
import { Col, Container, Row, Button, Modal, Form } from 'react-bootstrap'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router'
import Layout from './layout/layout'
import categoryReducer from "../reducers/category.reducer";
import { addCategory, getCategories } from "../actions/category.action";

const categoryStyle ={
    display : "flex",
    flexDirection: 'row',
    justifyContent : "flex-start"
}

class Categories extends Component {
    constructor(props){
        super(props)
        this.state = {
            show : false, 
            parent : "",
            image : "",
            categoryName : "",
            categoriesAsAList : [],
            alert : "",
            token : "",
        }
    }

    handleClose = () => {
        this.setState({show : false, parent : "", image : "", categoryName : ""});
    }

    handleShow = () => {
        this.setState({show : true});
    }

    handleSelect = (e) => {
        this.setState({parent : e.target.value});
    }

    findParentId = (parent) => {
        for (var i of this.state.categoriesAsAList) {
            if(parent == i.name){
                console.log(i);
                return i.id
            }
        }
    }

    handleSubmit = async () => {
        const newForm = new FormData();
        const parentId = this.findParentId(this.state.parent);
        console.log("parentId", parentId);
        newForm.set("name", this.state.categoryName);
        newForm.set("image", this.state.image);
        newForm.set("parentId", this.findParentId(this.state.parent));
        await this.props.addCategory(newForm, this.state.token);
        await this.setState({show : false});
        window.alert(this.props.alert);
        window.location.reload();
    }

    componentDidMount = async () => {
        console.log("Calling here")
        var token = this.props.cookies.get("admin-token")
        await this.setState({token : token});
        await this.props.getAllCategories(token);
        await this.setState({categoriesAsAList : this.props.categoriesAsList});
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

    render() {
        if(!this.props.cookies.get("admin-token")){
            console.log("logged in");
            return <Redirect to="/Signin"/>
        }
        else{
            return (          
                <Layout sidebar={true} cookies={this.props.cookies}>
                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add Category</Modal.Title>
                        </Modal.Header>
                        <Form>
                            <Row >
                                <Col style={{marginLeft : 17}}><label>Category</label></Col>
                                
                                <Col>
                                    <input name="category" onChange={(e) => this.setState({categoryName : e.target.value})}/>
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{marginLeft : 17}}><label>Parent-Category</label></Col>
                                <Col>
                                <select onChange={this.handleSelect}>
                                    <option>Select Parent Category</option>
                                    {this.props.categoriesAsList.map(category => 
                                        <option key={category.name}>{category.name}</option>
                                    )}
                                </select>
                                </Col>
                            </Row>
                            <Row>
                                <Col style={{marginLeft : 17}}>Upload photo</Col>
                                <Col>
                                    <input type="file" name="image" onChange={(e) => this.setState({image : e.target.files[0]})}/>
                                </Col>
                            </Row>
                            
                        </Form>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={this.handleSubmit}>
                                Add
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <Row >
                        <Col sm={3} style={{paddingRight : 50}}>
                            <h3 >Categories</h3>
                        </Col>
    
                        <Col sm={8} style={{marginLeft : 84, paddingLeft : 600}}>
                            <Button onClick={this.handleShow}>Add</Button>
                        </Col>
                    </Row>
                    <Row style={categoryStyle}>
                        <Col sm={2}>
                            <ul>
                                {this.showAllCategories(this.props.allCategories)}
                            </ul>
                        </Col>
                            
                        
                    </Row>
                    
                </Layout>
            )
        }
        
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllCategories : (token) => dispatch(getCategories(token)),
        addCategory : (formData, token) => dispatch(addCategory(formData, token)),
    }
}

const mapStateToProps = (state) => {
    return {
        allCategories : state.categoryReducer.categories,
        alert : state.categoryReducer.alert,
        categoriesAsList : state.categoryReducer.categoriesAsList,
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Categories));