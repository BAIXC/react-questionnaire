import questionnaires from './questionnaires';
import questions from './questions';
import { combineReducers } from 'redux';

const reducer = combineReducers({
	questionnaires,
	questions
})

export default reducer;