import React, { Component } from 'react'
import Layout from './layout/layout'
import { Redirect, withRouter } from 'react-router-dom';
import { getAllCategoryProducts } from "../actions/products.action"
import { connect } from 'react-redux';
import { Container, Spinner } from 'react-bootstrap';
import {Row, Card, Col, Dropdown, DropdownButton} from "react-bootstrap";

class Products extends Component {
    constructor(props){
        super(props);
        this.state = {
            allProductsLoaded : false,
            presentCategory : "",
            filterType: "",
            lowerRange: 0,
            upperRange: Number.POSITIVE_INFINITY,
        }
    }

    componentDidMount = async () => {
        const token = this.props.cookies.get("user-token");
        const categoryName = this.props.match.params.categoryName;
        // console.log(this.props.match.params.categoryName)
        await this.setState({presentCategory:categoryName});
        this.props.getAllCategoryProducts(token, categoryName).then(() => {
            this.setState({allProductsLoaded: true})
        });
    }

    handleLowerSelectChange = (value) => {
        var intValue = parseInt(value)
        intValue != NaN ? this.setState({lowerRange: intValue}) : this.setState({lowerRange: 0})
    }

    handleUpperSelectChange = (value) => {
        var intValue = parseInt(value)
        intValue != NaN ? this.setState({upperRange: intValue}) : this.setState({upperRange: Number.POSITIVE_INFINITY})
    }

    lowerPriceFilter = () => {
        var options = [0, 2000, 5000, 10000, 15000, 20000, 30000, 40000, 50000, 60000, 70000, 80000, 90000, 100000]
        return (
        <div style={{display: "flex", justifyContent: "flex-start"}}>
            <Col md="auto" >
                <select name="Select range" onChange={(e) => this.handleLowerSelectChange(e.target.value)}>
                    <option>Select lower range</option>
                    {options.map((option, index, options) => {
                        return <option key={options[index]}>{options[index]}</option>
                    })}
                </select>
            </Col>
            <Col md="auto">
                <select name="Select range" onChange={(e) => this.handleUpperSelectChange(e.target.value)}>
                <option>Select upper range</option>
                {options.map((option, index, options) => {
                    return <option key={options[index]}>{options[index]}</option>
                })}
                <option>Greater than {options[options.length - 1]}</option>
                </select>
            </Col>
        </div>
        )
    }

    ratingFilter = () => {
        return (
            null
        )
    }

    render() {
        if(!this.props.cookies.get("user-token")){
            return <Redirect to="/signin"/>
        }
        else{
            if(this.state.allProductsLoaded){
                return (
                    <Layout cookies={this.props.cookies}>
                        <Container fluid style={{display:"flex", justifyContent:"flex-start", flexWrap:"wrap"}}>
                            <Row>
                                <Col md="auto">
                                    <select onChange={(e) => this.setState({filterType: e.target.value})}>
                                        <option>Select a filter to apply</option>
                                        <option>Rating</option>
                                        <option>Price</option>
                                    </select>
                                </Col>  
                                <Col md="auto">
                                    {this.state.filterType == "Rating" ? this.ratingFilter() : null}
                                    {this.state.filterType == "Price" ? this.lowerPriceFilter(): null}
                                </Col>      
                            </Row>
                        </Container>
                        <Row>
                            <Container fluid style={{display:"flex", justifyContent:"flex-start", flexWrap:"wrap"}}>
                            {
                                this.props.productState.categoryProducts.map(product => {
                                    if(product.price >= this.state.lowerRange && product.price < this.state.upperRange){
                                        return (
                                            <Card as="a" key={product.name} onClick={() => this.handleProductModalOpen(this.props.productState.categoryProducts.indexOf(product))} style={{ cursor: "pointer", width: 200, margin: 15 }}>
                                                <Card.Img variant="top" src={"http://localhost:7000/public/" + product.images[0].img} style={{ width: 100, height: 140, alignSelf: "center" }} />
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
                                }
                                )
                            }
                            </Container>
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