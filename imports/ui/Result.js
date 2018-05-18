/*import React, { Component } from "react";
import GroupedHorizontalBarChart from "./viz/GroupedHorizontalBarChart";
export default class Result extends Component {
	constructor(props) {
		super(props); 
		this.state = {
			survey: null,
			data:null,
			numQuestion:0,
		};
	}
	getData(question,survey){

		console.log("renderChart");
		Meteor.call("survey.countAnswers",survey._id,(err,res)=>{
			if(err)
				throw err;
			
			console.log("hay "+res[0]);
			console.log("hay "+res[1]);
			console.log("hay "+res[2]);
			console.log("hay "+res[3]);

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

			this.modifyState("data",data);

		});

		
		console.log(question);
		

	}

	renderChart(data)
	{
		return <GroupedHorizontalBarChart data = {data}/>;
	}
	


	renderSur()
	{
		if(this.state.survey!==null && this.state.data!==null)
		{

			return this.renderChart( this.state.data);
		}
		return <div><h1>404</h1></div>;
	}

	render()
	{
		return(this.renderSur());
	}
	componentDidMount()
	{
		this.updateSurvey();
	}

	componentWillMount()
	{

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
			
			this.getData(res.questions[this.state.numQuestion],res);

			let answers = res.answers;

			for(let i =0;i<answers.length;i++)
			{
				console.log(answers[i]);
			}

			this.modifyState("survey",res);


		});
	}
}
*/
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



	renderViz(question)
	{
      
		if(question!=null)
		{
			let answers=this.state.survey.answers;

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

	renderSur()
	{
		if(this.state.survey!==null )
		{
			return this.renderViz(this.state.survey.questions[this.state.numQuestion]);
		}
		return <div><h1>404</h1></div>;
	}

	render()
	{
		return(this.renderSur());
	}
}
export default Answer;
