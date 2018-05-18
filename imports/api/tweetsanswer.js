import {Mongo} from "meteor/mongo";
import {Meteor} from "meteor/meteor";
import {check} from "meteor/check";

export const Tweets = new Mongo.Collection("Tweets");

if (Meteor.isServer) {
    Meteor.publish("Tweets", (codigo) => {
        return Tweets.find(
        				{query: codigo}, 
        				{sort: {date: -1}, 
        				limit: 5});
    });
}

Meteor.methods({
    "tweets.stream"(codigo, idPregunta) {
        check(codigo, String);
        var Twit = require('twit')

        var T = new Twit({
            consumer_key: process.env.CONSUMER_KEY_TWITTER,
            consumer_secret: process.env.CONSUMER_SECRET_TWITTER,
            access_token_key: process.env.ACCESS_TOKEN_TWITTER,
            access_token_secret: process.env.ACCESS_TOKEN_SECRET_TWITTER
        });
        /**
         * Stream statuses filtered by keyword
         * number of tweets per second depends on topic popularity
         **/
        var stream = T.stream("statuses/filter", {track: '#' + codigo});

        stream.on("data", Meteor.bindEnvironment(function (data) {
                // Construct a new tweet object
                const date = moment(data["created_at"], 'dd MMM DD HH:mm:ss ZZ YYYY', 'en').format('MMMM Do YYYY, h:mm:ss a');
                const tweet = {
                    query: hashtag,
                    twit: data["id"],
                    author: data["user"]["name"],
                    body: data["text"],
                    date: date,
                    idPregunta: idPregunta
                };
                Tweets.insert(tweet);

            }));
    },
    "tweets.get"(codigo) {
    	check(codigo, String);
        var Twit = require('twit')

        var T = new Twit({
            consumer_key: process.env.CONSUMER_KEY_TWITTER,
            consumer_secret: process.env.CONSUMER_SECRET_TWITTER,
            access_token_key: process.env.ACCESS_TOKEN_TWITTER,
            access_token_secret: process.env.ACCESS_TOKEN_SECRET_TWITTER
        });

        T.get('search/tweets', { q: '#'+codigo, count: 10 }, function(err, data, response) {
		  console.log(data);
		  return data;
		})
    }
});