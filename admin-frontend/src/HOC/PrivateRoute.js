import React, { Component } from 'react'
import {Route} from "react-router-dom";
import Home from '../containers/Home';
import Signin from '../containers/Signin';
import {Redirect} from "react-router-dom"

export default function PrivateRoute({component:Component, ...rest}) {
    return (
        <Route {...rest} component={(props) => {
            const authenticated = props.cookies.get("token");
            if(authenticated){
                return <Component {...props}/>
            }
            else{
                return <Signin/>
            }
        }}/>
    )
}
