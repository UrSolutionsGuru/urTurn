/**
 * Created by GaryC on 2016/03/12.
 */
Meteor.methods({
  removeSlotsUrturns: function () {
    Slots.remove({});
    Urturns.remove({});
    Swops.remove({});
  },
  addMoreSLots: function (){ //cant work here server does not know about fullcalendar??
    //var calendar = $('.fc').fullCalendar('getCalendar');

   //var startTime = moment('2016-01-24T08:00:00');
  // var addNumber = 24;
    //var addTwoHours = moment(startTime);
   // addTwoHours.add(1,'hours');
    var addNumber = 24;
   // console.log (startTime.format());
   // console.log (addTwoHours.format());
  // console.log (startTime);

    var timestamp = (new Date()).getTime();

    var slotTitles = [
      {title: 'Morning Service', start: '2016-01-24T08:00:00'},
      {title: 'Morning Service', start: '2016-01-24T10:00:00'},
      {title: 'Evening Service', start: '2016-01-24T16:00:00'},
      {title: 'Evening Service', start: '2016-01-24T18:00:00'}
    ];

    _.each(slotTitles, function(list) {

      var startTime = moment(list.start);
      var endTime = moment(startTime).add(1,'h');
      for (i = 0; i < addNumber; i++) {
        Slots.insert({
          title: list.title,
          type: 'Slot',
          start: startTime.format(),
          end: endTime.format(),
          backgroundColor: 'white',
          borderColor: 'black',
          textColor: 'grey',
          editable: false,
          Hidden: false,
          createdAt: new Date(timestamp)
        });
        timestamp += 1; // ensure unique timestamp.
        startTime.add(1,'w');
        endTime.add(1,'w');
      }
    });

  }
});