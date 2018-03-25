import React from 'react';
import ReactDOM from 'react-dom';
import './checkData.css';

class DataItem extends React.Component {
	componentDidMount(){
		// //一个问题的数据
		const chartData = this.props.chart;
		// //每个问题对应的索引
		const chartIndex = this.props.chartIndex
		var echarts = require('echarts');
		// 基于准备好的dom，初始化echarts实例
		let myChart = `myChart${chartIndex}`;
		myChart = echarts.init(ReactDOM.findDOMNode(this.refs[`chart${chartIndex}`]));
		myChart.setOption(chartData);
		window.addEventListener("resize", function () { 
          myChart.resize(); 
     });
	}
	render(){
		//每个问题对应的索引
		const chartIndex = this.props.chartIndex
		return (
			<section 
			className = {`single-chart chart${chartIndex}`}
			ref = {`chart${chartIndex}`}
			></section>
		)
	}
}
export default DataItem;