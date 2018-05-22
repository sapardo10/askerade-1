import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";

import { Surveys } from "../api/surveys.js";
import { Tweets } from "../api/tweetsanswer.js";


import Header from "./Header";
import Search from "./Search";
import Survey from "./Survey.js";
import Answer from "./Answer.js";
import Surveyview from "./Surveyview.js";

// Cuando se desplega localmente faltan varias dependencias se sugiere hacer lo siguiente: 
// meteor npm install --save twitter 
//meteor npm install --save @babel/runtime react react-color react-dom
//react-router-dom twitter query-string prop-types react-rte marked
//react-render-html sweetalert d3

//En la versión desplegada en heroku y localmente sale un error cuando se piden los detalles de una encuesta, de la misma forma fue dificil entender como 
//funcionaba la aplicación y no se pueden crear nuevas encuestas. 

//No se puede probar funcionalidad por que con las encuestas que ya estaban ocurría un error al ver los detallers y al inciiar sesión no ecuentro la opción de añadir encuestas. 



class AppContainer extends Component {
	render() {
		return (
			<div>
				<Header />
				<main>
					<Switch>
						<Route exact path="/" render={()=><Search
							tweets={this.props.tweets} 
							user={this.props.user} 
							surveys={this.props.surveys}/>}/>
						<Route path="/survey/:number" component={Survey}/>
						<Route path="/answer/:number" component={Answer}/>
					</Switch>
				</main>
			</div>
		);
	}
}

export default withTracker(() => {
	Meteor.subscribe("surveys");
	Meteor.subscribe("tweets");

	let owner= Meteor.userId();

	return {
		user: Meteor.user(),
		surveys: Surveys.find({owner}, { sort: { createdAt: -1 } }).fetch(),
		tweets: Tweets.find({}, {sort: {date: -1}, limit: 4}).fetch(),

	};

})(AppContainer);
