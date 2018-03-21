//图表采用echarts制作
import React from 'react';
import { setData } from '../../../Store/storage';
import { Link } from 'react-router-dom';
import DataList from './DataList';

class CheckData extends React.Component {
	render(){
	const {questionnaireId} = this.props.location.state;
	const chartsData = setData().questionnaires.byId[questionnaireId].charts;
	return(
		<div id = "checkData" ref = "checkData1">
			<Link to = "/">&lt;返回</Link>
			<DataList
				chartsData = {chartsData}>
			></DataList>
			<Link to = "/" className = 'checkData-back-bottom'>&lt;返回</Link>
		</div>
)}
}
export default CheckData;