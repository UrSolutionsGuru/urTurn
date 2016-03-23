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
  },
  getFroms: function(){
    return Urturns.find({facebook: Meteor.userId(), type: 'Urturn'});
  },
  getSwops: function(){
    return Urturns.find({facebook: { $not: Meteor.userId()}});
  },
  newMeButton: function(){
    if (this.type == 'Swop' || (this.type == 'Urturn'  && this.facebook == Meteor.userId()) || this.type == 'CommittedUrturn') {
      return "disabled";
    } else {
      return "";
    };
  },
  moveMeFromButton: function(){
    if (Urturns.findOne({BackRef: this.BackRef, facebook: Meteor.userId()})) {
      return "disabled";
    };
    if (this.type == 'Slot'  || (this.type == 'Urturn' && this.facebook != Meteor.userId())) {
      return "";
    } else {
      return "disabled";
    };
  },
  commitMeButton: function(){
    if (this.type == 'Urturn' && this.facebook == Meteor.userId()) {
      return "";
    } else {
      return "disabled";
    };
  },
  swopMeButton: function(){
    if (this.type == 'CommittedUrturn') {
      return "";
    } else {
      return "disabled";
    };
  },
  acceptSwopButton: function(){
    if (this.type == 'Swop') {
      var canDo = false;
      Urturns.find({start: Slots.findOne({_id: this.BackToRef}).start, facebook: Meteor.userId()}).forEach(function (slot)
        {canDo = true;}); // I must be there to swop
     // console.log(canDo +'' +this.BackToRef);
      if (this.facebook == Meteor.userId()){canDo = false;}; // cant swop my own request
      if (canDo){return "";} else {return "disabled"};
    } else {
      return "disabled";
    };
  }
});

Template.urturnModal.events ({
  "submit .js-save-urturnmodal-form":function(event) {

    // here is an example of how to get the url out of the form:
    var url = event.target.url.value;
    var title = event.target.title.value;

    var description = event.target.description.value;
    var selection = event.target.selection.value;
   // console.log("The url they entered is: " + url+title+description);
   // console.log("Selection is: " + selection);

    if (selection != 'undefined') {
      var event = {
        id: this._id,
        start: Slots.findOne({_id: selection}).start,
        end: Slots.findOne({_id: selection}).end
      };
    //  console.log('New created event: ' + event.id + event.start);
      moveUrturn(this._id, Slots.findOne({_id: selection}).start, Slots.findOne({_id: selection}).end );
      $('.fc').fullCalendar( 'nextYear' );
      $('.fc').fullCalendar( 'prevYear' );
    //  console.log('After event: '+this.title);
    }
    return false;// stop the form submit from reloading the page
  },
  "submit .js-move-from-form":function(event) {
    var selection = event.target.select_from.value;
    //console.log("Selection is: " + selection);
    if (selection != 'undefined') {
     //console.log('Move: ' + selection + this.start);
      moveUrturn(selection, this.start, this.end);
      //alert('look at log');
    //  $('.fc').fullCalendar( 'nextYear' );
     // $('.fc').fullCalendar( 'prevYear' );
     // console.log('After event: '+this.title);
     // Blaze.remove(urTurnModalViewHold); // freese up screen calling from here
      $('#urturn_modal').modal('hide');
    }
    return false;// stop the form submit from reloading the page
  },
  'hidden.bs.modal #urturn_modal':  function () {
   // $('#urturn_modal').removeData('bs.modal');
    Blaze.remove(urTurnModalViewHold);
   // console.log('data removed');
  },
  'click .js-add-new-me': function () {
  //  console.log('add new me');
    var timestamp = (new Date()).getTime();
    if (this.type == 'Slot' && Meteor.userId()) {
     // console.log(Meteor.userId());
    // console.log(Meteor.user());
      Urturns.insert({
        title: Meteor.user().profile.name,
        type: 'Urturn',
        user: true,
        start: this.start,
        end: this.end,
        facebook: Meteor.userId(),
        BackRef: this._id,
        createdAt: new Date(timestamp)
      });
      Slots.update(this._id, {$set: {Hidden: true}});
      $('#urturn_modal').modal('hide');
      //$('.fc').fullCalendar( 'nextYear' );
     // $('.fc').fullCalendar( 'prevYear' );
    }
  },
  'click .js-commit-me': function () {
    if (confirm('Are you sure you want to confirm this UrTurn. Once you have confirmed you will only be able to move it by swapping with another willing party')) {
      Urturns.update(this._id, {$set: {type: 'CommittedUrturn'}});
      //$('.fc').fullCalendar('nextYear');
     // $('.fc').fullCalendar('prevYear');

      $('#urturn_modal').modal('hide');

    }

  },
  'click .js-accept-swop':function () {
    if (confirm('Are you sure you want to confirm this Swop. Once you have confirmed you will only be able to move it by swapping with another willing party')) {

      var requestor = this.BackFromRef;
      var reqStart = Urturns.findOne({_id: requestor}).start;
      var reqEnd = Urturns.findOne({_id: requestor}).end;
      var accStart = Slots.findOne({_id : this.BackToRef}).start;
      var accEnd = Slots.findOne({_id : this.BackToRef}).end;
      var acceptor = Urturns.findOne({start: accStart, facebook: Meteor.userId() })._id;

    //  console.log("req "+requestor+reqStart+reqEnd);
    //  console.log("acc "+acceptor+accStart+accEnd);

      moveUrturn(requestor, accStart,accEnd );
      moveUrturn(acceptor, reqStart,reqEnd );
      Urturns.update(requestor, {$set: {type: 'CommittedUrturn'}});
      Urturns.update(acceptor, {$set: {type: 'CommittedUrturn'}});
      Swops.remove({_id: this._id});

      // Urturns.update(this._id, {$set: {type: 'CommittedUrturn'}});
      $('#urturn_modal').modal('hide');
      //$('.fc').fullCalendar('nextYear');
      //$('.fc').fullCalendar('prevYear');
    }

  },
  'submit .js-apply-swop-form': function () {
    var selection = event.target.select_from.value;
    var timestamp = (new Date()).getTime();
    if (this.type == 'CommittedUrturn' && Meteor.userId()) {
      Swops.insert({
        title: Meteor.user().profile.name + ' wants to Swop',
        type: 'Swop',
        BackFromRef: this._id,
        BackToRef: Urturns.findOne({_id: selection}).BackRef, //We want the reference to the slot not to the target swopee
        facebook: Meteor.userId(),                            // incase the target swopee moves off
        createdAt: new Date(timestamp)
      });
     // Slots.update(this._id, {$set: {Hidden: true}});
      Meteor.call('sendEmail',
        'garyc@dac.co.za',
        'garydaccarter@gmail.com',
        'Hello AGAIN from Meteor!',
        'This is a test of Email.send.');
      $('#urturn_modal').modal('hide');
     // $('.fc').fullCalendar('nextYear');
     //$('.fc').fullCalendar('prevYear');
      return false;// stop the form submit from reloading the page
    } else {
        alert('Not a CommittedUrturn');
    };

  }
});

Template.urturnModal.onRendered(function(){
  var _this = this;
  //this will open the modal when you call it with Blaze.renderWithData
  $('#urturn_modal').modal();
});

Template.urturnModal.onDestroyed(function(){
  console.log('DESTROYED');
});
