import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions as questionnaireActions } from '../../../reducer/questionnaires';
import { actions as questionActions } from '../../../reducer/questions';
import Transition from 'react-transition-group/Transition';
import QuestionList from './QuestionList';
import { checkDeadline } from '../../../util/util';
import './edit.css';
import { DatePicker, Modal, Button } from 'antd';
import moment from 'moment'
const confirm = Modal.confirm;
const duration = 300;

const defaultStyle = {
  transition: `display ${duration}ms ease-in-out`,
  display: 'none',
  background : '#ddd'
}

const transitionStyles = {
  entering: { display : 'none' },
  entered:  { display : 'block'}
};

class Edit extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			showModal: false,
			showAddQuestionBtn : false,
			initState : this.props.state
		}
		this.handleToggle = this.handleToggle.bind(this);
		this.onDateChange = this.onDateChange.bind(this);
		this.releaseConfirm = this.releaseConfirm.bind(this);
		this.checkData = this.checkData.bind(this);
	} 

	handleToggle() {
		this.setState(({ showAddQuestionBtn }) => ({
		  showAddQuestionBtn: !showAddQuestionBtn
		}))
	}
	onDateChange(questionnaireId,dateString) {
		//对本地存储的数据进行更新
		const deadline = moment(dateString).format('YYYY-MM-DD');
		this.props.setDeadline(questionnaireId,deadline);
	}
	checkData(questionnaire,questionsArr){
		//检测问题个数（1~10个）
		//检测deadline是否设置正确
		let isDataIllegal = false;
		const isDeadlineIllegal = checkDeadline(questionnaire.deadline);
		const quantity = questionsArr.length;
		if(isDeadlineIllegal){
			if(quantity === 0){
				Modal.error({
					title: '问卷至少要有一个问题'
				});
			}
			else if (quantity > 10){
				alert('问卷至多有10个问题');
			}
			else if (isDeadlineIllegal && quantity > 0 && quantity <= 10){
				isDataIllegal = true;
			}
			else {
				Modal.error({
					title: '数据检测出现错误，请反馈bug'
				});
				return false;
			}
		}
		return isDataIllegal;
	}
	releaseConfirm(questionnaireId,questionnaire,questionsArr) {
		const isDataIllegal = this.checkData(questionnaire,questionsArr);
		if(isDataIllegal){
			const {releaseQuestionnaire,history} = this.props;
			confirm({
				title: '确定要发布问卷吗',
			    okText: '发布',
			    cancelText: '取消',
				onOk() {
				 	releaseQuestionnaire(questionnaireId);
				 	history.push('/');
				},
				onCancel() {
				 	console.log('Cancel');
				},
	    	});
		}
		else {
			console.log('校验数据失败')
		}
	}
	onSaveQuestionnaire(questionnaire,questionsArr){
		const isDataIllegal = this.checkData(questionnaire,questionsArr);
		if(isDataIllegal){
			console.log('校验数据成功')
			this.props.saveQuestionnaire();
			this.props.history.push('/');
		}
		else {
			console.log('校验数据失败')
		}
	}
	render(){
		if(!this.props.location.state){
			return <Redirect to = "/"></Redirect>
		}	
		const {questionsData, questionnaires, location} = this.props;
		var 
			questionnaire,
			questionnaireId,
			questionIds = [],
			questionsArr = [];
		//获取home页传过来的参数
		const {editType} = location.state;

		//获取当前问卷的id
		if('edit' === editType){
			questionnaireId = location.state.questionnaireId;
		}
		else if('create' === editType){
			const questionnaireIdNum = questionnaires.currentId;
			questionnaireId = `Qnn${questionnaireIdNum}`;
		}
		else {
			throw new Error('editType参数错误')
		}
		//获取当前问卷的所有数据
		questionnaire = questionnaires.byId[questionnaireId];
		//获取当前问卷的问题数据（保存的是问题的id数组）
		questionIds = questionnaire.questions;
		//根据获取到的问题id到questions中寻找相应的问题数据
		questionsArr = questionIds.length > 0 ? 
		questionIds.map((item) => questionsData.byId[item]):
		[];
		const deadline = questionnaire.deadline?questionnaire.deadline:moment().format('YYYY-MM-DD'); 
		const dateFormat = 'YYYY-MM-DD';
		const { showAddQuestionBtn } = this.state;
		const questionsDetail = questionsArr.length > 0 ? 
			<div className = "questions-content">
					<QuestionList 
						questions = {questionsArr}
						questionnaireId = {questionnaireId}
						deleteQuestion = {this.props.deleteQuestion}
						moveQuestion = {this.props.moveQuestion}
						reuseQuestion = {this.props.reuseQuestion}
						addOption = {this.props.addOption}
						deleteOption = {this.props.deleteOption}
						moveOption = {this.props.moveOption}
						editQuestionTitle = {this.props.editQuestionTitle}
						editOption = {this.props.editOption}
						editRequired = {this.props.editRequired}
					/>
			</div> : null;
		return (
			<div id = "edit">
				<input  type = 'text' 
						className = "edit-title" 
						value = {questionnaire.title}
						onChange = {(event)=>{this.props.editQuestionnaireTitle(questionnaireId,event.target.value)}}
						/>
				{questionsDetail}
				<div className = "question-type">
					<Transition in={showAddQuestionBtn} timeout={duration}>
					    {(state) => (
					    <div
					    	className = 'add-question-content' 
					    	style={{
					        ...defaultStyle,
					        ...transitionStyles[state]
					      }}>
							<Button onClick = {()=>{this.props.addQuestion(questionnaireId,'radio')}}>单选题</Button>
							<Button onClick = {()=>{this.props.addQuestion(questionnaireId,'checkbox')}}>多选题</Button>
							<Button onClick = {()=>{this.props.addQuestion(questionnaireId,'textarea')}}>文本题</Button>
					    </div>
					    )}
					  </Transition>		
				</div>
				<div className = "add-question">
					<Button type = 'primary' onClick = {this.handleToggle}>+添加问题</Button>
				</div>
				<footer>
					<div className = "calendar">
						<label>请设置截止日期： </label>
					    <DatePicker
					    className = 'set-deadline'
					    defaultValue = {moment(`${deadline}`, dateFormat)}
					    format={dateFormat}
					    placeholder = '请选择问卷截止日期'
					    onChange={(dateString)=>{this.onDateChange(questionnaireId,dateString)}} />
					</div>
					<Button type = 'primary' size = "large" className = "publish"
							onClick = {()=>{this.releaseConfirm(questionnaireId,questionnaire,questionsArr)}}>发布问卷</Button>
					<Button type = 'primary' size = "large" className = "save"
							onClick = {()=>this.onSaveQuestionnaire(questionnaire,questionsArr)}>保存问卷</Button>
				</footer>
			</div>
		)
	}
}
const mapStateToProps = (state) => ({
	state,
	questionnaires : state.questionnaires,
	questionsData : state.questions,
	questionnaireId : state.currentId
});
const mapDispatchToProps = {
	createQuestionnaire :  questionnaireActions.createQuestionnaire,
	addQuestion : questionnaireActions.addQuestion,
	deleteQuestion : questionnaireActions.deleteQuestion,
	moveQuestion : questionnaireActions.moveQuestion,
	reuseQuestion : questionnaireActions.reuseQuestion,
	editQuestionnaireTitle : questionnaireActions.editQuestionnaireTitle,
	saveQuestionnaire : questionnaireActions.saveQuestionnaire,
	releaseQuestionnaire : questionnaireActions.releaseQuestionnaire,

	addOption : questionActions.addOption,
	deleteOption : questionActions.deleteOption,
	moveOption : questionActions.moveOption,
	editQuestionTitle : questionActions.editQuestionTitle,
	editOption : questionActions.editOption,
	editRequired : questionActions.editRequired,

	setDeadline : questionnaireActions.setDeadline
};
Edit = withRouter(connect(mapStateToProps,mapDispatchToProps)(Edit));
export default Edit;