import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import LoadingOverlay from 'react-loading-overlay';
import io from 'socket.io-client';
import styles from './hrentry.css';
import Calendar from './calendar';
import {copySelectedDates, toggleCalendar} from '../actions/action';
import {apiBaseURL} from '../utils/Constants';

const socket=io('https://leave-manage.herokuapp.com')

class HrEntry extends React.Component{
  constructor(props){
    super(props);
    this.props.dispatch({type:'clearAppStatus'});
    this.saveItem = this.saveItem.bind(this);
    this.props.dispatch({type:'readAll',payload:axios.get(`${apiBaseURL}/getApp`)});
    // this.state = {
    //     year:null,
    //     month:null
    // }
  }
  componentDidMount(){
    this.props.dispatch({type:'reset'})
  }
  saveItem(e){
    let result='';
    if(e.target.parentNode.parentNode.childNodes[2].checked)
      result='Declined';
      else if(e.target.parentNode.parentNode.childNodes[0].checked)
          result='Approved';
    axios.post(`${apiBaseURL}/saveItem`,{
      appId:e.target.parentNode.parentNode.parentNode.firstChild.textContent,
      status:result,
    }).then(response=>console.log(response))
    .catch(err=>console.log(err))
  }
  render(){
    let TRS=[];
        if(!this.props.login.isFetching){
            for(let i=0;i<this.props.login.appStatus.length;i++){
                let TDS=[];
                TDS.push(<td>{this.props.login.appStatus[i].appId}</td>);
                TDS.push(<td>{this.props.login.appStatus[i].user}</td>); 
                TDS.push(<td>{this.props.login.appStatus[i].leaveType}</td>);
                TDS.push(<td onClick={
                    (e)=>{
                        this.props.dispatch(copySelectedDates(i));
                        //set the year and month and pass to Calendar to render the first
                        //date of the application.
                        let re=/(\d{4})-(\d)-/g;
                        let result = re.exec((this.props.login.appStatus[i].selectedDates)[0]);
                        this.props.dispatch(
                          {type:'gotoDate',
                        year:parseInt(result[1]),
                        month:parseInt(result[2])-1}
                        )
                        let x=e.target.parentNode.parentNode.querySelectorAll('tr')
                        for(let i=0;i<x.length;i++){
                            x[i].style.backgroundColor='grey';
                        }
                       e.target.parentNode.style.backgroundColor='blanchedalmond';
                    }
                }>
                {this.props.login.appStatus[i].leaveDays}</td>);
                TDS.push(<td><input type='radio' value='Approved' name={`Approval${i}`} /><label>Approved</label><input type='radio' value='Declined' name={`Approval${i}`}/><label>Declined</label>
                <div className={ styles.saveBTN }><button className={ styles.saveBTNinner } onClick={(event)=>this.saveItem(event)}>Save</button></div></td>);
                TRS.push(<tr className={styles.row}>{TDS}</tr>)
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
                    {/*<Calendar year={this.state.year} month={this.state.month}/>*/}
                    <Calendar />
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

const mapStateToProps = (state) => {
  return {
    login: state.login,
    calendar:state.calendar
  }
}


export default HrEntry=withRouter(connect(mapStateToProps)(HrEntry));
