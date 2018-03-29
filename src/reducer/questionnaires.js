import { setData, setStorage } from '../Store/storage';
import { combineReducers } from 'redux';

/**
问卷的state默认格式
	questionnaire : {
		byId : {
			"Qnn1" : {
				id : "Qnn1",
				title : "",
				deadline : "",
				status : "",
				questions : ["qn1","qn2","qn3","qn4"]
			},
			"Qnn2" : {
				id : "Qnn2",
				title : "",
				deadline : "",
				status : "",
				questions : ["qn5","qn6","qn7","qn8"]
			},
			allIds : ["Qnn1","Qnn2"]
		}
	}
*/

//深拷贝
const cloneObject = (obj) => {
	return JSON.parse(JSON.stringify(obj));
}
// actionType
export const types = {
	CREATE_QUESTIONNAIRE : 'CREATE_QUESTIONNAIRE',
	DELETE_QUESTIONNAIRE : 'DELETE_QUESTIONNAIRE',
	BATCH_DELETE_QUESTIONNAIRE : 'BATCH_DELETE_QUESTIONNAIRE', //批量删除
	RELEASE_QUESTIONNAIRE : 'RELEASE_QUESTIONNAIRE', 
	UPDATE_STATUS : 'UPDATE_STATUS',
	SAVE_QUESTIONNAIRE : 'SAVE_QUESTIONNAIRE',

	ADD_QUESTION : 'ADD_QUESTION',
	DELETE_QUESTION : 'DELETE_QUESTION',
	REUSE_QUESTION : 'REUSE_QUESTION',
	MOVE_QUESTION : 'MOVE_QUESTION',

	EDIT_QUESTIONNAIRE_TITLE : 'EDIT_QUESTIONNAIRE_TITLE',

	SET_DEADLINE : 'SET_DEADLINE'
};

// action creators
export const actions = {
	deleteQuestionnaire : (delete_id) => ({
		type : types.DELETE_QUESTIONNAIRE,
		payload : { delete_id }
	}),
	batch_deleteQuestionnaire : (deleteArr) => ({
		type : types.BATCH_DELETE_QUESTIONNAIRE,
		payload : { deleteArr }
	}),
	createQuestionnaire : (qnnCurrentId) => {
		const new_id = ++qnnCurrentId;
		const uniqueId = `Qnn${new_id}`;
		return ({
			type : types.CREATE_QUESTIONNAIRE,
			payload : {
				currentId : new_id,
				uniqueId
			}
		});
	},

	addQuestion : (questionCurrentId,questionnaireId,questionType) => {
		let question_currentIdNum = questionCurrentId;
		const new_idNum = ++question_currentIdNum;
		const uniqueId = `qn${new_idNum}`;
		return ({
			type : types.ADD_QUESTION,
			payload : {
				question_addId : uniqueId,
				questionnaireId,
				questionType
			}
		});
	},
	deleteQuestion : (questionnaireId,deleteId) => ({
		type : types.DELETE_QUESTION,
		payload : {
			questionnaireId,
			deleteId
		}
	}),

	reuseQuestion : (questionCurrentId,questionnaireId,questionId) => {
		let question_currentIdNum = questionCurrentId;
		const new_idNum = ++question_currentIdNum;
		const uniqueId = `qn${new_idNum}`;
		return ({
			type : types.REUSE_QUESTION,
			payload : {
				reuseId : uniqueId,
				questionnaireId,
				questionId
			}
		});
	},
	moveQuestion : (questionnaireId,questionId,direction) => ({
		type : types.MOVE_QUESTION,
		payload : {
			questionnaireId,
			questionId,
			direction
		}
	}),
	editQuestionnaireTitle : (questionnaireId,text) => ({
		type : types.EDIT_QUESTIONNAIRE_TITLE,
		payload : {
			questionnaireId,
			text
		}
	}),
	setDeadline : (questionnaireId,date) => ({
		type : types.SET_DEADLINE,
		payload : {questionnaireId,date}
	}),
	releaseQuestionnaire : (questionnaireId) =>({
		type : types.RELEASE_QUESTIONNAIRE,
		payload : {questionnaireId}
	}),
	updateStatus : (questionnaireId,status) => ({
		type : types.UPDATE_STATUS,
		payload : { questionnaireId, status }
	}),
	saveQuestionnaire : () => ({
		type : types.SAVE_QUESTIONNAIRE
	})
};

//reducer

//将问卷数据更新到本地存储中
const updateStorage = (key,value) => {
	const appData = setData();
	appData.questionnaires[key] = value;
	setStorage('appData', appData);
}

export const byId = ( state = {}, action ) => {
	switch(action.type){
		//保存问卷
		case types.SAVE_QUESTIONNAIRE:
			const saveQuestionnaire = () => {
				updateStorage('byId',state);
				return state;
			}
			return saveQuestionnaire();
		//发布问卷
		case types.RELEASE_QUESTIONNAIRE:
			const releaseQuestionnaire = () => {
				const {questionnaireId} = action.payload;
				let new_state = cloneObject(state);
				new_state[questionnaireId].status = 'publishing';
				updateStorage('byId',new_state);
				return new_state;
			}
			return releaseQuestionnaire();
		//改变问卷的状态
		case types.UPDATE_STATUS : 
			const updateStatus = () => {
				console.log(action.payload);
				const { questionnaireId, status } = action.payload;
				let new_state = cloneObject(state);
				let questionnaire = new_state[questionnaireId];
				questionnaire.status = status;
				return new_state;
			}
			return updateStatus();
		//删除单个问卷
		case types.DELETE_QUESTIONNAIRE:
			const deleteQuestionnaire = () => {
				const new_state = {...state};
				delete new_state[action.payload.delete_id];
				updateStorage('byId',new_state);
				return new_state;
			}
			return deleteQuestionnaire();

		//批量删除问卷
		case types.BATCH_DELETE_QUESTIONNAIRE:
			const batch_deleteQuestionnaire = () => {
				const {deleteArr} = action.payload;
				const new_state = {...state};
				deleteArr.for((item) => {
					delete new_state[item];
				});
				updateStorage('byId',new_state);
				return new_state;
			}
			return batch_deleteQuestionnaire();

		//新建问卷
		case types.CREATE_QUESTIONNAIRE:
			const createQuestionnaire = () => {
				const {uniqueId} = action.payload
				const defaultState = {
					id: uniqueId,
				    title: '这是问卷标题',
				    status: 'unpublished',
				    deadline: '',
				    questions: [],
				    charts: []
				};
				const new_state = {...state};
				new_state[uniqueId] = defaultState;
				return new_state;
			}
			return createQuestionnaire();

		//编辑页面/添加问题
		case types.ADD_QUESTION : 
			const addQuestion = () => {
				const {questionnaireId,question_addId} = action.payload;
				console.log(questionnaireId);
				let new_state = cloneObject(state);
				const questionnaire = new_state[questionnaireId];
				questionnaire.questions.push(question_addId);
				return new_state;
			};
			return addQuestion();

		//编辑页面/删除问题
		case types.DELETE_QUESTION : 
			const deleteQuestion = () => {
				const {questionnaireId,deleteId} = action.payload;
				let new_state = cloneObject(state);
				let questionnaire = new_state[questionnaireId];
				let questions = questionnaire.questions;
				console.log({questions,deleteId});
				questions.splice(questions.indexOf(deleteId),1);
				return new_state;
			};
			return deleteQuestion();

		//编辑页面/复用问题
		case types.REUSE_QUESTION : 
			const reuseQuestion = () => {
				const {questionnaireId,questionId,reuseId} = action.payload;
				let new_state = cloneObject(state);
				const questionnaire = new_state[questionnaireId];
				let questions = questionnaire.questions;
				let questionIndex = questions.indexOf(questionId);
				questions.splice(questionIndex+1,0,reuseId);
				return new_state;
			};
			return reuseQuestion();

		//编辑页面/移动问题
		case types.MOVE_QUESTION : 
			const moveQuestion = () => {
				const {questionnaireId,questionId,direction} = action.payload;
				let new_state = cloneObject(state);
				const questionnaire = new_state[questionnaireId];
				let questions = questionnaire.questions;
				let questionIndex = questions.indexOf(questionId);
				console.log(questionId);
				let moveNum = null;
				switch(direction){
					case 'up':
						moveNum = -1;
					break;
					case 'down':
						moveNum = 1;
					break;
					default :
						moveNum = 0;
				}
				questions[questionIndex] = questions.splice(questionIndex + moveNum,1,questions[questionIndex])[0];
				return new_state;
			};
			return moveQuestion();

		//修改标题
		case types.EDIT_QUESTIONNAIRE_TITLE:
			const editQuestionnaireTitle = () => {
				const {questionnaireId,text} = action.payload;
				let new_state = cloneObject(state);
				let questionnaire = new_state[questionnaireId];
				questionnaire.title = text;
				return new_state;
			};
			return editQuestionnaireTitle();

		//编辑页面/设置截止日期
		case types.SET_DEADLINE:
			const setDeadline = () => {
				const {questionnaireId,date} = action.payload;
				let new_state = cloneObject(state);
				console.log(questionnaireId)
				let questionnaire = new_state[questionnaireId];
				questionnaire.deadline = date;
				return new_state
			}
			return setDeadline();
		default :
			return state;
	}
}

export const allIds = ( state = [], action ) => {

	switch(action.type){
		case types.DELETE_QUESTIONNAIRE:
			const deleteQuestionnaire = () => {
				const allIds = state.filter((item) => item !== action.payload.delete_id);
				updateStorage('allIds',allIds);
				return allIds;
			}
			return deleteQuestionnaire();

		case types.BATCH_DELETE_QUESTIONNAIRE:
			const batch_deleteQuestionnaire = () => {
				const {deleteArr} = action.payload;
				const allIds = state.filter((item) => deleteArr.indexOf(item) === -1);
				updateStorage('allIds',allIds);
				return allIds;
			}
			return batch_deleteQuestionnaire();
		case types.CREATE_QUESTIONNAIRE:
			const createQuestionnaire = () => {
				const uniqueId = action.payload.uniqueId
				const new_state = [...state,uniqueId];
				return new_state;
			}
			return createQuestionnaire();

		//保存问卷
		case types.SAVE_QUESTIONNAIRE:
			const saveQuestionnaire = () => {
				updateStorage('allIds',state);
				return state;
			}
			return saveQuestionnaire();
		//发布问卷
		case types.RELEASE_QUESTIONNAIRE:
			const releaseQuestionnaire = () => {
				const {questionnaireId} = action.payload;
				let new_state = cloneObject(state);
				new_state[questionnaireId].status = 'publishing';
				updateStorage('allIds',new_state);
				return new_state;
			}
			return releaseQuestionnaire();
		default : 
			return state;
	}
}

export const currentId = ( state = 0, action ) => {
	switch(action.type){
		case types.CREATE_QUESTIONNAIRE:
			const {currentId} = action.payload;
			return currentId;
		default : 
			return state;
	}
}

const reducer = combineReducers({
	currentId,
	byId,
	allIds
});

export default reducer;