import React,{ Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import  Logout from './logout';
import { login } from '../actions/action';
import axios from 'axios';

let Login = (store) => {
    console.log(store);
    let name=null;
    let password=null;
    return (
    <div> 
        <form onSubmit={(e)=>{
        e.preventDefault();
        if(!['john','julie','emma','emily','manager'].includes(name.value)){
            alert('username is incorrect!');
        }        
        else if(password.value!=='test'){
            alert('password is incorrect!');
        }
        else {
            sessionStorage.setItem('leaveLogin',name.value);
            store.dispatch(login(name.value));
            store.dispatch({type:'fetchdata',payload:axios.get('/userdata.json')})
        }
    }}>
        <input ref={(input)=>{name=input}} type='text' placeholder='Name' />
        <input ref={(input)=>{password=input}} type='password' placeholder='Password' />
        <button type='submit'>Submit</button>
        </form>
        
    </div>
    )
}
const mapStateToProps = (state) => (
    {
        login:state.login,
    }
)
Login=connect(mapStateToProps)(Login);

export default Login;