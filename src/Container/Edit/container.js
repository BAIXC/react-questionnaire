import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { actions as questionnaireActions } from '../../reducer/questionnaires';
import { actions as questionActions } from '../../reducer/questions';
import Edit from './view/Edit';
import moment from 'moment';

const mapStateToProps = (state,{location,history}) => {
		//如果直接在编辑页面刷新了，就直接返回一个空对象
		//之后再edit.js里面进行跳转
		if(!location.state){
			return {};
		}
		const {questions, questionnaires} = state;
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
		questionIds.map((item) => questions.byId[item]):
		[];
		const questionCurrentId = questions.currentId;
		const deadline = questionnaire.deadline?questionnaire.deadline:moment().format('YYYY-MM-DD'); 
		return ({
			questionnaireId,
			questionnaire,
			questionsArr,
			deadline,
			questionCurrentId,
			location,history
		});
};
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
const VisibleEdit = withRouter(connect(mapStateToProps,mapDispatchToProps)(Edit));
export default VisibleEdit;