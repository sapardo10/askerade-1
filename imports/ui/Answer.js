import React, { Component } from "react";
import { Surveys } from '../api/surveys.js';
import ReactDOM from 'react-dom';
import Question from './Question.js';


class Answer extends Component 
{	
  constructor(props) {

    super(props); 
    console.log(props.match.params.number);

    this.state = {
      survey: null,
      numQuestion:0,
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
            numQuestion:0,
        })

    });
  }

  registerAnswer(msg)
  {
    console.log("answered");
    const value = msg.target.value;
    const questionIndex=this.state.numQuestion;
    const question_id=this.state.survey.questions[questionIndex]._id;

    const answer = {
      value,
      question_id,
      questionIndex,
    };

    Meteor.call('surveys.addAnswerToQuestion', this.state.survey._id,answer,(err,res)=>{
      if(err)
          throw err;
          this.setState({
            survey: this.state.survey,
            numQuestion: questionIndex+1,
        });

    });

  }




  componentDidMount()
  {
	 this.updateSurvey();
  }

  renderquestion(question)
  {
      
        if(question!=null)
        {

      return <div className="card mx-auto" >
              <div className="card-body" >
                <h5 className="card-title" >{question.title} </h5>
                <div className="container">
                  <div className="row" >
                      <div className="col-md-6 border" >
                        <button onClick={this.registerAnswer.bind(this)} type="button" value={question.op1}>{question.op1}</button>
                      
                      </div>
                      <div className="col-md-6 border" >
                        <button onClick={this.registerAnswer.bind(this)}  type="button" value={question.op2}>{question.op2}</button>
                      </div>
                  </div>
                  <div className="row" >
                      <div className="col-md-6 border" >
                        <button onClick={this.registerAnswer.bind(this)}  type="button" value={question.op3}>{question.op3}</button>
                      </div>                      
                      <div className="col-md-6 border" >
                        <button onClick={this.registerAnswer.bind(this)}  type="button" value={question.op4}>{question.op4}</button>
                      </div>                   
                  </div>
                </div>
              </div>
            </div>
        }  
        else
        {
          return <h2>No more questions  </h2>
        }
  }

  renderSur()
  {
  				if(this.state.survey!==null)
  				{
            return this.renderquestion(this.state.survey.questions[this.state.numQuestion]);
  				}
  				return <div><h1>404</h1></div>;
}

  render()
  {
  		return(this.renderSur());
  			
  }
}
export default Answer;
