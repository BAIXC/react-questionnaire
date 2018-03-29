import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import QuestionList from './QuestionList';
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
		const {questionnaireId, questionsArr, questionnaire} = this.props;
		if(!questionnaireId){
			return <Redirect to = "/"></Redirect>
		}
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
export default Fill;