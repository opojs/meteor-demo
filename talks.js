Talks = new Mongo.Collection("talks");

Meteor.methods({
  like: function(talkid) {
    var talk = Talks.findOne(talkid);
    Talks.update(talkid, {$set: {votes: talk.votes + 1}})
    
  }
});

if(Meteor.isServer) {

  Meteor.publish("talks", function() {
    return Talks.find();
  });

} else if (Meteor.isClient) {

  Meteor.subscribe("talks");

  Template.talksList.helpers({
    talks: function() {
      return Talks.find({}, {sort: {votes: -1}});
    }
  });

  Template.talksList.events({
    'click .like': function() {
      Meteor.call("like", this._id);
    }
  });
}