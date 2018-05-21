// import './userdata.json';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Logout from './components/logout'
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import store from './store';

const Root = ({ store }) => (
    <Provider store={store}>
        <Router>
            <Switch>
                <Route path="/" component={App} />
            </Switch>
        </Router>
    </Provider>

)
ReactDOM.render(
    <Root store={store} />,
    document.getElementById('root'));
