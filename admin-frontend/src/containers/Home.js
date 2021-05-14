import { connect } from 'formik';
import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router-dom';
import Layout from "../containers/layout/layout";

class Home extends Component {
    render() {
        if(!this.props.cookies.get("token")){
            return <Redirect to="/signin"/>
        }
        else{
            // this.props.cookies.remove("token");
            // this.props.cookies.remove("user")
            return (
                    <Layout sidebar={true} cookies={this.props.cookies}>
                    
                        <h1>Home</h1>
                    </Layout>
            )
        }  
    }
}

export default withRouter(Home)