import React, { Component } from 'react';

export class Tweet extends Component {
	render() {
		return (
			<div className="card text-white bg-primary mb-3" >
			  <div className="card-header">{this.props.tweet.created_at}</div>
			  <div className="card-body">
			    <h5 className="card-title">{this.props.tweet.user.name}</h5>
			    <p className="card-text">{this.props.tweet.text}</p>
			  </div>
			</div>
		);
	}
}
