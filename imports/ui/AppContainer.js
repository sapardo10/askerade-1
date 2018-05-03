import React, { Component } from "react";
import { Route, Switch } from 'react-router-dom';
import Header from "./Header";
import Search from "./Search";
import Products from "./Products";
import Survey from "./Survey.js";
import Answer from "./Answer.js";
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Surveys } from '../api/surveys.js';





class AppContainer extends Component {
  render() {

    return (
		  <div>
        <Header />
        <main>
          <Switch>
          {
            /*

            <Route exact path='/jugar' component={Home}/>
            */
          }
            <Route exact path='/' render={()=><Search user={this.props.user}/>}/>
            <Route path='/products' component={Products}/>
            <Route path='/survey/:number' component={Survey}/>
            <Route path='/answer/:number' component={Answer}/>



          </Switch>
        </main>
      </div>
    );
  }
}

export default withTracker(() => {

  //Meteor.subscribe('tasks');
  Meteor.subscribe('surveys');


  return {

    //tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    //incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
    user: Meteor.user(),
    surveys: Surveys.find({}, { sort: { createdAt: -1 } }).fetch(),
  };

})(AppContainer);
