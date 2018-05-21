import {connect} from 'react-redux';
import React, {Component} from 'react';
import {saveSelectedDates,deleteSelectedDates} from '../actions/action';
import styles from './calendar.css';

class Calendar extends Component{
	constructor(props){
		super(props);
		console.log(this);
	}

	render(){
		function leap(year){
			if(year%100 !==0 && year%4 === 0 || year%400 === 0)
				{return 1;}
			else return 0;
		}
		let opts=[];
		let year = this.props.calendar.year; 
		let month =  this.props.calendar.month;
		let firstDay = new Date(year,month,1);
		let dayOne = firstDay.getDay();
		let daysInMonth = [31,28+leap(year),31,30,31,30,31,31,30,31,30,31];
		let dateCellArr=[];
		let dateRowArr=[];
		if(this.props.callback!==undefined && this.props.callback.name==='setDateArr')
		{
		opts = [year,month];
		}
		for(let i = 1; i<=daysInMonth[month]+dayOne; i++){
			let currentDay = `${year}-${month+1}-${i-dayOne}`;
			if(i<=dayOne){
			dateCellArr.push(<td className={styles.date}></td>)
			}
			else {
			dateCellArr.push(<td className={this.props.login.selectedDates.includes(currentDay)?`${styles.today} ${styles.date}`:`${styles.date}`} onClick={this.props.callback!==undefined?e=>this.props.callback(e,...opts):null}>{i-dayOne}</td>)
			}
			if(i%7===0)
			{
				dateRowArr.push(<tr>{dateCellArr}</tr>);
				dateCellArr=[];
			}
		}
		dateRowArr.push(<tr>{dateCellArr}</tr>);

		return(
			<table>
			<thead>
		<tr>
			<th colSpan='7'><span onClick={this.props.previous}>&lt;&nbsp;&nbsp;&nbsp;</span>{month+1} {year}<span onClick={this.props.next}>&nbsp;&nbsp;&nbsp;&gt;</span></th>
		</tr>
		<tr>
			<th>Sun</th>
			<th>Mon</th>
			<th>Tue</th>
			<th>Wed</th>
			<th>Thu</th>
			<th>Fri</th>
			<th>Sat</th>
			
		</tr>
		</thead>
		<tbody>
    {dateRowArr}	
</tbody>
</table>
		)
	}
}

const mapStateToProps = (state, ownProps) => {
	return {
	calendar: state.calendar,
	login:state.login,
	}
}		
const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		next: () => {
			dispatch({type:'next'})
		},
		previous: () => {
			dispatch({type:'previous'})
		},
		dispatch
	}
}
export default Calendar = connect(mapStateToProps,mapDispatchToProps)(Calendar);