import React, { Component } from "react";
import { Surveys } from '../api/surveys.js';

class Survey extends Component 
{	
  constructor(props) {

    super(props); 
    console.log(props.match.params.number);

    this.state = {
      survey: null,
    };

    
  }


componentDidMount(){
	 Meteor.call('surveys.get', this.props.match.params.number,(err,res)=>{
      if(err)
          throw err;
			console.log(res);
        this.setState({
	      		survey: res,
	    	})

    });
  }

  renderSur()
  {
  				if(this.state.survey!==null)
  				{

  				return JSON.stringify(this.state.survey);
  				}
  				return "";
}

  render() {
  		return(
  			<div>Survey
  			<br/>
  				{this.renderSur()}
  			</div>
  			);
     }
}
export default Survey;
