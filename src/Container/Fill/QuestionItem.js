import React from 'react';
import OptionList from './OptionList';

const QuestionItem = (args) => {
	const { 
			question,
			editTextarea
		  } = args;
	const questionId = question.id;
	const requiredBody = question.isRequired ? 
	<span className = 'fill-is-required'>*</span> :
	null;
	const questionBody = (question.type === 'textarea') ? (
			<div className = 'fill-text-question'>
				<textarea rows = '5' cols = '100'
				  		value = {question.text}
				  		onChange = {(e)=>editTextarea(questionId,e.target.value)}/>
			</div>
		) :(
		<OptionList 
			type = {question.type}
			questionId = {questionId}
			options = {question.options}
		/>);
	return (
		<section className = "question-content">
			<h4>
				{requiredBody}
				{question.title}
			</h4>
			{questionBody}
		</section>
	);
}

export default QuestionItem;