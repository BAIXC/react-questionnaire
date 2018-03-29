import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions as questionActions } from '../../reducer/questions';
import Fill from './view/Fill'

const mapStateToProps = (state,{location,history}) => {
	//如果直接在填写问卷页面刷新了，那就返回HOME页
	if(!location.state){
		return {};
	}
	console.log('跳转之后还执行吗？')
	const {questions, questionnaires} = state;
	//获取home页传过来的参数(问卷Id)
	const {questionnaireId} = location.state;
	//获取当前问卷的所有数据
	const questionnaire = questionnaires.byId[questionnaireId];
	//获取当前问卷的问题数据（保存的是问题的id数组）
	const questionIds = questionnaire.questions;
	//根据获取到的问题id到questions中寻找相应的问题数据
	const questionsArr = questionIds.map((item) => questions.byId[item]);
	return({
		questionnaire,
		questionnaireId,
		questionsArr,
		location,history
	})
};
const mapDispatchToProps = {
	editTextarea : questionActions.editTextarea
}
const VisibleFill = withRouter(connect(mapStateToProps,mapDispatchToProps)(Fill));
export default VisibleFill;