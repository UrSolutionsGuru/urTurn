/**
 * Created by GaryC on 2016/03/17.
 */
Meteor.publishComposite('mySlots', {
  find: function() {
   // return Services.find({_id: Subs.findOne({facebook: Meteor.userId()}).service});
    return Services.find({_id: Subs.findOne({facebook: this.userId}).service});
  }

});

Meteor.publish("slots", function (){
  return Slots.find({});
});

Meteor.publish("urturns", function (){
  return Urturns.find({});
});

Meteor.publish("swops", function (){
  return Swops.find({});
});