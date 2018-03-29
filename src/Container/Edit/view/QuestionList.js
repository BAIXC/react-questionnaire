import React from 'react';
import QuestionItem from './QuestionItem';

const QuestionList = (args) => {
	const { questions, questionnaireId,questionCurrentId,
		deleteQuestion,reuseQuestion,moveQuestion,
		addOption, deleteOption,moveOption,
		editQuestionTitle,editOption,editRequired } = args;
	const questionItems = questions.map((question,index) => (
		<QuestionItem 
			question = {question}
			questionnaireId = {questionnaireId}
			index = {index}
			length = {questions.length}
			key = {index}
			questionCurrentId = {questionCurrentId}

			deleteQuestion = {deleteQuestion}
			reuseQuestion = {reuseQuestion}
			moveQuestion = {moveQuestion}
			addOption = {addOption}
			deleteOption = {deleteOption}
			moveOption = {moveOption}
			editQuestionTitle = {editQuestionTitle}
			editOption = {editOption}
			editRequired = {editRequired}
		/>
	))
	return (
		<ul className = 'Question-list'>
			{questionItems}
		</ul>
	)
}

export default QuestionList;