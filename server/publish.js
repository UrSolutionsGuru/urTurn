/**
 * Created by GaryC on 2016/03/17.
 */

Meteor.publishComposite('mySlots', {
  find: function() {
   // console.log('Republishing');
    myServices = [];
    // myServices[0] =  "zE68Bdzw4eFZ3snp7";
   // myServices[1] =  "mRdGu8ptdi3aKoudE";
    var i = 0;
    Subs.find({facebook: this.userId, displayIt: true}).forEach(function (sub)
    {
      myServices[i] = sub.service;
      i++;
    });

   // return Services.find({_id: Subs.findOne({facebook: Meteor.userId()}).service}); //NO
    // return Services.find({_id: Subs.findOne({facebook: this.userId}).service});  //NO
   //return Services.find({title: "Morning Services"}); //YES
    //return Services.find({title: "Evening Services"}); //YES
    return Services.find({_id: { $in: myServices}}); //YES
  },
  children: [
    {
      find: function(services) {
        return Subs.find({service: services._id});
      }
    },
    {
      find: function(services) {
        return Slots.find({service: services._id});
      },
      children: [
        {
          find: function (slots, services) {
            return Urturns.find({BackRef: slots._id});
          }
        },
        {
          find: function (slots, services) {
            return Swops.find({BackToRef: slots._id});
          }
        }
      ]
    }
  ]

});

Meteor.publish("slots", function (){
  return Slots.find({});
});

Meteor.publish("urturns", function (){
  return Urturns.find({});
});

Meteor.publish("swops", function (){
  return Swops.find({});
});

Meteor.publish("services", function (){
  return Services.find({});
});

Meteor.publish("subs", function (){
  //console.log('Republishing SUBS');
  return Subs.find({facebook: this.userId});
});

Meteor.publish("userData", function () {
 /* if (this.userId) {
    return Meteor.users.find({_id: this.userId},
      {fields: {'other': 1, 'things': 1}});
  } else {
    this.ready();
  }*/
  return Meteor.users.find({}); //close up to a few fields later !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
});

Meteor.publish('TreeData', function() {
  return TreeData.find();
});

Meteor.publish('ServiceTree', function() {
  return ServiceTree.find();
});

Meteor.publish('Orgs', function() {
  return Orgs.find();
});

Meteor.publish('Markers', function() {
  return Markers.find();
});

Meteor.publish('Hits', function() {
  return Hits.find();
});

Meteor.publish('OnLine', function() {
  return OnLine.find();
});