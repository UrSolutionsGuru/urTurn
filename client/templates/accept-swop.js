/**
 * Created by GaryC on 2016/03/26.
 */

Template.acceptSwop.helpers({
  mySwops: function() {
    // console.log('my services called');
    return Swops.find({});
  },
  getServices: function(){
    return Services.find({});
  }
});

Template.acceptSwop.onRendered(function() {
  Session.set("holdMenu", "acceptSwop");
});