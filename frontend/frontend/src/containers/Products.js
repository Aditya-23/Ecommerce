import React, { Component } from 'react'
import Layout from './layout/layout'
import { Redirect, withRouter } from 'react-router-dom';
import { getAllCategoryProducts } from "../actions/products.action"
import { connect } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import {Row, Card} from "react-bootstrap";

class Products extends Component {
    constructor(props){
        super(props);
        this.state = {
            allProductsLoaded : false,
            presentCategory : ""
        }
    }

    componentDidMount = async () => {
        const token = this.props.cookies.get("token");
        const categoryName = this.props.match.params.categoryName;
        // console.log(this.props.match.params.categoryName)
        await this.setState({presentCategory:categoryName});
        this.props.getAllCategoryProducts(token, categoryName).then(() => {
            this.setState({allProductsLoaded: true})
        });
        console.log("category products : ", this.props.productState.categoryProducts)
    }

    render() {
        if(!this.props.cookies.get("token")){
            return <Redirect to="/signin"/>
        }
        else{
            if(this.state.allProductsLoaded){
                return (
                    <Layout cookies={this.props.cookies}>
                        <Row>
                            <div style={{display:"flex", justifyContent:"flex-start", flexWrap:"wrap"}}>
                            {
                                this.props.productState.categoryProducts.map(product =>
                                    <Card as="a" onClick={() => this.handleProductModalOpen(this.props.productState.categoryProducts.indexOf(product))} style={{ cursor: "pointer", width: 200, margin:15 }}>
                                        <Card.Img variant="top" src={"http://localhost:7000/public/" + product.images[0].img} style={{width: 100, height:140, alignSelf:"center"}} />
                                        <Card.Body>
                                            <Card.Title>{product.name}</Card.Title>

                                            <Card.Text style={{ display: "flex", justifyContent: "center" }}>
                                                {product.categoryName}
                                            </Card.Text>
                                        </Card.Body>
                                        <Card.Footer>
                                            <Card.Text>Rs.  {product.price}</Card.Text>
                                        </Card.Footer>
                                    </Card>
                                )
                            }
                            </div>
                        </Row>
                    </Layout>
            ) 
            }
            else{
                return (<>
                    <Spinner animation="border" >
                        
                    </Spinner>
                    <div>
                        Still Loading...
                    </div>
                    </>
            )
            }
            
        }  
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        productState : state.productReducer,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllCategoryProducts : (token, categoryName) => dispatch(getAllCategoryProducts(token, categoryName)),
    }
}

export default withRouter( connect(mapStateToProps, mapDispatchToProps)(Products));