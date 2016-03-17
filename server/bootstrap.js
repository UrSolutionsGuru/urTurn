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
      },
      {
        id: 1,
        title: 'Morning Service',
        start: '2016-01-17T08:00:00',
        end: '2016-01-17T09:00:00',
        backgroundColor: 'white',
        borderColor: 'black',
        textColor: 'grey',
        editable: false
      },
      {
        id: 2,
        title: 'Morning Service',
        start: '2016-01-17T10:00:00',
        end: '2016-01-17T11:00:00',
        backgroundColor: 'white',
        borderColor: 'black',
        textColor: 'grey',
        editable: false
      },
      {
        id: 3,
        title: 'Evening Service',
        start: '2016-01-17T16:00:00',
        end: '2016-01-17T17:00:00',
        backgroundColor: 'white',
        borderColor: 'black',
        textColor: 'grey',
        editable: false
      },
      {
        id: 4,
        title: 'Evening Service',
        start: '2016-01-17T18:00:00',
        end: '2016-01-17T19:00:00',
        backgroundColor: 'white',
        borderColor: 'black',
        textColor: 'grey',
        editable: false
      }
    ];

    var dataTurnSlots = [
      {
        title: 'Morning Service',
        start: '2016-01-10T08:00:00',
        end: '2016-01-10T09:00:00',
        backgroundColor: 'white',
        borderColor: 'black',
        textColor: 'grey',
        editable: false,
        urturn: [{
          title: 'Gary Carter',
          facebook: "csDBRp7CZK9St486r",
          user: true
        }]
      },
      {
        title: 'Morning Service',
        start: '2016-01-10T10:00:00',
        end: '2016-01-10T11:00:00',
        backgroundColor: 'white',
        borderColor: 'black',
        textColor: 'grey',
        editable: false,
        urturn: [{
          title: 'Fred Astair',
          user: false
        },
        {
          title: 'Robbie Carter',
          facebook: "zCWcP8DPe6dqQ2t6E",
          user: false
        }]
      },
      {
        title: 'Evening Service',
        start: '2016-01-10T16:00:00',
        end: '2016-01-10T17:00:00',
        backgroundColor: 'white',
        borderColor: 'black',
        textColor: 'grey',
        editable: false,
        urturn: []
      },
      {
        title: 'Evening Service',
        start: '2016-01-10T18:00:00',
        end: '2016-01-10T19:00:00',
        backgroundColor: 'white',
        borderColor: 'black',
        textColor: 'grey',
        editable: false,
        urturn: [{
          title: 'Jack Astair',
          user: false
        },
          {
            title: 'Kirsty Carter',
            user: false
          }]
      },
      {
        title: 'Morning Service',
        start: '2016-01-17T08:00:00',
        end: '2016-01-17T09:00:00',
        backgroundColor: 'white',
        borderColor: 'black',
        textColor: 'grey',
        editable: false,
        urturn: [{
          title: 'Sir Astair',
          user: false
        }]
      },
      {
        title: 'Morning Service',
        start: '2016-01-17T10:00:00',
        end: '2016-01-17T11:00:00',
        backgroundColor: 'white',
        borderColor: 'black',
        textColor: 'grey',
        editable: false,
        urturn: []
      },
      {
        title: 'Evening Service',
        start: '2016-01-17T16:00:00',
        end: '2016-01-17T17:00:00',
        backgroundColor: 'white',
        borderColor: 'black',
        textColor: 'grey',
        editable: false,
        urturn: []
      },
      {
        title: 'Evening Service',
        start: '2016-01-17T18:00:00',
        end: '2016-01-17T19:00:00',
        backgroundColor: 'white',
        borderColor: 'black',
        textColor: 'grey',
        editable: false,
        urturn: [{
          title: 'Robbie Astair',
          user: false
        }]
      }
    ];

    var timestamp = (new Date()).getTime();

    var morning = Services.insert({
      title: "Morning Services"
    });
    timestamp += 1;
    var evening = Services.insert({
      title: "Evening Services"
    });
    timestamp += 1;

    Subs.insert ({
      title: "Gary Morning",
      service: morning,
      facebook: "csDBRp7CZK9St486r"
    });
    Subs.insert ({
      title: "Gary Evening",
      service: evening,
      facebook: "csDBRp7CZK9St486r"
    });
    Subs.insert ({
      title: "Robbie Morning",
      service: morning,
      facebook: "zCWcP8DPe6dqQ2t6E"
    });

    _.each(dataTurnSlots, function(list) {
      var slot_id = Slots.insert({title: list.title,
        type: 'Slot',
        start: moment(list.start).format(),
        end: moment(list.end).format(),
        backgroundColor: list.backgroundColor,
        borderColor: list.borderColor,
        textColor: list.textColor,
        editable: list.editable,
        Hidden: false,
        service: ((list.title == 'Evening Service')? evening : morning),
        createdAt: new Date(timestamp)
      });
      _.each(list.urturn, function(aturn) {
          Urturns.insert({title: aturn.title,
            type: 'Urturn',
            user: aturn.user,
            start: moment(list.start).format(),
            end: moment(list.end).format(),
            facebook: aturn.facebook,
            BackRef : slot_id,
            createdAt: new Date(timestamp)
          });
          Slots.update(slot_id, {$set: {Hidden: true}});
          timestamp += 1; // ensure unique timestamp.
      });

    });


    /*
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
    }); */
  };
});