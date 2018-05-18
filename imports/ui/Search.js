import React, { Component } from "react";
import queryString from "query-string";
import ReactDOM from "react-dom";
import { Session } from "meteor/session";
import { DDPRateLimiter } from "meteor/ddp-rate-limiter";
import { Redirect } from "react-router-dom";
import { Surveys } from "../api/surveys.js";
import MyStatefulEditor from "./MyStatefulEditor.js";
import Surveyview from "./Surveyview.js";
import Survey from "./Survey.js";
import Result from "./Result.js";

import ColorSelect from "./ColorSelect.js";

class Search extends Component 
{	
	constructor(props) {
		super(props); 
		this.state = {
			redirect: false,
			colorSurvey: "#FFFFFF",
		};
	}

	modifyState(name,value)
	{
		this.setState(() => ({
			[name]: value
		}));
	}

	details(event)
	{
		event.preventDefault();
		let index = event.target.attributes.getNamedItem("data-index").value;
		this.modifyState("id", event.target.value);
		this.modifyState("index", index);
		this.modifyState("detail", true);
	}

	results(event)
	{
		event.preventDefault();
		this.modifyState("id", event.target.value);
		this.modifyState("result", true);
		this.modifyState("detail", false);
		let index = event.target.attributes.getNamedItem("data-index").value;
		this.modifyState("index", index);

	}

	renderSurveys() {
		return this.props.surveys.map((surveyview,i) => (
			<Surveyview key={surveyview._id} survey={surveyview} details={this.details.bind(this)} index={i} />
		));
	}

	handleSubmit(event){
		event.preventDefault();
		const title = ReactDOM.findDOMNode(this.refs.title).value.trim();
		Meteor.call("surveys.create", title, this.state.surveyColor,(err,res)=>{
			if(err)
				throw err;
			
			ReactDOM.findDOMNode(this.refs.title).value = "";
			this.setState({ url:"/survey/"+res,redirect: true });
		});

		
	}

	onChange(value) {
		ReactDOM.findDOMNode(this.refs.title).value = value;
	}

	onChangeColor(color) {
		this.setState({
			surveyColor: color.hex
		});
	}

	render() {
		if (this.state.redirect) {
			return <Redirect to={this.state.url}/>;
		}
		if (this.state.detail) {
			return <Survey
				id={this.state.id} 
				results={this.results.bind(this)} 
				index={this.state.index}/>;
		}
		if (this.state.result) {
			return <Result 
				survey={this.props.surveys[this.state.index]} 
				id={this.state.id}/>;
		}
		return (
			<div className="container">
				<h1>Surveys done by you Yeahhh</h1>
				<ul>
					{this.renderSurveys()}
				</ul>
				{this.props.user ? (
					<div>
						<h2>Add a Survey!</h2>
						<form className="new-question" onSubmit={this.handleSubmit.bind(this)}>
							<div className="form-group">
								<input
									className="form-control"
									type="text"
									ref="title"
									placeholder="Type the title of the Survey"
									required
									hidden
								/>

								<MyStatefulEditor onChange={this.onChange.bind(this)}/>            
							</div>
							
							<ColorSelect 
								color={this.state.colorSurvey} 
								onChangeComplete={this.onChangeColor.bind(this)} 
							/>

							<input
								className="btn btn-submit"
								type="submit"
								placeholder="Add question"
							/>
						</form></div>) : ""
				}

			</div>
		);
	}

}

export default Search;
