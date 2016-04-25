/**
 * Created by GaryC on 2016/03/16.
 */

Template.body.helpers({
  admin: function() {
    if (Meteor.user().profile.name === 'Gary Carter'){ //set to garyc for now
      return "/admin";
    } else {return '#';};

  },
  menuAdmin: function() {
    if (Session.get("holdMenu") == 'admin'){
      return "active";
    } else {return "";};

  },

  menuAcceptSwop: function() {
    if (Session.get("holdMenu") == 'acceptSwop'){
      return "active";
    } else {return "";};

  },
  menuTest: function() {
    if (Session.get("holdMenu") == 'test'){
      return "active";
    } else {return "";};

  },
  myServices2: function() {
    // console.log('my services called');
    return Subs.find({facebook: Meteor.userId()});
  },
  meTest: function() {
    if (Session.get("holdMenu") == 'me'){
      return "active";
    } else {return "";};

  },
  menuUrturn: function() {
    if (Session.get("holdMenu") == 'me' ||
        Session.get("holdMenu") == 'acceptSwop' ||
        Session.get("holdMenu") == 'test' ||
        Session.get("holdMenu") == 'urturn'){
      return "active";
    } else {return "";};

  },
  menuCalendar: function() {
    if (Session.get("holdMenu") == 'urturn'){
      return "active";
    } else {return "";};

  },
  menuOne: function() {
    if (Session.get("holdMenu") == 'one'){
      return "active";
    } else {return "";};

  },
  treeArgs: {
    collection: TreeData,
    subscription: 'TreeData',
    mapping: {
      text: 'name'

    },
    events: {
      changed: function (e, item) {
        console.log("Item " + item + "selected.");
      }
    },
    jstree: {

      checkbox: {whole_node: false, keep_selected_style: false, three_state: false},
      plugins: [
        "checkbox",
        //"contextmenu",
        //"dnd",
        // "sort",
        "state"

      ],
      core: {multiple: false}
    }
  }
});

Template.body.events ({
  'change': function (event) {   //#TGuFwFr7Zx4JfFxTq
  //  console.log('checkbox in menu changed');
  //  console.log(event);
    var selection = event.target.checked;
    var sub_id =  event.target.id;
  //  console.log('change event '+selection+sub_id);
    Subs.update(sub_id, {$set: {displayIt: selection}});
    //$('.fc').fullCalendar('nextYear');
    //$('.fc').fullCalendar('prevYear');
    //$('.fc').fullCalendar('render');
    mySlotsHandel.stop();
    mySlotsHandel = Meteor.subscribe('mySlots');
    Meteor.setTimeout(function(){
      console.log(mySlotsHandel.ready());
    },2000);
  }
});


mySlotsHandel = Meteor.subscribe('mySlots');
//Meteor.subscribe('slots');
//Meteor.subscribe('urturns');
//Meteor.subscribe('swops');
// Meteor.subscribe('services');

var mySubsHandel = Meteor.subscribe('subs');
Meteor.subscribe('Orgs');