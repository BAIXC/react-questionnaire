import React from 'react';
import DataItem from './DataItem';
class DataList extends React.Component {
	componentDidMount(){
	}
	render(){	
		const dataList = this.props.chartsData.map((chart,index) => (
			<DataItem 
				chart = {chart}
				chartIndex = {index}
				key = {index}/>
		))
		return <ul>{dataList}</ul>
	}
}
export default DataList