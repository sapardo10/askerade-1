import React, { Component } from "react";
import queryString from 'query-string';
import { ProductsDB } from '../api/products.js';
import ProductsList from './ProductsList.js';
import ReactDOM from 'react-dom';
import { Session } from 'meteor/session';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
import { Redirect } from 'react-router-dom';
import { Surveys } from '../api/surveys.js';
import MyStatefulEditor from './MyStatefulEditor.js';
import Surveyview from './Surveyview.js';
import ColorSelect from './ColorSelect.js';



class Search extends Component 
{	
  constructor(props) {

    super(props); 

    this.state = {
      redirect: false,
      colorSurvey: '#FFFFFF',
    };
  }
  
  componentDidMount(){
    Session.setDefault('searchValue', "");
    Session.set('searchValue', "");
  }
	someFunction(){
        let params = queryString.parse(this.props.location.search);
        //console.log(params);
  }

  renderSurveys() {

    console.log(this.props.surveys);

   return this.props.surveys.map((surveyview) => (

      <Surveyview key={surveyview._id} survey={surveyview} />

    ));
    
  }

  handleSubmit(event){

    event.preventDefault();

    const title = ReactDOM.findDOMNode(this.refs.title).value.trim();

    Meteor.call('surveys.create', title, this.state.surveyColor,(err,res)=>{
      if(err)
          throw err;
        ReactDOM.findDOMNode(this.refs.title).value = '';
        this.setState({ url:"/survey/"+res,redirect: true })
    });

    
  }

  onChange(value) {
    ReactDOM.findDOMNode(this.refs.title).value = value;
  }

  onChangeColor(color) {
    console.log(color.hex);
    this.setState({
      surveyColor: color.hex
    });
  }

  render() {

    if (this.state.redirect) {
       return <Redirect to={this.state.url}/>;
     }
    return (
      <div className="container">

      <h1>Surveys done by you</h1>

          <ul>

            {this.renderSurveys()}

          </ul>

        {console.log(JSON.stringify(this.props))}
      { this.props.user ? (
          <div>
          <h2>Add a Survey!</h2>
          <form className="new-question" onSubmit={this.handleSubmit.bind(this)}>
            <div className="form-group">
              <input
                className="form-control"
                type="text"
                ref="title"
                placeholder="Type the title of the Survey"
                required
                hidden
              />

              <MyStatefulEditor onChange={this.onChange.bind(this)}/>            
            </div>
            
            <ColorSelect 
              color={this.state.colorSurvey} 
              onChangeComplete={this.onChangeColor.bind(this)} 
            />

            <input
              className="btn btn-submit"
              type="submit"
              placeholder="Add question"
            />

          </form></div>) : ''
        }

      </div>
      );
  }

}

export default Search;
