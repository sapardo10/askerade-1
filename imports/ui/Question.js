import React, { Component } from "react";
import renderHTML from 'react-render-html';

class Question extends Component 
{
	render()
	{
		return (
			<div className="card mx-auto"  >
				<div className="card-body" >
					<div className="card-title" >{renderHTML(this.props.question.title)} </div>
					<div className="container">
						{this.renderOptions()}
						
					</div>
				</div>
			</div>
		);  
	}
	renderOption(option)
	{
		return(
			<div className="col-md-6 border" >
				<button onClick={this.props.registerAnswer} type="button" value={option}>{option}</button>
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
						<div className="col-md-6 border" >{this.props.question.op1}</div>
						<div className="col-md-6 border" >{this.props.question.op2}</div>
					</div>
					<div className="row" >
						<div className="col-md-6 border" >{this.props.question.op3}</div>
						<div className="col-md-6 border" >{this.props.question.op4}</div>
					</div>
					<div className="row" >
						<div className="col-md-6 border" >
							<button
								value={this.props.index}
								onClick={this.props.removeQuestion} 
								className="btn-primary">
								remove</button></div>
						<div className="col-md-6 border" >
							<button
								value={this.props.index}
								onClick={this.props.editQuestion} 
								className="btn-primary">
								edit</button></div>
					</div>
				</div>
			);
		}
		else if(this.props.question.multiple && this.props.answer)
		{
			return(
				<div>
					<div className="row" >
						
						{this.renderOption(this.props.question.op1)}
						{this.renderOption(this.props.question.op2)}						
					</div>
					<div className="row" >
						{this.renderOption(this.props.question.op3)}
						{this.renderOption(this.props.question.op4)}
					</div>
				</div>
			);
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
export default Question;
