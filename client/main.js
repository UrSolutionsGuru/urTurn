/**
 * Created by GaryC on 2016/03/16.
 */

Template.body.helpers({
  menuAdmin: function() {
    if (Session.get("holdMenu") == 'admin'){
      return "active";
    } else {return "";};

  },
  menuTest: function() {
    if (Session.get("holdMenu") == 'test'){
      return "active";
    } else {return "";};

  }
});



Meteor.subscribe('mySlots');
//Meteor.subscribe('slots');
//Meteor.subscribe('urturns');
//Meteor.subscribe('swops');

Meteor.subscribe('subs');