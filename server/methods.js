/**
 * Created by GaryC on 2016/03/12.
 */
function Facebook(accessToken) {
 // this.fb = Meteor.require('fbgraph');
  this.fb = require('fbgraph');
  this.accessToken = accessToken;
  this.fb.setAccessToken(this.accessToken);
  this.fb.setVersion("2.6");
  this.options = {
    timeout: 3000,
    pool: {maxSockets: Infinity},
    headers: {connection: "keep-alive"}
  }
  this.fb.setOptions(this.options);
};
Facebook.prototype.query = function(query, method) {
  var self = this;
  var method = (typeof method === 'undefined') ? 'get' : method;
  var data = Async.runSync(function(done) {
    self.fb[method](query, function(err, res) {
      done(null, res);
    });
  });
  return data.result;
};
Facebook.prototype.getUserData = function() {
  return this.query('me');
};
Facebook.prototype.getFriendsData = function() {
  return this.query('/me?fields=picture');
};




Meteor.methods({
  getUserData: function() {
   // var fb = new Facebook(Meteor.user().services.facebook.accessToken);
  //  var fb = new Facebook("EAAPK9Np9Hn0BAFQT0lELujJTqPuqHZAYP0nwKhCfj4z5WIsZCIzJUkI7GyB2LUDprJncSqzcxCQiNuijGJzQwCDJIsVm64B4DfT9W3OxnUccAMWZBQgg74WRFZAogBFWlcU6soAksW4p6PDJACz6i0hfiTnfGlgZD"
   // );
    var fb = new Facebook("EAAPK9Np9Hn0BABrUfWQiWUKM6rt2ofiBzPzeAc9FLn4ZB1fFaPZBrtQArZAbBZC0Nxd4zJ8Ui9AwUmAnTM8iIMtqOYU4bqXUCueEfvqKxCgX0zEliLYBV1TDifiZCpZCn6QLrsz8IBeqmMOZBQsPebu3zcRWh4cnScZD" );
    var data = fb.getUserData();
    return data;
  },
  getFriendsData: function() {
    //var fb = new Facebook(Meteor.user().services.facebook.accessToken);
    var fb = new Facebook("EAAPK9Np9Hn0BABrUfWQiWUKM6rt2ofiBzPzeAc9FLn4ZB1fFaPZBrtQArZAbBZC0Nxd4zJ8Ui9AwUmAnTM8iIMtqOYU4bqXUCueEfvqKxCgX0zEliLYBV1TDifiZCpZCn6QLrsz8IBeqmMOZBQsPebu3zcRWh4cnScZD" );

    var data = fb.getFriendsData();
    return data;
  },


  removeSlotsUrturns: function () {
    Slots.remove({});
    Urturns.remove({});
    Swops.remove({});
    Services.remove({});
    Subs.remove({});
    Orgs.remove({});
  },
  removeMarkers: function () {
    Markers.remove({});
    
  },
  sendEmail: function (to, from, subject, text) {
   //? check([to, from, subject, text], [String]);

    // Let other method calls from the same client start running,
    // without waiting for the email sending to complete.
  //?  this.unblock();

    Email.send({
      to: to,
      from: from,
      subject: subject,
      text: text
    });
  },

  addMoreSLots: function (){
    var addNumber = 24;
    var timestamp = (new Date()).getTime();

    var morning = Services.findOne({title: "Morning Services"})._id;
    var evening = Services.findOne({title: "Evening Services"})._id;

    var slotTitles = [
      {title: 'Morning Service', start: '2016-01-24T08:00:00+02:00'},
      {title: 'Morning Service', start: '2016-01-24T10:00:00+02:00'},
      {title: 'Evening Service', start: '2016-01-24T16:00:00+02:00'},
      {title: 'Evening Service', start: '2016-01-24T18:00:00+02:00'}
    ];

    _.each(slotTitles, function(list) {

      var startTime = moment(list.start).utc();
      var endTime = moment(startTime).add(1,'h');
      for (i = 0; i < addNumber; i++) {
        Slots.insert({
          title: list.title,
          type: 'Slot',
          start: startTime.format(),
          end: endTime.format(),
          theDate: startTime.format('YYYY-MM-DD'),
          backgroundColor: 'white',
          borderColor: 'black',
          textColor: 'grey',
          editable: false,
          Hidden: false,
          service: ((list.title == 'Morning Service') ? morning : evening),
          createdAt: new Date(timestamp)
        });
        timestamp += 1; // ensure unique timestamp.
        startTime.add(1,'w');
        endTime.add(1,'w');
      }
    });

  },
  resetData() {
    let testData = {
      Earth: {
        Europe: {
          Austria: {
            Vienna: null,
            Graz: null,
            Salzburg: null
          },
          Germany: {
            Berlin: null,
            Köln: null,
            Hamburg: null
          },
          Italy: {
            Roma: null,
            Venice: null,
            Trieste: null
          }
        } ,
        America: {
          "United States of America": {
            "New York": null,
            Philadelphia: null,
            "San Francisco": null
          }
        }
      }
    };

    function insertTestData(parent, data) {
      for (let name in data) {
        let id = TreeData.insert({name, parent});
        if (typeof data[name] === 'object') insertTestData(id, data[name]);
      }
    }

    TreeData.remove({});
    insertTestData(null, testData);
  },
  makeServiceTree(){

    ServiceTree.remove({});
    let id = ServiceTree.insert({name: 'BBC', parent: null});
    ServiceTree.insert({name: 'Morning Service', parent: id});
    ServiceTree.insert({name: 'Evening Service', parent: id});
    
  }

});