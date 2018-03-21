import React from 'react';

const OptionList = (args) => {
	const { 
			options,type,questionId,
			deleteOption,moveOption,
			editOption
		} = args;
	const optionItems = options.map((optionText,optionIndex) => (
		<li key = {optionIndex} className = "option-item">
			<input type = {type} />
			<input 
				type = 'text'
				value = {optionText}
				onChange = {(event) => {editOption(questionId, optionIndex , event.target.value)}}
			/>
			<button 
				onClick = {() => {deleteOption(questionId,optionIndex)}}> 删除选项 </button>
			{optionIndex !==0 ?<button 
				onClick = {() => {moveOption(questionId,optionIndex,'up')}}> 上移选项 </button>:null}
			{optionIndex !== options.length-1 ?<button 
				onClick = {() => {moveOption(questionId,optionIndex,'down')}}> 下移选项 </button>:null}
		</li>
	))
	return (
		<ul className = 'option-list'>
			{optionItems}
		</ul>
	)
}

export default OptionList;