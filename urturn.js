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

      $('#FredCalendar').fullCalendar( 'next' );
      $('#FredCalendar').fullCalendar( 'prev' );

    }
  });




  $(document).ready(function() {

    $('#FredCalendar').fullCalendar({
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaDay' // basicWeek,basicDay,agendaWeek,
      },
      defaultDate: '2016-01-12',
      editable: true,
      eventDurationEditable: false,
      eventLimit: 6, //was true, // allow "more" link when too many events


      eventSources: [{
      events: function(start, end, timezone, callback) {
        var eventHold = [];
        i=0;
        Urturns.find().forEach(function(urturn) {
          var isEditable;
          var setColour;
          var isTitle;
          if (urturn.user){
            isEditable = true;
            setColour = "blue";
            isTitle = urturn.title;
          } else {
            isEditable = false;
            setColour = "#7fff79";
            isTitle = urturn.title + ':' + Slots.findOne(urturn.BackRef).title;
          };
          eventHold[i] = {
            id: urturn._id,
            title: isTitle ,
            start: urturn.start,
            end: urturn.end,
            editable: isEditable,
            color: setColour
          };
         console.log("Events ran");

          i++;
        });
        Slots.find().forEach(function(slot) {
          if(!slot.Hidden) {
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
          }
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



      }
        //,
      }],
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

        console.log(event.title + " was dropped on " + event.start.format() + ' ' + event.id);
        var CanDrop = false;
        Slots.find({start: event.start.format()}).forEach(function(slot) {
          CanDrop = true;
        });
        if (CanDrop) {

          var BackRefHold;
          console.log('source: ' + event.source);
          var count = 0;
          Urturns.find({_id: event.id}).forEach(function (urturn) {
            BackRefHold = urturn.BackRef;
            console.log(BackRefHold + ' ' + urturn.BackRef);
          });
          Urturns.find({BackRef: BackRefHold}).forEach(function (turn) {
            count++;
          });
          console.log(count + ' BackRefHold: ' + BackRefHold);

          Urturns.find({_id: event.id}).forEach(function (urturn) {
            Slots.find({_id: urturn.BackRef}).forEach(function (slot) {
              if (count < 2) {
                Slots.update(slot._id, {$set: {Hidden: false}});
                $('#FredCalendar').fullCalendar('renderEvent', slot);
              };
            });
          });


          Slots.find({start: event.start.format()}).forEach(function (slot) {
            console.log(slot.start + ' ' + slot._id);

            Urturns.update(event.id, {$set: {start: event.start.format() }});
            Urturns.update(event.id, {$set: {end: event.end.format() }});
            Urturns.update(event.id, {$set: {BackRef: slot._id}});
            Slots.update(slot._id, {$set: {Hidden: true}});
            $('#FredCalendar').fullCalendar('removeEvents', slot._id);
          });

          $('#FredCalendar').fullCalendar( 'gotoDate', event.start.format() );
          $('#FredCalendar').fullCalendar( 'changeView', 'agendaDay' )
        }
        else {
          revertFunc();
        };
        //alert('About to refresh');

        //  var slot = Slots.find({start: event.start.format()});
      //  var slot = Slots.find();
       // console.log(slot[0].start.format());
        /* if (!confirm("Are you sure about this change?")) {
          revertFunc();
        }*/
       // $('#FredCalendar').fullCalendar( 'removeEvents' ,slot.id);

      },
      eventClick: function(calEvent, jsEvent, view) {

        $("#urturn_form").modal('show');
        //alert('Event: ' + calEvent.title);
       // alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
        // alert('View: ' + view.name);

        // change the border color just for fun
        // $(this).css('border-color', 'red');

      }


    /*,
    dayRender: function(date, cell){
      $(cell).addClass('fc-state-highlight');
    }*/

      });

      Meteor.setTimeout(function(){
        $('#FredCalendar').fullCalendar( 'next' );
        $('#FredCalendar').fullCalendar( 'prev' );
      },200);



    }); //end document ready



} // end is client

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
