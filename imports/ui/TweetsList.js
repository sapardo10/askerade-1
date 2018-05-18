import React, { Component } from "react";
import { Tweet } from "./Tweet.js";

export class TweetsList extends Component {

	constructor(props){
		super(props);
	}

	renderList() {

		return this.props.tweets.map((tweet,i) => {

			return (
				<Tweet
					key={i}
					tweet={tweet}
					use={this.props.useTweet}
				/>
			);
		});
	}


	render() {
		return (
			<div className = "container">
				{this.renderList()}
			</div>
		);
	}
}
