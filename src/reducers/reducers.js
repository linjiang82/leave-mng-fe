import { combineReducers } from 'redux';
import login from './login';
import leaveType from './leaveType';
import calendar from './calendar';

//import reducer here

let reducers = combineReducers(
    //list reducer below
    {
       login,
       leaveType,
       calendar,
    }
)

export default reducers;