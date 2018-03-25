//图表采用echarts制作
import React from 'react';
import { setData } from '../../../Store/storage';
import { Link, Redirect } from 'react-router-dom';
import DataList from './DataList';

class CheckData extends React.Component {
	render(){
	if(!this.props.location.state){
		return <Redirect to = "/"></Redirect>
	}
	const {questionnaireId} = this.props.location.state;
	const chartsData = setData().questionnaires.byId[questionnaireId].charts;
	return(
		<div id = "checkData">
			{chartsData.length === 0 ? <section className = 'checkData-noData'>暂时还没有数据</section> :
			<DataList
					chartsData = {chartsData}>
				></DataList>
			}
			
			<footer>
				<Link to = "/" className = 'checkData-back'>返回列表</Link>
			</footer>
		</div>
)}
}
export default CheckData;