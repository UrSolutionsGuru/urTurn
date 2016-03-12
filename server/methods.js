/**
 * Created by GaryC on 2016/03/12.
 */
Meteor.methods({
  removeSlotsUrturns: function () {
    Slots.remove({});
    Urturns.remove({});
  }
});