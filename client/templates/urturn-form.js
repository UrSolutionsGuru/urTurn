/**
 * Created by GaryC on 2016/03/09.
 */
// helper function that returns all available urturn
Template.urturnForm.helpers({
  getSlots:function(){
    return Slots.find({});
  }
});

Template.test.helpers({
  getsubs:function(){
    return Subs.find({});
  },
  getservs:function(){
    return Services.find({});
  }
});

Template.test.onRendered(function() {
  Session.set("holdMenu", "test");
});