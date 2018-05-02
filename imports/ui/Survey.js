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

  				return <h1>{this.state.survey.title}</h1>
  				}
  				return "";
}

  render()
  {
  		return(this.renderSur());
  			
  }
}
export default Survey;
