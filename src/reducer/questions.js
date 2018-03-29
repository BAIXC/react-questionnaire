import { types as questionnaireTypes } from './questionnaires';
import { combineReducers } from 'redux'
import { setData, setStorage } from '../Store/storage';

/**questions的state默认格式
	questions : {
		current : 2,
		byId : {
			"qn1" : {
				id : "qn1",
				title : "",
				options : ["",……]
			},
			"qn2" : {
				id : "qn2",
				title : "",
				options : ["",……]
			},
			allIds : ["qn1","qn2"]
		}
	}
*/

// actionTypes
const types = {
	ADD_OPTION : 'ADD_OPTION',
	DELETE_OPTION : 'DELETE_OPTION',
	MOVE_OPTION : 'MOVE_OPTION',

	EDIT_QUESTION_TITLE : 'EDIT_QUESTION_TITLE',
	EDIT_OPTION : 'EDIT_OPTION',
	EDIT_TEXTAREA : 'EDIT_TEXTAREA',
	EDIT_REQUIRED : 'EDIT_REQUIRED'
};

//action creators
export const actions = {
	addOption : (questionId) => ({
		type : types.ADD_OPTION,
		payload : { questionId }
	}),
	deleteOption : (questionId,optionIndex) => ({
		type : types.DELETE_OPTION,
		payload : { questionId,optionIndex }
	}),
	moveOption : (questionId,optionIndex,direction) => ({
		type : types.MOVE_OPTION,
		payload : { questionId,optionIndex,direction }
	}),
	editQuestionTitle : (questionId,text) => ({
		type : types.EDIT_QUESTION_TITLE,
		payload : { questionId,text }
	}),
	editOption : (questionId,optionIndex,text) => ({
		type : types.EDIT_OPTION,
		payload : { questionId,optionIndex,text }
	}),
	editRequired : (questionId,optionIndex) => ({
		type : types.EDIT_REQUIRED,
		payload : { questionId }
	}),
	editTextarea : (questionId,text) =>({
		type : types.EDIT_TEXTAREA,
		payload : {questionId,text}
	})
};

//reducer 
//深拷贝

const cloneObject = (obj) => {
	return JSON.parse(JSON.stringify(obj));
}

//将问卷数据更新到本地存储中
const updateStorage = (key,value) => {
	const appData = setData();
	appData.questions[key] = value;
	setStorage('appData', appData);
}

const byId = (state = {}, action) => {
	switch(action.type){
		//保存问卷
		case questionnaireTypes.SAVE_QUESTIONNAIRE:
			const saveQuestionnaire = () => {
				updateStorage('byId',state);
				return state;
			}
			return saveQuestionnaire();
		//发布问卷
		case questionnaireTypes.RELEASE_QUESTIONNAIRE:
			const releaseQuestionnaire = () => {
				updateStorage('byId',state);
				return state;
			}
			return releaseQuestionnaire();

		//新增问题
		case questionnaireTypes.ADD_QUESTION :
			const addQuestion = () => {
				const {question_addId,questionType} = action.payload;
				let defaultQuestion = {};
				switch(questionType){
					case 'radio':
						defaultQuestion = {
							title : '这是单选题',
							type : 'radio',
							options : ['选项一','选项二']
						}
					break;
					case 'checkbox':
						defaultQuestion = {
							title : '这是多选题',
							type : 'checkbox',
							options : ['选项一','选项二']
						}
					break;
					case 'textarea':
						defaultQuestion = {
							title : '这是文本题',
							type : 'textarea',
							text : '',
							isRequired : false
						}
				break;
				default : 
					throw new Error("questionType 出错");
				}	
				defaultQuestion.id = question_addId;
				const new_state = {...state};
				new_state[question_addId] = defaultQuestion;
				return new_state;
			};
			return addQuestion();

		//复用问题
		case questionnaireTypes.REUSE_QUESTION : 
			const reuseQuestion = () => {
				const {questionId,reuseId} = action.payload;
				let questions = cloneObject(state);
				questions[reuseId] = cloneObject(questions[questionId]);
				questions[reuseId].id = reuseId; 
				return questions;
			};
			return reuseQuestion();

		//新增选项
		case types.ADD_OPTION : 
			const addOption = () => {
				const {questionId} = action.payload;
				let questions = cloneObject(state);
				let question = questions[questionId];
				question.options.push('新增选项');
				return questions;
			};
			return addOption();

		//删除选项
		case types.DELETE_OPTION : 
			const deleteOption = () => {
				const {questionId,optionIndex} = action.payload;
				let questions = cloneObject(state);
				let question = questions[questionId];
				question.options.splice(optionIndex,1);
				return questions;
			};
			return deleteOption();
		//移动选项
		case types.MOVE_OPTION : 
			const moveOption = () => {
				const {questionId,optionIndex,direction} = action.payload;
				let questions = cloneObject(state);
				let question = questions[questionId];
				let options = question.options
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
				options[optionIndex] = options.splice(optionIndex + moveNum,1,options[optionIndex])[0];
				return questions;
			};
			return moveOption();
		//编辑问题的题目
		case types.EDIT_QUESTION_TITLE:
			const editQuestionTitle = () => {
				const {questionId,text} = action.payload;
				console.log({questionId,text})
				let questions = cloneObject(state);
				let question = questions[questionId];
				question.title = text;
				return questions;
			}
			return editQuestionTitle();

		//编辑问题的选项
		case types.EDIT_OPTION:
			const editOption = () => {
				const {questionId,optionIndex,text} = action.payload;
				let questions = cloneObject(state);
				let question = questions[questionId];
				question.options[optionIndex] = text;
				return questions;
			}
			return editOption();

		//编辑文本题
		case types.EDIT_TEXTAREA:
			const editTextarea = () => {
				const {questionId,text} = action.payload;
				let questions = cloneObject(state);
				let question = questions[questionId];
				question.text = text;
				return questions;
			}
			return editTextarea();

		//编辑问题的是否必填的属性
		case types.EDIT_REQUIRED:
			const editRequired = () => {
				const {questionId} = action.payload;
				let questions = cloneObject(state);
				let question = questions[questionId];
				console.log(question.isRequired)
				console.log('question.isRequired')
				console.log(!question.isRequired)
				console.log('!question.isRequired')
				question.isRequired = !question.isRequired;
				return questions;
			}
			return editRequired();

		default :  
			return state;
	}
}
const currentId = (state = {}, action) => {
	switch(action.type){
		//新增问题
		case questionnaireTypes.ADD_QUESTION :
			state += 1;
			updateStorage('currentId',state);
			return state;

		//复用问题
		case questionnaireTypes.REUSE_QUESTION : 
			state += 1;
			updateStorage('currentId',state);
			return state;

		default :  
			return state;
	}
}

const reducer = combineReducers({
	byId,
	currentId
});

export default reducer;

