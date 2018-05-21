import React,{ Component } from 'react';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

let Logout = (store)=>{
    store.dispatch({type:'logout'});
    sessionStorage.removeItem('leaveLogin');
    alert("You have logged out");
    return(
    <Redirect to='/' />
    )
    }

const mapStateToProps = (state) => (
    {
    login:state.login
    }
)
Logout = connect(mapStateToProps)(Logout);
export default Logout;