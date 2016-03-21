/**
 * Created by GaryC on 2016/03/19.
 */

Template.me.helpers({
  myServices: function() {
    // console.log('my services called');
    return Subs.find({facebook: Meteor.userId()});
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
  }
});