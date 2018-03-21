import React from 'react';
import QuestionItem from './QuestionItem';

const QuestionList = (args) => {
	const { 
		questions, questionnaireId,
		editTextarea } = args;
	const questionItems = questions.map((question,index) => (
		<QuestionItem 
			question = {question}
			questionnaireId = {questionnaireId}
			index = {index}
			length = {questions.length}
			key = {index}

			editTextarea = {editTextarea}
		/>
	))
	return (
		<ul className = 'Question-list'>
			{questionItems}
		</ul>
	)
}

export default QuestionList;