/**
 * Created by GaryC on 2016/03/11.
 */
Template.urturnModal.helpers({
  getSlots:function(){
  //this works - excuse the pun
   //var _this = this;
    //console.log('from helper: '+ this._id);
    //return Urturns.find({_id: _this._id});
   return Slots.find();
  },
  getSlot:function() {
    console.log('from getSlot: '+this.title);
    return Slots.findOne();
  }
});

Template.urturnModal.events ({
  "submit .js-save-urturnmodal-form":function(event) {

    // here is an example of how to get the url out of the form:
    var url = event.target.url.value;
    var title = event.target.title.value;

    var description = event.target.description.value;
    var selection = event.target.selection.value;
    console.log("The url they entered is: " + url+title+description);
    console.log("Selection is: " + selection);

    if (selection != 'undefined') {
      var event = {
        id: this._id,
        start: Slots.findOne({_id: selection}).start,
        end: Slots.findOne({_id: selection}).end
      };
      console.log('New created event: ' + event.id + event.start);
      moveUrturn(event);
      $('.fc').fullCalendar( 'next' );
      $('.fc').fullCalendar( 'prev' );
      console.log('After event: '+this.title);
    }
    return false;// stop the form submit from reloading the page
  }

});

Template.urturnModal.onRendered(function(){
  var _this = this;

  //this will open the modal when you call it with Blaze.renderWithData
  $('#urturn_modal').modal();

  console.log(_this.data)//this will print the data object you pass on the event
});
