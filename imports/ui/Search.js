import React, { Component } from "react";
import queryString from 'query-string';
import { ProductsDB } from '../api/products.js';
import ProductsList from './ProductsList.js';
import ReactDOM from 'react-dom';
import { Session } from 'meteor/session';
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter';
 import { Redirect } from 'react-router-dom';
 import { Surveys } from '../api/surveys.js';


class Search extends Component 
{	
  constructor(props) {

    super(props); 

    this.state = {
      redirect: false,
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

  handleSubmit(event){

    event.preventDefault();

    const title = ReactDOM.findDOMNode(this.refs.title).value.trim();

    Meteor.call('surveys.create', title,(err,res)=>{
      if(err)
          throw err;
        ReactDOM.findDOMNode(this.refs.title).value = '';
        this.setState({ url:"/survey/"+res,redirect: true })
    });

    
  }

  render() {

    if (this.state.redirect) {
       return <Redirect to={this.state.url}/>;
     }
    return (
      <div className="container">
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
              />            
            </div>
            
            <input
              className="btn btn-submit"
              type="submit"
              placeholder="Add question"
            />

          </form></div>) : ''
        }

      </div>
      );
    /*
        <div className="container-green">
        </div>
        <div className="container-background">
          <div className="container-fluid container-search">

            <div className="input-group search-div">   
              <form 
                className="search-form search-bar"
                onSubmit={this.handleSubmit.bind(this)} 
                onChange={this.handleSubmit.bind(this)}> 
                
                <input aria-label="Search" ref ="searchValue" type="text" className="form-control" placeholder="Search for..."/>
              </form>
            </div>
            <h5>Remember, to barter, you should offer a product</h5>
            <h5>Go <a href="/#/products">here</a> to add a product</h5>
            </div>
          <ProductsList products={this.props.products}/>

          <h6>Eeny, meeny, miny, moe. With which Product should I go?</h6>
        </div>
    );
        */
  }

}

export default Search;
