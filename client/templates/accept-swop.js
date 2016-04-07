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

Template.mySwop.helpers({
  myEmail: function() {
    var userDataHandel = Meteor.subscribe("userData");
    // console.log('my services called');
    if (mySlotsHandel.ready()) {
      var swop_id = this._id;
     // var swop_BackFromRef = this.BackFromRef; // Swops.findOne({_id: swop_id}).BackFromRef;
     // console.log(swop_id);
      // console.log(Swops.findOne({_id: swop_id}).title);
     // console.log(swop_BackFromRef);

      //console.log('!!!!!' + Urturns.findOne({_id: 'NiRzN75YHrtuPd6GB'}).title);
      //console.log(Urturns.findOne({_id: swop_BackFromRef}).title);

      //console.log('####'+Urturns.findOne({_id: Swops.findOne({_id: swop_id}).BackFromRef}).facebook);
      //console.log(Meteor.users.findOne({_id: Urturns.findOne({_id: Swops.findOne({_id: swop_id}).BackFromRef}).facebook}).services.facebook.email);

      if (userDataHandel.ready()) {
        return (Meteor.users.findOne({_id: Urturns.findOne({_id: Swops.findOne({_id: swop_id}).BackFromRef}).facebook}).services.facebook.name
        +': ' +Meteor.users.findOne({_id: Urturns.findOne({_id: Swops.findOne({_id: swop_id}).BackFromRef}).facebook}).services.facebook.email);
        //return Meteor.users.findOne({_id: Urturns.findOne({_id: Swops.findOne({_id: this._id}).BackFromRef}).facebook}).first_name;
      } else {
        console.log ('User names not ready');
        return ('');
      }
    } else {
      console.log ('not ready');
      return ('');
    }
  },
  theYouToDo: function() {
    var userDataHandel = Meteor.subscribe("userData");
    if (mySlotsHandel.ready() && userDataHandel.ready()) {
      var swop_id = this._id;
      var sex = 'She';
      if (Meteor.users.findOne({_id: Urturns.findOne({_id: Swops.findOne({_id: swop_id}).BackFromRef}).facebook}).services.facebook.gender == 'male'){
        sex = 'He';
      }
      return sex +' would like you to do ' + Urturns.findOne({_id: Swops.findOne({_id: swop_id}).BackFromRef}).start;
    } else {
      console.log ('sex not ready');
      return ('');
    }

  }
});

Template.acceptSwop.onRendered(function() {

  Session.set("holdMenu", "acceptSwop");
});