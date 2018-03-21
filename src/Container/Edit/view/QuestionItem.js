import React from 'react';
import OptionList from './OptionList';

const QuestionItem = (args) => {
	const { 
			question,questionnaireId,index,length,
			deleteQuestion,reuseQuestion,moveQuestion,
			addOption,deleteOption,moveOption,
			editQuestionTitle,editOption,editRequired
		  } = args;
	const questionId = question.id
	const questionBody = (question.type === 'textarea') ? 
		(<div className = 'text-question'>
			<textarea rows = '5' cols = '100'/>
			<div className = 'is-required'>
				<input 
				type = "checkbox"
				onClick = {() => editRequired(questionId)} />
				<label>是否必填</label>
			</div>
		</div>):(
		<OptionList 
			type = {question.type}
			questionId = {questionId}
			options = {question.options}

			deleteOption = {deleteOption}
			editOption = {editOption}
			moveOption = {moveOption}
		/>);
	return (
		<section className = "question-content">
			<h4>
				<input
					type = 'text'
					value = {question.title}
					className = "question-title"
					onChange = {(event) => {editQuestionTitle(questionId,event.target.value)}}
				/>
			</h4>
			{questionBody}
			<ul className = "question-action">
				{ index !== 0 ? <li onClick = {() => {moveQuestion(questionnaireId,questionId,'up')}}>上移</li> : null }
				<li onClick = {() => {deleteQuestion(questionnaireId,questionId)}}>删除</li>
				<li onClick = {() => {reuseQuestion(questionnaireId,questionId)}}>复用</li>
				{ index !== (length-1) ? <li onClick = {() => {moveQuestion(questionnaireId,questionId,'down')}}>下移</li> : null }
			</ul>
			<button onClick = {() => {addOption(questionId)}}>+新增选项</button>
		</section>
	);
}

export default QuestionItem;