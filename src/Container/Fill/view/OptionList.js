import React from 'react';
import { Radio, Checkbox } from 'antd';
const RadioGroup = Radio.Group;
const CheckboxGroup = Checkbox.Group;

class OptionList extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			value : 0
		}
		this.onChange = this.onChange.bind(this);
	}
	onChange(e){
		console.log('radio checked', e.target.value);
		this.setState({
		  value: e.target.value,
		});
	}
	render() {
		const { 
			options,type
		} = this.props;
		const optionItems = options.map((optionText,optionIndex) => (
			type === 'radio' ? <Radio key = {optionIndex} value = {optionIndex}>{optionText}</Radio> : <Checkbox key = {optionIndex}
			value = {optionText}>{optionText}</Checkbox>
		));
		const optionsContent = (type === 'radio') ? (
			<RadioGroup onChange={this.onChange} value={this.state.value}>{optionItems}</RadioGroup>) : (
			<CheckboxGroup>{optionItems}</CheckboxGroup>);
		return optionsContent;
	}
}
export default OptionList;