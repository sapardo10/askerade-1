import React, { Component } from "react";
import { Surveys } from "../api/surveys.js";
import Donut from "./Donut.js";
import marked from "marked";

export default class Surveyview extends Component {

	constructor(props)
	{
		super(props);

		this.state = {

      		showDetails: false,

   		};
	}



	render() {

		return (

			<li className="survey-list">
				<p dangerouslySetInnerHTML={{__html: marked(this.props.survey.title)}} />

				<br/>

				<button 
					value={this.props.survey._id}
					className="btn btn-details"
					onClick={this.props.details}
				>Details
				</button>

				<br/>

				{this.state.showDetails?(
					<Donut survey={this.props.survey}/>)
					:
					"Nada"}

			</li>

		);

	}

}
