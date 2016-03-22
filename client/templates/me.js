/**
 * Created by GaryC on 2016/03/19.
 */

Template.me.helpers({
  myServices: function() {
    // console.log('my services called');
    return Subs.find({facebook: Meteor.userId()});
  },
  getServices: function(){
    return Services.find({});
  }
});

Template.me.events ({
  "submit .js-my-services-form": function (event) {
    var i = 0;
    Subs.find({}).forEach(function(sub) {
      var selection = event.target[i].checked;
      var sub_id =  event.target[i].id;
      Subs.update(sub_id, {$set: {displayIt: selection}});
      i++;
    });

   // var selection = 'help';
    console.log(event.target);
    console.log(event);
    console.log("Selection is: " + selection + ' ' + sub_id);
    console.log(sub_id);
    return false;// stop the form submit from reloading the page //TAKE OUT SO DOES REFRESH
  },
  "submit .js-select-subs-form": function (event) {
    var selection = event.target.select_from.value;
    if (Subs.findOne({service: selection, facebook: Meteor.userId()})) {
      alert('You are already subscribed to this Service');
    } else {
      var timestamp = (new Date()).getTime();
      Subs.insert ({
        title: Meteor.user().profile.name +': '+ Services.findOne({_id: selection}).title,
        service: selection,
        facebook: Meteor.userId(),
        displayIt: true,
        createdAt: new Date(timestamp)
      });

    };
    console.log(selection);
    return false;// stop the form submit from reloading the page //TAKE OUT SO DOES REFRESH
  }
});

Template.me.onCreated(function(){
 this.autorun(function(){
   console.log('me autorun');
   //this.subscribe('services');
   Meteor.subscribe('services');
  });

  console.log('me created');

});