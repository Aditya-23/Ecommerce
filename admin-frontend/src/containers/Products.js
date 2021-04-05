import React, { Component } from 'react'
import { Row, Col, Button, Modal, Form, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router';
import { getCategories } from '../actions/category.action';
import { addProduct, getAllProducts } from '../actions/products.action';
import Layout from './layout/layout'

class Products extends Component {
    constructor(props){
        super(props);

        this.state = {
            show: false,
            productName : "",
            description : "",
            price : 0,
            category : "",
            quantity : 0,
            createdBy : "",
            images : [],
            categoriesAsList : [],
            token : "",
        }
    }

    handleClose = () => {
        this.setState({show : false})
    }

    findCategoryId = (category) => {
        for (var i of this.state.categoriesAsList) {
            if(category == i.name){
                console.log(i);
                return i.id
            }
        }
    }

    handleSubmit = async () => {
        const newForm = new FormData();
        var categoryId = this.findCategoryId(this.state.category);
        // console.log("category id", categoryId);
        newForm.set("name", this.state.productName);
        newForm.set("description", this.state.description);
        newForm.set("price", this.state.price);
        newForm.set("quantity", this.state.quantity);
        newForm.set("category", categoryId);
        newForm.set("createdBy", this.state.createdBy);
        for (var i of this.state.images) {
            newForm.append("images", i);
        }
        console.log("adding product from frontend")
        await this.props.addProduct(newForm, this.props.cookies.get("token"));
        await this.setState({show : false});
        window.location.reload();
    }

    handleImageInput = (e) => {
        this.setState((prevState) => {
            return {images : [...prevState.images, e.target.files[0]]}
        })
    }

    componentDidMount = async () => {
        var token = this.props.cookies.get("token")
        await this.setState({token : token});
        await this.props.getAllProducts(token);
        await this.props.getAllCategories(token);
        await this.setState({categoriesAsList : this.props.categoriesAsList});
    }

    render() {
        if(!this.props.cookies.get("token")){
            console.log("logged in");
            return <Redirect to="/Signin"/>
        }
        else{
            return (
                <Layout sidebar={true} cookies={this.props.cookies}>
                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add Product</Modal.Title>
                        </Modal.Header>
                        <Form>
                            <Row >
                                <Col style={{marginLeft : 17}}><label>Name</label></Col>
                                
                                <Col>
                                    <input name="name" type="text" onChange={(e) => this.setState({productName : e.target.value})}/>
                                </Col>
                            </Row>
                            <Row >
                                <Col style={{marginLeft : 17}}><label>Price</label></Col>
                                
                                <Col>
                                    <input name="price" type="number" onChange={(e) => this.setState({price : e.target.value})}/>
                                </Col>
                            </Row>
                            <Row >
                                <Col style={{marginLeft : 17}}><label>Description</label></Col>
                                
                                <Col>
                                    <input name="description" type="text" onChange={(e) => this.setState({description : e.target.value})}/>
                                </Col>
                            </Row>
                            <Row >
                                <Col style={{marginLeft : 17}}><label>Quantity</label></Col>
                                
                                <Col>
                                    <input name="quantity" type="number" onChange={(e) => this.setState({quantity : e.target.value})}/>
                                </Col>
                            </Row>        
                            <Row >
                                <Col style={{marginLeft : 17}}><label>Category</label></Col>
                                
                                <Col>
                                    <select onChange={(e) => this.setState({category : e.target.value})}>
                                        <option>Select Parent Category</option>
                                        {this.props.categoriesAsList.map(category => 
                                            <option key={category.name}>{category.name}</option>
                                        )}
                                    </select>
                                </Col>
                            </Row>   
                            <Row>
                                <Col style={{marginLeft : 17}}>Upload photos</Col>
                                <Col>
                                    <input type="file" multiple="multiple" name="images" onChange={this.handleImageInput}/>
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
                    <Row>
                        {console.log(this.state)}
                        <Col sm={3} style={{paddingRight : 50}}><h3>Add Product</h3></Col>
                        <Col sm={4} style={{marginLeft : 84, paddingLeft : 600}}>
                            <Button onClick={() => {this.setState({show:true})}}>Add</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Category</th>
                                    <th>CreatedBy</th>   
                                </tr>
                            </thead>
                            <tbody>
                                {this.props.allProducts.map(product => 
                                    <tr key={product.name}>
                                        <td>{product.name}</td>
                                        <td>{product.description}</td>
                                        <td>{product.price}</td>
                                        <td>{product.categoryName}</td>
                                        <td>{product.createdByName}</td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </Row>
                </Layout>
            )
        }
        
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        allCategories : state.categoryReducer.allCategories,
        categoriesAsList : state.categoryReducer.categoriesAsList,
        allProducts : state.productReducer.products,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addProduct : (product, token) => dispatch(addProduct(product, token)),
        getAllCategories : (token) => dispatch(getCategories(token)),
        getAllProducts : (token) => dispatch(getAllProducts(token)),
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Products));