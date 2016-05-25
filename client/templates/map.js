/**
 * Created by GaryC on 2016/05/23.
 */

if (Meteor.isClient) {
  var MAP_ZOOM = 15;

  Meteor.startup(function() {
    GoogleMaps.load();
  });

  Template.map.onCreated(function() {
    var self = this;

    GoogleMaps.ready('map', function(map) {
     /* google.maps.event.addListener(map.instance, 'click', function (event) {
        Markers.insert({lat: event.latLng.lat(), lng: event.latLng.lng()});
      }); */

     // var markerFred;
      //var latLngFred = Geolocation.latLng();
      if (MarkersReady.ready() && userDataReady.ready()) {

       /* markerFred = new google.maps.Marker({
          position: new google.maps.LatLng(Markers.findOne({}).lat, Markers.findOne({}).lng),
          //position: new google.maps.LatLng(latLngFred.lat +0.005, latLngFred.lng + 0.005),
          map: map.instance
        });
        markerFred.setOpacity(0.3);
        markerFred.setLabel('FRED');*/
      }

      //var marker1;
      //var markerMe;
     
      var markers = {};



      Markers.find().observe({
        added: function (document) {
        //  var latLng = Geolocation.latLng();
          var marker = new google.maps.Marker({
           // draggable: true,
           // animation: google.maps.Animation.DROP,
            position: new google.maps.LatLng(document.lat, document.lng),
           // position: new google.maps.LatLng(latLng.lat +0.002, latLng.lng + 0.002),
            map: map.instance,
            id: document._id
          });

         /* google.maps.event.addListener(marker, 'dragend', function(event) {
            Markers.update(marker.id, { $set: { lat: event.latLng.lat(), lng: event.latLng.lng() }});
          }); */

        /*  google.maps.event.addListener(marker, 'click', function(event) {
            Markers.remove(marker.id);
          }); */

         /* marker.setLabel(Meteor.users.findOne({_id: document.facebook}).services.facebook.name);
          if (document.facebook === Meteor.userId()) {
            marker.setOpacity(1);
          } else {
            marker.setOpacity(0.5);
          } */
          
          markers[document._id] = marker;
          markers[document._id].setLabel(document.title);
          if (document._id === Session.get('myMarker')) {
            markers[document._id].setOpacity(1);
          } else {
            markers[document._id].setOpacity(0.5);
          }
          console.log(markers[document._id].getPosition().lat());
        },
        changed: function (newDocument, oldDocument) {
          markers[newDocument._id].setPosition({ lat: newDocument.lat, lng: newDocument.lng });
         // markers[newDocument._id].setLabel(Meteor.users.findOne({_id: newDocument.facebook}).services.facebook.name);
          markers[newDocument._id].setLabel(newDocument.title);
          if (newDocument._id === Session.get('myMarker')) {
            markers[newDocument._id].setOpacity(1);
          } else {
            markers[newDocument._id].setOpacity(0.5);
          }
          /* if (newDocument.facebook === Meteor.userId()) {
            markers[newDocument._id].setOpacity(1);
          } else {
            markers[newDocument._id].setOpacity(0.5);
          } */
        },
        removed: function (oldDocument) {
          markers[oldDocument._id].setMap(null);
          google.maps.event.clearInstanceListeners(markers[oldDocument._id]);
          delete markers[oldDocument._id];
        }
      });

      // Create and move the marker when latLng changes.
      self.autorun(function() {


     /*   if (! markerMe) { //grc added
          markerMe = new google.maps.Marker({
            position: new google.maps.LatLng(latLng.lat, latLng.lng),
            map: map.instance
          });
          markerMe.setOpacity(0.5);
          markerMe.setLabel('Off');
          console.log(markerMe.getPosition().lat());
          //markerMe.setIcon({path: 'CIRCLE'});
        }

        // If the marker doesn't yet exist, create it.
        if (! marker1) {
          marker1 = new google.maps.Marker({
            position: new google.maps.LatLng(latLng.lat, latLng.lng),
            map: map.instance
          });
          marker1.setLabel('Gary')
        }
        // The marker already exists, so we'll just change its position.
        else {
           marker1.setPosition(latLng);
          //marker1.setPosition({lat: latLng.lat + 0.0001, lng: latLng.lng + 0.0001});
        }

        // Center and zoom the map view onto the current position.
        map.instance.setCenter(marker1.getPosition());
        map.instance.setZoom(MAP_ZOOM); */
      });
    });
  });

  Template.map.helpers({
    geolocationError: function() {
      var error = Geolocation.error();
      return error && error.message;
    },
    mapOptions: function() {
      var latLng = Geolocation.latLng();
      // Initialize the map once we have the latLng.
      if (GoogleMaps.loaded() && latLng) {
        return {
          center: new google.maps.LatLng(latLng.lat, latLng.lng),
          zoom: MAP_ZOOM
        };
      }
    }
  });

  Meteor.setInterval(function(){
    var latLng = Geolocation.latLng();
    if (! latLng || ! userDataReady.ready() || ! MarkersReady.ready() || ! Meteor.userId())
      return;

    if (Markers.findOne({_id: Session.get('myMarker')})){
      Markers.update({_id: Session.get('myMarker')}, { $set: { lat: latLng.lat, lng: latLng.lng }});
    } else {
      Session.set('myMarker',Markers.insert({
        lat: latLng.lat,
        lng: latLng.lng,
        facebook: Meteor.userId(),
        ipAddr: Meteor.user().status.lastLogin.ipAddr,
        title: Meteor.user().services.facebook.name,
      }));
    };

   /* if(Markers.find().count() === 0){

      if (Markers.findOne({facebook: Meteor.userId()})){
        console.log('PROTECTED IT --- AS WAS FIRST');
      } else {
        Session.set('holdipAddr', Meteor.user().status.lastLogin.ipAddr )
        Markers.insert({lat: latLng.lat, lng: latLng.lng, facebook: Meteor.userId(), ipAddr: Session.get('holdipAddr')});
        console.log('INSERETED A NEW ONE AS WAS FIRST');
      }

    } else {
      if(Markers.findOne({facebook: Meteor.userId(), ipAddr: Session.get('holdipAddr')})) {
        Markers.update({_id: Markers.findOne({facebook: Meteor.userId(), ipAddr: Session.get('holdipAddr')})._id},
          { $set: { lat: latLng.lat, lng: latLng.lng }});
        console.log(Meteor.users.findOne({_id: Meteor.userId()}).services.facebook.name);
      } else {
        if (Markers.findOne({facebook: Meteor.userId(), ipAddr: Session.get('holdipAddr')})){
          console.log('PROTECTED IT');
        } else {
          Session.set('holdipAddr', Meteor.user().status.lastLogin.ipAddr )
          Markers.insert({lat: latLng.lat, lng: latLng.lng, facebook: Meteor.userId(), ipAddr: Session.get('holdipAddr')});
          console.log('INSERTED A NEW ONE !!!!!!!!!!!!!!!!!!!!!!');
        }

      }

    } */

    
  },5000);
}
Template.mapMain.onRendered(function() {
  Session.set("holdMenu", "map");
});

Template.mapMain.onCreated(function() {
  MarkersReady = this.subscribe('Markers');
  userDataReady = this.subscribe('userData');
});