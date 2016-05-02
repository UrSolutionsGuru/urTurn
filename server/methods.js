/**
 * Created by GaryC on 2016/03/12.
 */
Meteor.methods({
  removeSlotsUrturns: function () {
    Slots.remove({});
    Urturns.remove({});
    Swops.remove({});
    Services.remove({});
    Subs.remove({});
    Orgs.remove({});
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