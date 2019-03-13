points = new Meteor.Collection('pointsCollection');
Large = new Meteor.Collection('saves');

Meteor.methods({
  'clear': function () {
    points.remove({});
  }
});

Meteor.startup(function () {
    if (!Large.findOne()){
    	Large.insert({_id:"canvas 0"});
    } 
  });