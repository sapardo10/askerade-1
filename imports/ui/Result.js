import React, { Component } from "react";

export default class Result extends Component {
	constructor(props) {
		super(props); 
		this.state = {
			survey: null,
		};
	}
	render() {
		console.log(this.state.survey);
		return (
			<div>Result of {this.props.id}</div>
		);
	}
	componentDidMount()
	{
		this.updateSurvey();
	}

	modifyState(name,value)
	{
		this.setState(() => ({
			[name]: value
		}));
	}

	updateSurvey()
	{
		this.id = this.props.id || this.props.match.params.number;
		Meteor.call("surveys.get", this.id,(err,res)=>{
			if(err)
				throw err;
			this.modifyState("survey",res);


		});
	}
}
