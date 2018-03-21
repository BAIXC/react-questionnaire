import React from 'react';
import './calendar.css';

class Calendar extends React.Component {
	constructor(props){
		super(props);
		const today = new Date();
		this.state = {
			year  	  		: today.getFullYear(),
			month 	  		: today.getMonth(),
			date  	  		: today.getDate()
			isCalendarShow  : false //用于判断日期选择器是否显示
		}

		//跳转到下一个月
		toNextMonth(){

		}
		//跳转到上一个月
		toLastMonth(){

		}
		//跳转到下一年
		toNextYear(){

		}
		//跳转到上一年
		toLastYear(){

		}
		
	}
}