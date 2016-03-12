/**
 * Created by GaryC on 2016/03/12.
 */
Template.admin.events({
  'click .removeSlotsUrturns': function () {
    Meteor.call("removeSlotsUrturns");
  }
});