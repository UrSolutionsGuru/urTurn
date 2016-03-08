/**
 * Created by GaryC on 2016/03/08.
 */
Meteor.startup(function () {
  if (Urturns.find().count() === 0) {
    var data = [
    {
      title: 'Gary Carter',
        start: '2016-01-03T08:00:00',
      end: '2016-01-03T09:00:00'
    },
    {
      title: 'Fred Astair',
        start: '2016-01-03T08:00:00',
      end: '2016-01-03T09:00:00'
    },
    {
      title: 'Gavin Carter',
        start: '2016-01-03T10:00:00',
      end: '2016-01-03T11:00:00'
    },
    {
      title: 'Jack Astair',
        start: '2016-01-03T10:00:00',
      end: '2016-01-03T11:00:00'
    },
    {
      title: 'Kirsty Carter',
        start: '2016-01-03T16:00:00',
      end: '2016-01-03T17:00:00'
    },
    {
      title: 'Alice Astair',
        start: '2016-01-03T16:00:00',
      end: '2016-01-03T17:00:00'
    },
    {
      title: 'Tracey Carter',
        start: '2016-01-03T18:00:00',
      end: '2016-01-03T19:00:00'
    },
    {
      title: 'Bob Astair',
        start: '2016-01-03T18:00:00',
      end: '2016-01-03T19:00:00'
    }
    ];

    var dataSlots = [
      {
        id: 1,
        title: 'Morning Service',
        start: '2016-01-10T08:00:00',
        end: '2016-01-10T09:00:00',
        backgroundColor: 'white',
        borderColor: 'black',
        textColor: 'grey',
        editable: false
      },
      {
        id: 2,
        title: 'Morning Service',
        start: '2016-01-10T10:00:00',
        end: '2016-01-10T11:00:00',
        backgroundColor: 'white',
        borderColor: 'black',
        textColor: 'grey',
        editable: false
      },
      {
        id: 3,
        title: 'Evening Service',
        start: '2016-01-10T16:00:00',
        end: '2016-01-10T17:00:00',
        backgroundColor: 'white',
        borderColor: 'black',
        textColor: 'grey',
        editable: false
      },
      {
        id: 4,
        title: 'Evening Service',
        start: '2016-01-10T18:00:00',
        end: '2016-01-10T19:00:00',
        backgroundColor: 'white',
        borderColor: 'black',
        textColor: 'grey',
        editable: false
      }
    ];

    var timestamp = (new Date()).getTime();
    _.each(data, function(list) {
      Urturns.insert({title: list.title,
        start: list.start,
        end: list.end,
        createdAt: new Date(timestamp)});
      timestamp += 1; // ensure unique timestamp.
    });
    _.each(dataSlots, function(list) {
      Slots.insert({title: list.title,
        start: list.start,
        end: list.end,
        backgroundColor: list.backgroundColor,
        borderColor: list.borderColor,
        textColor: list.textColor,
        editable: list.editable,
        createdAt: new Date(timestamp)});
      timestamp += 1; // ensure unique timestamp.
    });
  };
});