/**
 * Created by GaryC on 2016/05/24.
 */

Meteor.setInterval(function(){
  Meteor.users.find({}).forEach(function(user){
    //console.log(user.services.facebook.name);
   // console.log(user.status.online);
    //console.log(user.status.lastLogin.ipAddr);
    if (!user.status.online) {
      Markers.find({facebook: user._id}).forEach(function(marker){

        console.log(user._id);
        console.log(marker._id);
        console.log('GONE');
        Markers.remove({_id: marker._id});
      });
    }
  });
},5000);