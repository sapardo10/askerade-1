import React, { Component } from "react";
import ReactDOM from "react-dom";
import renderHTML from 'react-render-html';
import { Meteor } from "meteor/meteor";
import { Tweets } from "../api/tweetsanswer.js";
import { TweetsList } from "./TweetsList.js";
import {PropTypes} from "prop-types";

import { withTracker } from 'meteor/react-meteor-data';

class Question extends Component 
{

	constructor(props){
		super(props);

		this.state={

			tweets:[],

		};
	}

	handleSubmit(event){

		event.preventDefault();

        const codigo = ReactDOM.findDOMNode(this.refs.tweet).value.trim();

		Meteor.call('twitter.stream',codigo,this.props.question._id);

	}

	render()
	{
		return (
			<div className="card mx-auto question-cont" style={{"backgroundColor": this.props.question.color}}  >
				<div className="card-body" >
					<div className="card-title" >{renderHTML(this.props.question.title)} </div>
					<div className="container" >
						{this.renderOptions()}
					</div>
					

				</div>
			</div>
		);  
	}
	renderOption(option,label)
	{
		return(
			<div className="container" >
				<button
					data-toggle="list" 
					className="list-group-item list-group-item-action btn-opcion"
					onClick={this.props.registerAnswer} 
					type="button" 
					value={label}>
						{option}
					</button>
			</div>
		);
	}
	renderOptions()
	{
		if(this.props.question.multiple && !this.props.answer)
		{
			return(
				<div>
					<div className="row" >
						<div className="col-md-6 list-group-item list-group-item-action" >{this.props.question.op1}</div>
						<div className="col-md-6 list-group-item list-group-item-action" >{this.props.question.op2}</div>
					</div>
					<div className="row" >
						<div className="col-md-6 list-group-item list-group-item-action" >{this.props.question.op3}</div>
						<div className="col-md-6 list-group-item list-group-item-action" >{this.props.question.op4}</div>
					</div>
					<br/>
					<div className="row" >
					<div className="col-md-4"> </div>
						<div className="col-md-2 " >
							<button
								value={this.props.index}
								onClick={this.props.removeQuestion} 
								className="btn btn-danger">
								Remove</button></div>
						<div className="col-md-2" >
							<button
								value={this.props.index}
								onClick={this.props.editQuestion} 
								className="btn btn-primary">
								 Edit </button></div>
					</div>

				</div>
			);
		}
		else if(this.props.question.multiple && this.props.answer)
		{
			return(
				<div style={{"backgroundColor": this.props.question.color}}>
					<div className="row" >
						
						{this.renderOption(this.props.question.op1,"op1")}
						{this.renderOption(this.props.question.op2,"op2")}						
					</div>
					<div className="row" >
						{this.renderOption(this.props.question.op3,"op3")}
						{this.renderOption(this.props.question.op4,"op4")}
					</div>
				</div>
			);
		}
		else if(!this.props.question.multiple && !this.props.answer) 
		{
			return (<div>
						<form 
							onSubmit={this.handleSubmit.bind(this)}
							className="form-group">
							<div className="form-row">
								<label>Ingresa el termino de busqueda</label>
								<input
									className="form-control"
									ref="tweet"
									type="text"
									placeholder="Ingresa el hashtag a buscar"
									/>
							</div>
								<input 
									className="btn btn-submit"
									type="submit"							
								/>


						<div className="row" >
						<div className="col-md-4"> </div>
							<div className="col-md-2 " >
								<button
									value={this.props.index}
									onClick={this.props.removeQuestion} 
									className="btn btn-danger">
									Remove</button></div>
							<div className="col-md-2" >
								<button
									value={this.props.index}
									onClick={this.props.editQuestion} 
									className="btn btn-primary">
									 Edit </button></div>
						</div>

								
					</form>

					<TweetsList
						tweets={this.props.tweets}
					/>
				</div>);
		}
		else if(this.props.answer)
		{
			return(
				<div>
					
					<form 
						onSubmit={this.props.handleSubmit}
					>
						<textarea 
							placeholder="Answer here"
							type="text"
							ref="answer"
							rows="4" 
							cols="50" 
							name="comment" 
							form="usrform">

						</textarea>         

						<input
							className="btn btn-submit"
							type="submit"
							value="send"
						/>

					</form> 
				</div>
			);
		}
	}	
}
export default withTracker(() => {
  Meteor.subscribe('tweets');
  return {
    tweets: Tweets.find({}, {sort: {date: -1}, limit: 4}).fetch(),
};
})(Question);
