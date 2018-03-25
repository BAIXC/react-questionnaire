import React from 'react';
import { Button, Radio, Checkbox } from 'antd';

const OptionList = (args) => {
	const { 
			options,type,questionId,
			deleteOption,moveOption,
			editOption
		} = args;
	const select = type === 'radio'? <Radio></Radio> : <Checkbox></Checkbox>;
	const optionItems = options.map((optionText,optionIndex) => (
		<li key = {optionIndex} className = "option-item">
			{select}
			<input 
				type = 'text'
				value = {optionText}
				className = 'option-text'
				onChange = {(event) => {editOption(questionId, optionIndex , event.target.value)}}
			/>
			<Button size = "small" 
				onClick = {() => {deleteOption(questionId,optionIndex)}}> 删除选项 </Button>
			{optionIndex !==0 ?
				<Button size = "small" 
					onClick = {() => {moveOption(questionId,optionIndex,'up')}}> 上移选项 
				</Button>:null}
			{optionIndex !== options.length-1 ?
				<Button size = "small" 
					onClick = {() => {moveOption(questionId,optionIndex,'down')}}> 下移选项 
				</Button>:null}
		</li>
	))
	return (
		<ul className = 'option-list'>
			{optionItems}
		</ul>
	)
}

export default OptionList;