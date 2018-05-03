
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

    if(title==="") {

      throw new Meteor.Error('Empty field');

    }

    if (! this.userId) {

      throw new Meteor.Error('not-authorized');

    }

    return Surveys.insert({
      title,
      createdAt: new Date(),
      questions: [],
      answers: [],
    });

  },

  'surveys.get'(_id) {

    check(_id, String);

    return Surveys.findOne({_id});

  },

  'surveys.addQuestion'(_id, question) {

    check(_id, String);
    check(question.title, String);

    if(question.title==="") {

      throw new Meteor.Error('Empty field');

    }

    if (! this.userId) {

      throw new Meteor.Error('not-authorized');

    }

    return Surveys.update({_id},{$push:{questions: question}});

  },

  'surveys.addAnswerToQuestion'(_id,  answer) {

    check(_id, String);


    return Surveys.update({_id},{$push:{answers: answer}});

  },



 

});