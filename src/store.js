import { createStore, applyMiddleware } from 'redux';
import promiseMiddleWare from 'redux-promise-middleware';
import reducers from './reducers/reducers';
import axios from 'axios';
import logger from 'redux-logger';
export default  createStore(reducers,{},applyMiddleware( promiseMiddleWare(),logger)); 