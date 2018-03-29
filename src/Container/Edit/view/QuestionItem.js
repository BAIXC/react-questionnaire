import React from 'react';
import OptionList from './OptionList';
import { Button, Checkbox } from 'antd';

const QuestionItem = (args) => {
	const { 
			question,questionnaireId,questionCurrentId,index,length,
			deleteQuestion,reuseQuestion,moveQuestion,
			addOption,deleteOption,moveOption,
			editQuestionTitle,editOption,editRequired
		  } = args;
	const questionId = question.id
	const questionBody = (question.type === 'textarea') ? 
		(<div className = 'text-question'>
			<textarea rows = '5' cols = '100'/>
			<div className = 'is-required'>
				<Checkbox
				onChange = {() => editRequired(questionId)} />
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
			{question.type === 'textarea'? null : <Button onClick = {() => {addOption(questionId)}}>+新增选项</Button>}
			<div className = "question-action">
				{ index !== 0 ? <Button onClick = {() => {moveQuestion(questionnaireId,questionId,'up')}}>上移问题</Button> : null }
				<Button onClick = {() => {deleteQuestion(questionnaireId,questionId)}}>删除问题</Button>
				<Button onClick = {() => {reuseQuestion(questionCurrentId,questionnaireId,questionId)}}>复用问题</Button>
				{ index !== (length-1) ? <Button onClick = {() => {moveQuestion(questionnaireId,questionId,'down')}}>下移问题</Button> : null }
			</div>
		</section>
	);
}

export default QuestionItem;