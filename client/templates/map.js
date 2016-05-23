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
      google.maps.event.addListener(map.instance, 'click', function (event) {
        Markers.insert({lat: event.latLng.lat(), lng: event.latLng.lng()});
      });

      var markerFred;
      var latLngFred = Geolocation.latLng();
      if (MarkersReady.ready()) {

        markerFred = new google.maps.Marker({
          position: new google.maps.LatLng(Markers.findOne({}).lat, Markers.findOne({}).lng),
          //position: new google.maps.LatLng(latLngFred.lat +0.005, latLngFred.lng + 0.005),
          map: map.instance
        });
        markerFred.setOpacity(0.3);
        markerFred.setLabel('FRED');
      }

      var marker1;
      var marker2;
     
      var markers = {};

      Markers.find().observe({
        added: function (document) {
          var latLng = Geolocation.latLng();
          var marker = new google.maps.Marker({
            draggable: true,
            animation: google.maps.Animation.DROP,
            position: new google.maps.LatLng(document.lat, document.lng),
           // position: new google.maps.LatLng(latLng.lat +0.002, latLng.lng + 0.002),
            map: map.instance,
            id: document._id
          });

          google.maps.event.addListener(marker, 'dragend', function(event) {
            Markers.update(marker.id, { $set: { lat: event.latLng.lat(), lng: event.latLng.lng() }});
          });

          google.maps.event.addListener(marker, 'click', function(event) {
            Markers.remove(marker.id);
          });

          markers[document._id] = marker;
          console.log(markers[document._id].getPosition().lat());
        },
        changed: function (newDocument, oldDocument) {
          markers[newDocument._id].setPosition({ lat: newDocument.lat, lng: newDocument.lng });
        },
        removed: function (oldDocument) {
          markers[oldDocument._id].setMap(null);
          google.maps.event.clearInstanceListeners(markers[oldDocument._id]);
          delete markers[oldDocument._id];
        }
      });

      // Create and move the marker when latLng changes.
      self.autorun(function() {
        var latLng = Geolocation.latLng();
        if (! latLng)
          return;

        if (! marker2) { //grc added
          marker2 = new google.maps.Marker({
            position: new google.maps.LatLng(latLng.lat +0.001, latLng.lng + 0.001),
            map: map.instance
          });
          marker2.setOpacity(0.5);
          marker2.setLabel('Off');
          console.log(marker2.getPosition().lat());
          //marker2.setIcon({path: 'CIRCLE'});
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
          // marker.setPosition(latLng);
          marker1.setPosition({lat: Lng.lat + 0.0001, lng: latLng.lng + 0.0001});
        }

        // Center and zoom the map view onto the current position.
        map.instance.setCenter(marker1.getPosition());
        map.instance.setZoom(MAP_ZOOM);
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
}
Template.mapMain.onRendered(function() {
  Session.set("holdMenu", "map");
});

Template.mapMain.onCreated(function() {
  MarkersReady = this.subscribe('Markers');
});