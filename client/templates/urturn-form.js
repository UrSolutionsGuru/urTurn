/**
 * Created by GaryC on 2016/03/09.
 */
// helper function that returns all available urturn
Template.urturnForm.helpers({
  getSlots:function(){
    return Slots.find({});
  }
});