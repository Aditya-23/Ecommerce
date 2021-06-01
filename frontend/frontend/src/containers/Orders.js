import React, { Component } from 'react'
import Layout from './layout/layout'

export default class Orders extends Component {
    render() {
        return (
            <Layout sidebar={true} cookies={this.props.cookies}>
                <h2>Orders</h2>
            </Layout>
        )
    }
}
