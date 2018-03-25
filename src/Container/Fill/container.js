import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import QuestionList from './QuestionList';
import { actions as questionActions } from '../../reducer/questions';
import { Modal, Button } from 'antd';
import './fill.css';
const confirm = Modal.confirm;
class Fill extends React.Component {
	constructor(props){
		super(props);
		this.submitConfirm = this.submitConfirm.bind(this);
	} 
	checkQuestions(questionsArr){
		let isAnswerCompleted = true;
		questionsArr.forEach((item) => {
			if(item.isRequired && item.text === ''){
				Modal.warning({
					title: '还有问题未回答',
					content: '带星号的题目为必答题'
				});
				isAnswerCompleted = false;
			}
		});
		return isAnswerCompleted;
	}
	submitConfirm(questionsArr) {
		const checkQuestions = this.checkQuestions;
		const history = this.props.history;
		confirm({
			title: '确定要提交问卷吗',
		    okText: '提交',
		    cancelText: '取消',
			onOk() {
				const pass = checkQuestions(questionsArr)
				if(pass){
			 		history.push('/');
				}
			},
			onCancel() {
			 	console.log('Cancel');
			},
    	});
	}
	render(){	
		const {questionsData, questionnaires, location} = this.props;
		//获取home页传过来的参数(问卷Id)
		// const {questionnaireId} = location.state;
		const questionnaireId = 'Qnn2';
		//获取当前问卷的所有数据
		const questionnaire = questionnaires.byId[questionnaireId];
		//获取当前问卷的问题数据（保存的是问题的id数组）
		const questionIds = questionnaire.questions;
		//根据获取到的问题id到questions中寻找相应的问题数据
		const questionsArr = questionIds.map((item) => questionsData.byId[item]);

		const questionsDetail =  
			(<div className = "questions-content">
				<QuestionList 
					questions = {questionsArr}
					questionnaireId = {questionnaireId}
					editTextarea = {this.props.editTextarea}
				/>
			</div>);
		return (
			<div id = "fill">
				<h3 
					className = "fill-title" 
					>{questionnaire.title}</h3>
				{questionsDetail}
				<footer>
					<Button type = 'primary' className = "publish"
							onClick = {()=>this.submitConfirm(questionsArr)}
							>提交问卷</Button>
					<Button type = 'primary' className = "save">
						<Link to = '/'>返回列表</Link>
					</Button>
				</footer>
			</div>
		)
	}
}
const mapStateToProps = (state) => ({
	questionnaires : state.questionnaires,
	questionsData : state.questions,
	questionnaireId : state.currentId
});
const mapDispatchToProps = {
	editTextarea : questionActions.editTextarea
}
Fill = withRouter(connect(mapStateToProps,mapDispatchToProps)(Fill));
export default Fill;