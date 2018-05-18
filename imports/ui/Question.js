import React, { Component } from "react";
import renderHTML from 'react-render-html';

class Question extends Component 
{
	render()
	{
		return (
			<div className="card mx-auto question-cont"  >
				<div className="card-body" >
					<div className="card-title" >{renderHTML(this.props.question.title)} </div>
					<div className="container" style={{"backgroundColor": this.props.question.color}}>
						{this.renderOptions()}
						
					</div>
				</div>
			</div>
		);  
	}
	renderOption(option,label)
	{
		return(
			<div className="col-md-6 border" >
				<button 
					className="btn btn-primary"
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
				<div>
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
			return (<form 
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

							
				</form>);
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
