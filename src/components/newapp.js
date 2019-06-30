import React from 'react';
import { checkLeaveType, saveSelectedDates, deleteSelectedDates } from '../actions/action';
import { connect } from 'react-redux';
import axios from 'axios';
import styles from './newapp.css';
import Calendar from './calendar';
import { apiBaseURL } from '../utils/Constants';

class NewApp extends React.Component {
        constructor(props) {
            super(props);
        }
        //clear the month and year in state when switch from hrentry page to newapp
        componentDidMount(){
            this.props.dispatch({type:'reset'})
        } 
        render() {
            let setDateArr = (e,year,month) => {
                //save as ISO8601 dateString format, easier to check existance and convert back to date using Date();
                let dateClicked = `${year}-${month+1}-${parseInt(e.target.textContent)}`;
                if(!this.props.login.selectedDates.includes(dateClicked)){
                        this.props.dispatch(saveSelectedDates(dateClicked));
                }
                else {
                        this.props.dispatch(deleteSelectedDates(dateClicked));
                }
        }
            return ( <form onSubmit = { e => {
                        e.preventDefault();
                        axios.post(apiBaseURL, {
                                user: this.props.login.user,
                                leaveType: this.props.leaveType.leaveType,
                                leaveDays: this.refs.leaveDays.value,
                                selectedDates:this.props.login.selectedDates
                            })
                            .then(res => console.log(res.data))
                            .catch(error => console.log(error))
                    }
                }>
                <div className = { `${styles.radio} ${styles.col_lg_4} ${styles.col_sm_12}` }>
                <input type = 'radio' name = 'leavetype' id = 'annual' checked = { this.props.leaveType.leaveType === 'annual' }
                onClick = { (e) => {
                        this.refs.leaveDays.value = null;
                        this.props.dispatch(checkLeaveType(e.target.id))
                    }
                }/> 
                <label htmlFor = 'annual' > Annual </label> </div> 
                <div className = { `${styles.radio} ${styles.col_lg_4} ${styles.col_sm_12}` }>
                <input type = 'radio' name = 'leavetype' id = 'sick' checked = {
                    this.props.leaveType.leaveType === 'sick'
                }
                onClick = { (e) => {
                        this.refs.leaveDays.value = null;
                        this.props.dispatch(checkLeaveType(e.target.id))
                    }
                }
                /> 
                <label htmlFor = 'sick' > Sick </label> </div>

                <div className = { `${styles.radio} ${styles.col_lg_4} ${styles.col_sm_12}` }>
                <input type = 'radio' name = 'leavetype' id = 'unpaid' checked = {
                    this.props.leaveType.leaveType === 'unpaid'
                }
                onClick = { (e) => {
                        this.refs.leaveDays.value = null;
                        this.props.dispatch(checkLeaveType(e.target.id))
                    }
                }
                />
                <label htmlFor = 'unpaid' > Unpaid </label> </div >

                <br className = { styles.clearfix } />
                <Calendar callback={setDateArr} />
                { this.props.leaveType.leaveType === 'annual' && <div> You have { this.props.login.annualLeaveLeft } days left this year </div>}
                { this.props.leaveType.leaveType === 'sick' && <div> You have { this.props.login.sickLeaveLeft } days left this year </div>} 
                { this.props.leaveType.leaveType === 'unpaid' && <div> The days asked for may not be approved. </div>} 
                <div className = { `${styles.col_lg_6} ${styles.col_sm_12}` }>
                <input ref = 'leaveDays' type = 'text' placeholder = 'Input leave days' value={this.props.login.selectedDates.length}/> 
                </div> 
                { this.props.login.selectedDates.length>this.props.login[this.props.leaveType.leaveType + 'LeaveLeft'] && <span className = { `${styles.col_lg_6} ${styles.col_sm_12}` } > The days requested are more than the remaining </span>}
                <br />
                    <button type = 'submit' className = 'btn btn-warning' disabled = { this.props.login.isExcess }> Submit </button> </form >
                )
            }
        }

        const mapStateToProps = (state) => ({
            leaveType: state.leaveType,
            login: state.login
        })
        NewApp = connect(mapStateToProps)(NewApp);
export default NewApp;