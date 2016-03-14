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
    //console.log('from getSlot: '+this.title);
    return Slots.findOne();
  },
  tisId: function(){
    return {_id: this._id};
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
      moveUrturn(this._id, Slots.findOne({_id: selection}).start, Slots.findOne({_id: selection}).end );
      $('.fc').fullCalendar( 'nextYear' );
      $('.fc').fullCalendar( 'prevYear' );
      console.log('After event: '+this.title);
    }
    return false;// stop the form submit from reloading the page
  },
  'hidden.bs.modal #urturn_modal':  function () {
   // $('#urturn_modal').removeData('bs.modal');
    Blaze.remove(urTurnModalViewHold);
    console.log('data removed');
  },
  'click .js-add-new-me': function () {
    var timestamp = (new Date()).getTime();
    if (this.type == 'Slot' && Meteor.userId()) {
      Urturns.insert({
        title: Meteor.user().username,
        type: 'Urturn',
        user: true,
        start: this.start,
        end: this.end,
        facebook: Meteor.userId(),
        BackRef: this._id,
        createdAt: new Date(timestamp)
      });
      $('.fc').fullCalendar( 'nextYear' );
      $('.fc').fullCalendar( 'prevYear' );
    }
  }


});

Template.urturnModal.onRendered(function(){
  var _this = this;

  //this will open the modal when you call it with Blaze.renderWithData
  $('#urturn_modal').modal();

 /* $(document.body).on('hidden.bs.modal', function () {
    $('#urturn_modal').removeData('bs.modal');
    console.log('data removed');
  }); */

  console.log('From inside onRender '+_this.data)//this will print the data object you pass on the event
  console.log(this.data)//this will print the data object you pass on the event
});

Template.urturnModal.onDestroyed(function(){
  console.log('DESTROYED');
});
