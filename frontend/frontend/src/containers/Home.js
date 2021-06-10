import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router-dom';
import Layout from "../containers/layout/layout";

class Home extends Component {
    render() {
        if(!this.props.cookies.get("user-token")){
            return <Redirect to="/signin"/>
        }
        else{
            // this.props.cookies.remove("token");
            // this.props.cookies.remove("user")
            return (
                    <Layout cookies={this.props.cookies}>
                    </Layout>
            )
        }  
    }
}

export default withRouter(Home)