/**
 * Created by GaryC on 2016/05/25.
 */

UserStatus.events.on("connectionLogin", function(fields) { 
  if (Hits.findOne({month: moment().format('MMYYYY'), facebook: fields.userId})){
    //console.log ('update Hit');
    Hits.update({month: moment().format('MMYYYY'), facebook: fields.userId}, {$set: { lastIpAddr: fields.ipAddr}, $inc: {count: 1}});
  } else {
    //console.log ('insert Hit');
    Hits.insert({
      month: moment().format('MMYYYY'),
      facebook: fields.userId,
      count: 1,
      lastIpAddr: fields.ipAddr,
      name: Meteor.users.findOne(fields.userId).services.facebook.name || 'Anon',
    });
  }
  if (Hits.findOne({month: moment().format('MMYYYY'), facebook: 0})){
    //console.log ('update Hit anon after');
    Hits.update({month: moment().format('MMYYYY'), facebook: 0}, {$inc: {count: -1}});
  } else {
    //console.log('insert Hit anon after');
    Hits.insert({
      month: moment().format('MMYYYY'),
      facebook: 0,
      count: 0,
      lastIpAddr: null,
      name: 'Anon',
    });
  }
  
});

UserStatus.connections.find({userId: {$exists: false}}).observe({
  added: function (document) {
    //console.log('anon added');
    if (Hits.findOne({month: moment().format('MMYYYY'), facebook: 0})){
      //console.log ('update Hit anon');
      Hits.update({month: moment().format('MMYYYY'), facebook: 0}, {$inc: {count: 1}});
    } else {
      //console.log ('insert Hit anon');
      Hits.insert({
        month: moment().format('MMYYYY'),
        facebook: 0,
        count: 1,
        lastIpAddr: null,
        name: 'Anon',
      });
    }
    OnLine.update({}, {$set: {count: UserStatus.connections.find({}).count()}});
  },
  removed: function (oldDocument) {
    OnLine.update({}, {$set: {count: UserStatus.connections.find({}).count()}});
  },
  
});