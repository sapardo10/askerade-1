import React, { Component } from "react";

class Question extends Component 
{
	render()
	{
		return (
			<div className="card mx-auto"  >
				<div className="card-body" >
					<h5 className="card-title" >{this.props.question.title} </h5>
					<div className="container">
						{this.renderOptions()}
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
				</div>
			</div>
		);  
	}
	renderOptions()
	{
		if(this.props.question.multiple)
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
				</div>
			);
		}
	}	
}
export default Question;
