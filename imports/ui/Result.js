import React, { Component } from "react";
import GroupedHorizontalBarChart from "./viz/GroupedHorizontalBarChart";
export default class Result extends Component {
	constructor(props) {
		super(props); 
		this.state = {
			survey: null,
			data:null,
			numQuestion:0,
			actualizando:false
		};
	}
	getData(question){
		this.modifyState("actualizando",true);

		console.log("renderChart");
		Meteor.call("survey.countAnswers",this.state.survey._id,(err,res)=>{
			if(err)
				throw err;
			
			console.log("hay "+res);

			var data = {
				labels: [
					question.title
				],
				series: [
					{
						label: question.op1,
						values: res[0]
					},
					{
						label: question.op2,
						values: res[1]
					},
					{
						label: question.op3,
						values: res[2]
					},{
						label: question.op4,
						values: [3]
					}]
			};

			this.modifyState("data",data);
			this.modifyState("actualizando",false);

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
		else if(this.state.survey!==null && !this.state.actualizando)
		{
			console.log("actualizando");
			this.getData(this.state.survey.questions[this.state.numQuestion]);
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
