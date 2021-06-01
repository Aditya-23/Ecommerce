import logo from './logo.svg';
import './App.css';
import Layout from './containers/layout/layout';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import Home from "./containers/Home";
import Signin from "./containers/Signin";
import Signup from "./containers/Signup";
import { applyMiddleware, compose, createStore } from 'redux';
import createRootReducer from "./reducers/index"
import thunk from 'redux-thunk';
import { ConnectedRouter, routerMiddleware } from 'connected-react-router';
import appReducer from './reducers/index';
import { Component } from 'react';
import { isUserLoggedIn } from './actions/authActions';
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"
import Orders from './containers/Orders';
import {withCookies, Cookies} from "react-cookie";
import {instanceOf} from "prop-types"
import Products from './containers/Products';


class App extends Component {

  constructor(props){
    super(props);

  }

  render(){
    return (
      <div className="App">
            <Switch>
              <Route path="/" exact render={() => <Home cookies={this.props.cookies}/>} />
              <Route path="/signup" exact render={() => <Signup cookies={this.props.cookies}/>}  />
              <Route path="/signin" exact render={() => <Signin cookies={this.props.cookies}/>} />
              <Route path="/:categoryName" render={() => <Products cookies={this.props.cookies}/>}/>
              {/* <Route path="/products" exact render={() => <Products cookies={this.props.cookies}/>}/> */}
              {/* <Route path="/categories" exact render={() => <Categories cookies={this.props.cookies}/>}/> */}
              <Route path="/orders" exact render={() => <Orders cookies={this.props.cookies}/>}/>
            </Switch>
      </div>
    );
  }
  
}

const mapDispatchToProps = (dispatch) => {
  return {
    isUserLoggedIn : () => dispatch(isUserLoggedIn),
  }
}

export default withRouter(connect(null, mapDispatchToProps)(withCookies(App)));
