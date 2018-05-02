
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Surveys = new Mongo.Collection('surveys');

if (Meteor.isServer) {

    Meteor.publish('surveys', function questionsPublication() {

	    return Surveys.find({});

	});
}

Meteor.methods({

  'surveys.create'(title) {

    check(title, String);

    if (! this.userId) {

      throw new Meteor.Error('not-authorized');

    }

    return Surveys.insert({
      title,
      createdAt: new Date(),
    });

  },
  'surveys.get'(_id) {

    check(_id, String);

    if (! this.userId) {

      throw new Meteor.Error('not-authorized');

    }

    return Surveys.findOne({_id});

  },

 

});