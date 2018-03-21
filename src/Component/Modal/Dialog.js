import React from 'react';
import { createPortal } from 'react-dom';
import './dialog.css'

class Dialog extends React.Component {
	constructor(){
		super(...arguments);
		const doc = window.document;
		this.node = doc.createElement('div');
		doc.body.appendChild(this.node);
	}
	render(){
		return createPortal(
			<div className = "mask">
				<div className = "dialog">
				    <h2>{this.props.title}</h2>
				    <p>dialog content</p>
				    <button onClick = {this.props.onConfirm}>确定</button>
				    <button onClick = {this.props.onCancle}>取消</button>
				</div>
			</div>,
			this.node
		);
	}
	componentWillUnmount() {
		window.document.body.removeChild(this.node);
	}
}
 export default Dialog;