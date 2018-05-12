import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Meteor } from "meteor/meteor";
import Question from "./Question.js"


class Survey extends Component 
{	
	constructor(props) {
		super(props); 
		this.state = {
			survey: null,
		};
	}

	updateSurvey()
	{
		Meteor.call("surveys.get", this.props.match.params.number,(err,res)=>{
			if(err)
				throw err;
			this.setState({
				survey: res,
			});

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
    console.log(this.state.survey._id);
		return questions.map((question,index) => {
			return  <Question
				key={question.toString().concat(index)}
				question={question}
				index={index}
				survey_id={this.state.survey._id}
			/>;
		});
	}

	changeQuery() {
		const active = ReactDOM.findDOMNode(this.refs.active).checked;
		Meteor.call("surveys.changeActive",this.state.survey._id,active);
	}
	isChecked(){
		return this.state.survey.active?"defaultChecked":"";
	}

	renderInput()
	{
		if(this.state.survey.active)
		{
			return( 
				<input 
					ref="active"
					type="checkbox" 
					onChange={this.changeQuery.bind(this)}
					defaultChecked
				/>);
		}
		else
		{
			return( 
				<input 
					ref="active"
					type="checkbox" 
					onChange={this.changeQuery.bind(this)}
				/>);
		}
	}

	renderConfigMenu()
	{
		return(
			<div className="row">
				<div className="col-md-3" ></div>
				<div className="col-md-3" >
					<h2>Active</h2>
				</div>
				<div className="col-md-3" >
					<label className="switch">
						{this.renderInput()}
						<span className="slider round"></span>
					</label>
				</div>
				<div className="col-md-3" ></div>
			</div>
		);
	}

	renderSur()
	{
		if(this.state.survey!==null && this.state.survey.owner ===Meteor.userId())
		{
			const q = this.state.survey.questions;
			return<div className="container">
          <h1>{this.state.survey.title}</h1>
          <br/>
          {this.renderConfigMenu()}

          {this.renderquestions(q)
          }

          <br/>
          <br/>
          <br/>

          <form className="new-question" onSubmit={this.handleSubmit.bind(this)}>
            



            <div className="card mx-auto"  >
            <div className="card-body" >

              <div className="form-group card-title">
              <input
                className="form-control text-center"
                type="text"
                ref="title"
                placeholder="Type the question"
                required
              />            
            </div>

              <div className="container">
                <div className="row" >
                    <div className="col-md-6 border" >
                      <div className="form-group">
                        <input
                          className="form-control"
                          type="text"
                          ref="op1"
                          placeholder="Type the option 1"
                        />            
                      </div>
                    </div>
                    <div className="col-md-6 border" >
                      <div className="form-group">
                        <input
                          className="form-control"
                          type="text"
                          ref="op2"
                          placeholder="Type the option 2"
                        />            
                      </div>
                    </div>
                </div>
                <div className="row" >
                    <div className="col-md-6 border" >
                      <div className="form-group">
                        <input
                          className="form-control"
                          type="text"
                          ref="op3"
                          placeholder="Type the option 3"
                        />            
                      </div>
                    </div>
                    <div className="col-md-6 border" >
                       <div className="form-group">
                        <input
                          className="form-control"
                          type="text"
                          ref="op4"
                          placeholder="Type the option 4"
                        />            
                      </div>
                    </div>
                </div>
              </div>
              
            </div>
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
