import React, { Component } from "react";
import RealAnswer from "./RealAnswer.js";
export default class AnswerList extends Component {
	constructor(props){
		super(props);
	}
	renderList() {
		return this.props.realAnswers.map((value,i) => {

			return (
				<RealAnswer
					key={i}
					value={value}
				/>
			);
		});
	}
	render() {
		return (
			<div className = "container">
				<h1>{this.props.question.title}</h1>
				{this.renderList()}
			</div>
		);
	}
}
