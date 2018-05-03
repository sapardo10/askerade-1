import React, { Component } from 'react';
import { Surveys } from '../api/surveys.js';
import Donut from './Donut.js';

export default class Surveyview extends Component {

	constructor(props)
	{
		super(props);

		this.state = {

      		showDetails: false,

   		};
	}

	toggleHideCompleted() {

	    this.setState({

	      showDetails: !this.state.showDetails,

	    });

  	}

	render() {

		return (

			<li className="survey-list">
				
				{this.props.survey.title}

				<br/>

				<button 
					className="btn btn-details"
					 onClick={this.toggleHideCompleted.bind(this)}
					 >Details
				</button>

				<br/>

				{this.state.showDetails?(
					<Donut survey={this.props.survey}/>)
					:
					'Nada'}

			</li>

		);

	}

}
