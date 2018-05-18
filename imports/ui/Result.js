import React, { Component } from "react";
import { Surveys } from "../api/surveys.js";
import ReactDOM from "react-dom";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";
import GroupedHorizontalBarChart from "./viz/GroupedHorizontalBarChart";



class Answer extends Component 
{	
	constructor(props) {

		super(props); 
		this.state = {
			survey: null,
			numQuestion:0,
		};
	}

  

	updateSurvey()
	{
		Meteor.call("surveys.get", this.props.id,(err,res)=>{
			if(err)
				throw err;

			this.setState({
				survey: res,
				numQuestion:0,
			});
		});
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



	renderViz(question)
	{
		if(question!=null)
		{
			let s = this.props.survey||this.state.survey;
			let answers=s.answers;

			let res=[0,0,0,0];

			for(let i=0;i<answers.length;i++)
			{
				let actual = answers[i];
				console.log(actual);
				if(actual.question_id===question._id)
				{
					if(actual.value==="op1")
					{
						res[0]++;
					}
					if(actual.value==="op2")
					{
						res[1]++;
					}
					if(actual.value==="op3")
					{
						res[2]++;
					}
					if(actual.value==="op4")
					{
						res[3]++;
					}
				}
			}

			var data = {
				labels: [
					question.title
				],
				series: [
					{
						label: question.op1,
						values: [res[0]]
					},
					{
						label: question.op2,
						values: [res[1]]
					},
					{
						label: question.op3,
						values: [res[2]]
					},{
						label: question.op4,
						values: [res[3]]
					}]
			};
			return <GroupedHorizontalBarChart data = {data}/>;
			
		}  
		else
		{
			return <h2>No more questions  </h2>;
		}
	}

	prev()
	{
		this.modifyState("numQuestion",this.state.numQuestion-1);
	}
	next()
	{
		this.modifyState("numQuestion",this.state.numQuestion+1);
	}

	renderButtons()
	{
		return(
			<div className="container">
				<div className="row">
					<div className="col-sm-6">
						<button
							onClick={this.prev.bind(this)}
						>
							&laquo; Previous
						</button>
					</div>
					<div className="col-sm-6">
						<button
							onClick={this.next.bind(this)}
						>
							Next &raquo;
						</button>
					</div>
				</div>
			</div>
		);
	}

	renderSur()
	{
		if(this.state.survey!==null )
		{
			return (
				<div>
					{this.renderViz(this.state.survey.questions[this.state.numQuestion])}
					{this.renderButtons()}
				</div>
			);
		}
		return <div><h1>404</h1></div>;
	}

	render()
	{
		return(this.renderSur());
	}
}
export default Answer;
