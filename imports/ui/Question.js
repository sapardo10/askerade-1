import React, { Component } from "react";

class Question extends Component 
{

	render()
  {
  		console.log(this.props.question._id.concat(this.props.id));
  		return <div key = {this.props.question.toString()}>{this.props.question.title}</div>
  		
  			/*


  		return <div className="card" style="width: 18rem;" key = {this.props.question._id}>
            <div className="card-body" key = {this.props.question._id.concat("card-body")}>
              <h5 className="card-title" key = {this.props.question._id.concat("card-title")}>{this.props.question.title} </h5>
              <div>
              <div className="row" key = {this.props.question._id.concat("row1")}>
                  <div className="col-md-6 border" key = {this.props.question._id.concat("a")}>{this.props.question.op1}</div>
                  <div className="col-md-6 border" key = {this.props.question._id.concat("b")}>{this.props.question.op2}</div>
              </div>
              <div className="row" key = {this.props.question._id.concat("row2")}>
                  <div className="col-md-6 border" key = {this.props.question._id.concat("c")}>{this.props.question.op3}</div>
                  <div className="col-md-6 border" key = {this.props.question._id.concat("d")}>{this.props.question.op4}</div>
              </div>
              </div>
            </div>
          </div>
          	*/
  		
  			
  }
}
export default Question;
