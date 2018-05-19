import Twitter from "twitter";
import {Meteor} from "meteor/meteor";
import { Mongo } from "meteor/mongo";
import { check } from "meteor/check";


// TODO: Now we have only one stream overall,
// we should have one per user at least
let stream = null;
let lastQuery = null;
let stop=false;

// This is a in memory only collection
export const Tweets = new Mongo.Collection("tweets");


// Twitter streamer should run only on the server
if (Meteor.isServer) {
	Meteor.publish("tweets", function tweetsPublication() {
		return Tweets.find({}, {sort: {created_at: -1}, limit:10});
	});

	// This method will trigger the streamer
	Meteor.methods({
		"twitter.remove"(_id) {
			check(_id, String);
			Tweets.remove({_id});
		},
		"twitter.stop"() {
			stop=true;
			if (stream ) {
				console.log("Stopping previous stream");
				stream.destroy();
			}
		},
		"twitter.stream"(query) {
			stop=false;
			console.log("Twitter search " + query);
			lastQuery=query;
			// Create the Twitter object
			let client = new Twitter({
				consumer_key: process.env.TWITTER_CONSUMER_KEY,
				consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
				access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
				access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
            
			});

			if (stream && lastQuery!==query) {
				console.log("Stopping previous stream");
				stream.destroy();
				// Remove all the tweets
				Tweets.remove({});
			}

			stream = client.stream("statuses/filter", {track: query});
			stream.on("data", Meteor.bindEnvironment(function(tweet) {
				if(!stop)
				{
				Tweets.insert(tweet);
				}
			}));

			stream.on("error", function(error) {
				console.log(error);
				throw Meteor.Error(error);
			});
			lastQuery=query;
		}// twitter.stream
	}); //Meteor.methods
}
