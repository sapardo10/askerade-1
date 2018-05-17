import React, { Component } from "react";
import GroupedHorizontalBarChart from "./viz/GroupedHorizontalBarChart";
export default class Result extends Component {
	constructor(props) {
		super(props); 
		this.state = {
			survey: null,
			numQuestion:0
		};
	}
	renderChart(question){
		var data = {
  labels: [
    'Pregunta 1'
  ],
  series: [
    {
      label: 'respuesta A',
      values: [4]
    },
    {
      label: 'respuesta B',
      values: [12 ]
    },
    {
      label: 'respuesta C',
      values: [31]
    },{
      label: 'respuesta D',
      values: [8]
    }]
};
		console.log(question);
		return <GroupedHorizontalBarChart data = {data}/>;
	}
	

	renderSur()
	{
		if(this.state.survey!==null )
		{
			return this.renderChart(this.state.survey.questions[this.state.numQuestion]);
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
