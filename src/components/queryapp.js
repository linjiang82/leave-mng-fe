import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import LoadingOverlay from 'react-loading-overlay';
import {apiBaseURL} from '../utils/Constants';
const socket=io('https://leave-manage.herokuapp.com')

class QueryApp extends React.Component {
    constructor(props){
        super(props);
        this.props.dispatch({type:'clearAppStatus'});
        this.props.dispatch({type:'readStatus',payload:axios.get(`${apiBaseURL}/getApp`)});
    }
    render(){
        socket.on('saved',()=>{
        this.props.dispatch({type:'readStatus',payload:axios.get(`${apiBaseURL}/getApp`)});
        })
        let TRS=[];
        if(!this.props.login.isFetching){
            for(let i=0;i<this.props.login.appStatus.length;i++){
                let TDS=[];
                TDS.push(<td>{this.props.login.appStatus[i].appId}</td>);
                TDS.push(<td>{this.props.login.appStatus[i].user}</td>); 
                TDS.push(<td>{this.props.login.appStatus[i].leaveType}</td>);
                TDS.push(<td>{this.props.login.appStatus[i].leaveDays}</td>);
                TDS.push(<td>{this.props.login.appStatus[i].status}</td>);
                TRS.push(<tr>{TDS}</tr>)
            }
            return (
                <table>
                    <thead>
                        <tr>
                        <th>
                            Application No
                        </th>
                        <th>
                            Applicant
                        </th>
                        <th>
                            Leave Type
                        </th>
                        <th>
                            Leave Days
                        </th>
                        <th>
                            Approval
                        </th>
                        </tr>
                    </thead>
                    <tbody>
                    {TRS}
                    </tbody>
                </table>
            )
        }
        else return <LoadingOverlay
        active={this.props.login.isFetching}
        spinner
        text='Loading...'
        >
      </LoadingOverlay>
        
    }
}

const mapStateToProps = (state) => ({
    login:state.login
})

QueryApp=connect(mapStateToProps)(QueryApp);
export default QueryApp;
