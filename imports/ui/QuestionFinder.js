import React, { Component } from "react";
import { TweetsList } from "./TweetsList.js";


export default class QuestionFinder extends Component {
	render() {
		return (<div>
			<form 
				onSubmit={this.props.handleSubmit}
				className="form-group">
				<div className="form-row">
					<label>Ingresa el termino de busqueda</label>
					<input
						className="form-control"
						ref="tweet"
						type="text"
						placeholder="Hashtag to search"
					/>
				</div>
				<input 
					className="btn btn-submit"
					type="submit"							
				/>


				<div className="row" >
					<div className="col-md-4"> </div>
					<div className="col-md-2 " >
						<button
							value={this.props.index}
							onClick={this.props.removeQuestion} 
							className="btn btn-danger">
							Remove</button></div>
					<div className="col-md-2" >
						<button
							value={this.props.index}
							onClick={this.props.editQuestion} 
							className="btn btn-primary">
							Edit </button></div>
				</div>

					
			</form>

			<TweetsList
				use={this.props.useTweet}
				tweets={this.props.tweets}
			/>
		</div>);
	}
}
