import React from 'react';
import Login from './components/login'
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import  NewApp  from './components/newapp';
import  QueryApp  from './components/queryapp';
import  Logout  from './components/logout';
import  HrEntry from './components/hrentry';
import { connect } from 'react-redux';
import axios from 'axios';
import styles from './App.css';

class App extends React.Component{
  constructor(props){
    super(props);
    this.navBtnClicked=this.navBtnClicked.bind(this);
    console.log(props);
    if(sessionStorage.getItem('leaveLogin')){
      props.dispatch({type:'login',user:sessionStorage.getItem('leaveLogin')})
      props.dispatch({type:'fetchdata',payload:axios.get('/userdata.json')})
    };
  }
  navBtnClicked(){
    let narrowLinks=document.querySelector('#narrowLinks');
    let navBtn=document.querySelector('#navBtn');
    let navBtnH=navBtn.offsetHeight;
    let narrowLinksH=narrowLinks.scrollHeight;
    // narrowLinks.style.display==='block'?narrowLinks.style.display='none':narrowLinks.style.display='block';
    narrowLinks.clientHeight===navBtnH?narrowLinks.style.height=narrowLinksH+'px':narrowLinks.style.height=navBtnH+'px';//-2 to minus the padding
  }
  render(){
    return (
      <Router>
          <div>
            <div className={styles.header} >
              <Link to='/' className={styles.logo}></Link>
              <div className={styles.navWide}>
                  <Link to='/newapplication' className={styles.appLink}>New</Link>
                  <Link to='/queryapplication'  className={styles.appLink}>Query</Link>
                 {this.props.login.user==='manager'?<Link to='/hrentry'  className={styles.appLink}>HR Entry</Link>:null}
                  {this.props.login.isLogin?<Link to='/logout' className={styles.appLink}>Logout</Link>:<div></div>}
              </div>
              <div className={styles.navNarrow} id='narrowLinks'>
                <button onClick={this.navBtnClicked}  className={styles.navBtn} id='navBtn'>MENU</button>
                <div className={styles.narrowLinks} >
                  <Link className={styles.appLink} to='/newapplication'><label >New</label></Link>
                  <Link className={styles.appLink} to='/queryapplication'><label >Query</label></Link>
                  {this.props.login.user==='manager'?<Link to='/hrentry'  className={styles.appLink}><label>HR Entry</label></Link>:null }
                  {this.props.login.isLogin?<Link className={styles.appLink} to='/logout'><label >Logout</label></Link>:<div></div>}
                </div>
              </div>
              <div className={styles.clearfix}></div>
            </div>
            <div className={styles.main}>
              <Switch>
              <PrivateRoute exact path='/newapplication' loginStatus={this.props.login.isLogin} component={ NewApp }></PrivateRoute>
              <PrivateRoute exact path='/queryapplication' loginStatus={this.props.login.isLogin} component={ QueryApp }></PrivateRoute>
              <PrivateRoute exact path='/hrentry' loginStatus={this.props.login.isLogin} component={ HrEntry }></PrivateRoute>
              <PrivateRoute exact path='/logout' loginStatus={this.props.login.isLogin} component={ Logout }></PrivateRoute>
              {!this.props.login.isLogin?<Route exact path='/' component={ Login } />:<Route exact path='/' component={ NewApp } />}
              </Switch>
            </div>
            <div className={`${styles.footer}`}>
              <span>Copyright</span>
            </div>
          </div>
      </Router>
        )
  }
}


let PrivateRoute = ({component:Component,...rest}) => {
  console.log(rest);
  const isLogin=rest.loginStatus;
  return (
    isLogin?(<Route { ...rest } component={Component}/>):(<Redirect to='/'/>) 
  )
}

const mapStateToProps = (state) => {
    return {
        login:state.login,
    }

}

export default App = connect(mapStateToProps)(App)
