/**
 * Created by GaryC on 2016/03/12.
 */
Template.admin.events({
  'click .js-removeSlotsUrturns': function () {

    if (confirm('Are you sure you want to delete Slots, Swops and Urturns')) {
      Meteor.call("removeSlotsUrturns");
    } else {
      // Do nothing!
    }

  },
  'click .js-addSlots': function () {
    Meteor.call("addMoreSLots");
    //addSlots();
  }

});

Template.admin.onRendered(function() {
  Session.set("holdMenu", "admin");
});