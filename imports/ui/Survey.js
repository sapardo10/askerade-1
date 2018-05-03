import React, { Component } from "react";
import { Surveys } from '../api/surveys.js';
import ReactDOM from 'react-dom';
import Question from './Question.js';


class Survey extends Component 
{	
  constructor(props) {

    super(props); 
    console.log(props.match.params.number);

    this.state = {
      survey: null,
    };

    
  }

  updateSurvey()
  {
    Meteor.call('surveys.get', this.props.match.params.number,(err,res)=>{
      if(err)
          throw err;
      console.log(res);
        this.setState({
            survey: res,
        })

    });
  }


  componentDidMount()
  {
	 this.updateSurvey();
  }

  handleSubmit(event){

    event.preventDefault();

    const title = ReactDOM.findDOMNode(this.refs.title).value.trim();
    const op1 = ReactDOM.findDOMNode(this.refs.op1).value.trim();
    const op2 = ReactDOM.findDOMNode(this.refs.op2).value.trim();
    const op3 = ReactDOM.findDOMNode(this.refs.op3).value.trim();
    const op4 = ReactDOM.findDOMNode(this.refs.op4).value.trim();
    const _id= new Date().getTime().toString();
    const question = {
      title,
      op1,
      op2,
      op3,
      op4,
      _id,
    }

    console.log(question);

    Meteor.call('surveys.addQuestion', this.state.survey._id,question,(err,res)=>{
      if(err)
          throw err;
        ReactDOM.findDOMNode(this.refs.title).value = '';
        ReactDOM.findDOMNode(this.refs.op1).value = '';
        ReactDOM.findDOMNode(this.refs.op2).value = '';
        ReactDOM.findDOMNode(this.refs.op3).value = '';
        ReactDOM.findDOMNode(this.refs.op4).value = '';

        this.updateSurvey();
    });

    
  }

  renderquestions(questions)
  {
    
      console.log(questions.length);
     return questions.map((question,index) => {
      return (

          

          <div className="card mx-auto"  key={question.toString().concat(index)}>
            <div className="card-body" >
              <h5 className="card-title" >{question.title} </h5>
              <div className="container">
              <div className="row" >
                  <div className="col-md-6 border" >{question.op1}</div>
                  <div className="col-md-6 border" >{question.op2}</div>
              </div>
              <div className="row" >
                  <div className="col-md-6 border" >{question.op3}</div>
                  <div className="col-md-6 border" >{question.op4}</div>
              </div>
              </div>
            </div>
          </div>

      );

    });
   

  }

  renderSur()
  {
  				if(this.state.survey!==null)
  				{

            

          const q = this.state.survey.questions;
          return<div>
          <h1>{this.state.survey.title}</h1>

          {this.renderquestions(q)
          }

          <form className="new-question" onSubmit={this.handleSubmit.bind(this)}>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                ref="title"
                placeholder="Type the question"
              />            
            </div>

            <div className="form-group">
              <input
                className="form-control"
                type="text"
                ref="op1"
                placeholder="Type the option 1"
              />            
            </div>

            <div className="form-group">
              <input
                className="form-control"
                type="text"
                ref="op2"
                placeholder="Type the option 2"
              />            
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                ref="op3"
                placeholder="Type the option 3"
              />            
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                ref="op4"
                placeholder="Type the option 4"
              />            
            </div>
            
            <input
              className="btn btn-submit"
              type="submit"
              placeholder="Add question"
            />

          </form>  
          </div>
  				}
  				return <div>404</div>;
}

  render()
  {
  		return(this.renderSur());
  			
  }
}
export default Survey;
