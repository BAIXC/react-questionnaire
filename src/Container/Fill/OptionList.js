import React from 'react';

const OptionList = (args) => {
	const { 
			options,type,questionId
		} = args;
	const optionItems = options.map((optionText,optionIndex) => (
		<li key = {optionIndex} className = "option-item">
			<input type = {type} name = {questionId}/>
			<label> 
				{optionText}
			</label>
		</li>
	))
	return (
		<ul className = 'option-list'>
			{optionItems}
		</ul>
	)
}

export default OptionList;