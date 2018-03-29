import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { actions } from '../../reducer/questionnaires';
import Home from './view/Home'
const mapStateToProps = (state,{location,history}) => {
	const {questionnaires} = state;
	const { byId, allIds } = questionnaires
	const qnnCurrentId = questionnaires.currentId;
	const dataSource = allIds.map((item) => byId[item]);
	return({
		allIds,
		qnnCurrentId,
		dataSource,
		location,
		history
	});
}
const mapDispatchToProps = {
	deleteQuestionnaire : actions.deleteQuestionnaire,
	batchDelete : actions.batch_deleteQuestionnaire,
	createQuestionnaire : actions.createQuestionnaire,
	updateStatus : actions.updateStatus
}
const VisibleHome = withRouter(connect( mapStateToProps, mapDispatchToProps )(Home));
export default VisibleHome;