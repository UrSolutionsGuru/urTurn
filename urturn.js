if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
   /* 'options': function() {

      return {
        defaultView: 'month'
      };
    }, */
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({

    'click #theButton': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);


      $('#FredCalendar').fullCalendar('renderEvent',

        {
          title: 'SmithYYYY Face',
          start: '2016-01-04'
        }, true

      );


    }
  });




  $(document).ready(function() {



    $('#FredCalendar').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,basicWeek,basicDay,agendaWeek,agendaDay'
      },
      defaultDate: '2016-01-12',
      editable: true,
      eventLimit: 6, //was true, // allow "more" link when too many events
      events: function(start, end, timezone, callback) {
        var eventHold = [];
        i=0;
        Urturns.find().forEach(function(urturn) {
          eventHold[i] = {
            id: urturn._id,
            title: urturn.title,
            start: urturn.start,
            end: urturn.end
          };
         // console.log(eventHold[i]);

          i++;
        });
        Slots.find().forEach(function(slot) {
          eventHold[i] = {
            id: slot._id,
            title: slot.title,
            start: slot.start,
            end: slot.end,
            backgroundColor: slot.backgroundColor,
            borderColor: slot.borderColor,
            textColor: slot.textColor,
            editable: slot.editable
          };
          // console.log(eventHold[i]);

          i++;
        });
       // console.log(eventHold);
        /* var garyc = 'Gary Carter';
        var eventHold2 = [];
        eventHold2[0] = {
          title: garyc,
          start: '2016-01-03T08:00:00',
          end: '2016-01-03T09:00:00'
        };
        eventHold2[1] = {
          title: 'Gary Carter',
          start: '2016-01-04T08:00:00',
          end: '2016-01-04T09:00:00'
        };
        console.log(eventHold2); */
        callback(eventHold);


       /* callback([
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
          },
          {
            title: 'Click for Google',
            url: 'http://google.com/',
            start: '2016-01-28'
          }
        ]); */
      },
      dayClick: function(date, jsEvent, view) {
        //alert('Clicked on: ' + date.format());

        //alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY + ' ' + jsEvent.target.classList);

        //alert('Current view: ' + view.name);

        // change the day's background color just for fun
        //$(this).css('background-color', 'red');
        //$(this).addClass('fc-state-highlight');
       // $(jsEvent.target).addClass("fc-state-highlight");
        $(".fc-state-highlight").removeClass("fc-state-highlight");
        $('#FredCalendar').fullCalendar( 'gotoDate', date );
        $("td[data-date="+date.format('YYYY-MM-DD')+"]").addClass("fc-state-highlight");
       // $('#FredCalendar').fullCalendar('render');

      },
      eventDrop: function(event, delta, revertFunc) {

       console.log(event.title + " was dropped on " + event.start.format() + ' '+ event.id);

       console.log('putback: '+ event.start);

        Slots.find({start: event.start.format()}).forEach(function(slot) {
          console.log(slot.start + ' '+ slot._id);
          Urturns.update(event.id,{$set: {BackRef: slot._id}});
         $('#FredCalendar').fullCalendar( 'removeEvents' ,slot._id);
        });

        //  var slot = Slots.find({start: event.start.format()});
      //  var slot = Slots.find();
       // console.log(slot[0].start.format());
        /* if (!confirm("Are you sure about this change?")) {
          revertFunc();
        }*/
       // $('#FredCalendar').fullCalendar( 'removeEvents' ,slot.id);

      }
      /*,
      dayRender: function(date, cell){
        $(cell).addClass('fc-state-highlight');
      }*/

      });




    });



}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
