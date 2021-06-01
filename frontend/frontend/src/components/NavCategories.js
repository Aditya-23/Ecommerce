import React, { Component } from 'react'
import {NavDropdown} from "react-bootstrap"
import {Link, withRouter} from "react-router-dom"

class NavCategories extends Component {
    constructor(props){
        super(props);
        this.state = {
            showBrands: false,
            currentChildCategory : ""
        }
    }

    showDropdown = (childCategoryName) => {
        this.setState({showBrands: true, currentChildCategory: childCategoryName})
    }

    hideDropdown = () => {
        this.setState({showBrands: false, currentChildCategory: ""})
    }
    // rendering first sublevel of each main category
    renderChildren = () => {
        console.log(this.props)
        return (
            this.props.category.children.map(childCategory => {
                return (
                    <NavDropdown.Item>
                        <NavDropdown key={childCategory.name} title={<div style={{color:'black', fontSize:"12px"}}>{childCategory.name}</div>}
                            id="collasible-nav-dropdown"
                            show={this.state.showBrands && this.state.currentChildCategory == childCategory.name}
                            onMouseEnter={() => this.showDropdown(childCategory.name)}
                            onMouseLeave={() => this.hideDropdown(childCategory.name)}
                            drop="right"
                        >   
                            {this.renderBrands(childCategory)}
                        </NavDropdown> 
                    </NavDropdown.Item>   
                )
            })
        )
    }

    handleRedirection = (brandName) => {
        this.props.history.push("/" + brandName)
        window.location.reload();
    }

    renderBrands = (childCategory) => {
        return (
            childCategory.children.map(brand => {
                return (
                    <NavDropdown.Item onClick={() => this.handleRedirection(brand.name)}>
                        {brand.name}
                    </NavDropdown.Item>
                )
            })
        )
    }

    render() {
        return (
            <div>
                {this.renderChildren()}
            </div>
        )
    }
}

export default withRouter(NavCategories);