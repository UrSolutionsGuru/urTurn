/**
 * Created by GaryC on 2016/03/10.
 */
Template.calendar.helpers({
    events: function () {
      var fc = $('.fc');
      return function (start, end, timezone, callback) {
        var eventHold = [];
        console.log('user id: '+ Meteor.userId());
        i = 0;
        Urturns.find().forEach(function (urturn) {
          var isEditable;
          var setColour;
          var isTitle;
          var facebook;
          if (Meteor.userId() && urturn.facebook == Meteor.userId()) {
            isEditable = true;
            setColour = "blue";
            isTitle = urturn.title + ((urturn.type == 'CommittedUrturn') ? " - COMMITTED" : "");
          } else {
            isEditable = false;
            setColour = "#7fff79";
            isTitle = urturn.title + ': ' + Slots.findOne(urturn.BackRef).title;
          };
          eventHold[i] = {
            id: urturn._id,
            title: isTitle,
            type: urturn.type,
            borderColor: ((urturn.type == "CommittedUrturn") ? "black" : ""),
            start: urturn.start,
            end: urturn.end,
            //className: ['glyphicon', 'glyphicon-ok'],
            editable: isEditable,
            durationEditable: false,
            color: setColour
          };
          console.log("Events ran");

          i++;
        });
        Slots.find().forEach(function (slot) {
          if (!slot.Hidden) {
            eventHold[i] = {
              id: slot._id,
              title: slot.title,
              type: 'Slot',
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
        Swops.find().forEach(function (swop) {

            eventHold[i] = {
              id: swop._id,
              title: swop.title,
              type: 'Swop',
              start: Slots.findOne({_id: swop.BackToRef}).start,
              end: Slots.findOne({_id: swop.BackToRef}).end,
              backgroundColor: 'red',
              borderColor: 'black',
              textColor: 'white',
              editable: false
            };
            // console.log(eventHold[i]);
            i++;

        });

        callback(eventHold);

      }
    },
    dayClick: function () {
      var fc = $('.fc');
      return function (date, jsEvent, view) {
        console.log('FRED day click');
        $(".fc-state-highlight").removeClass("fc-state-highlight");
        $('.fc').fullCalendar('gotoDate', date);
        $("td[data-date=" + date.format('YYYY-MM-DD') + "]").addClass("fc-state-highlight");
      }
    },
    eventMouseover: function (){
      return function (event,jsEvent, view) {
        /*console.log('jsEvent and View from eventMouseover');
        console.log(jsEvent);
        console.log(view.intervalUnit);
        console.log(event.title + " started " + event.start.format() + ' ' + event.id);
        */
      };
    },
    eventDragStart: function (){
      return function (event,jsEvent,ui, view) {
       /* console.log('jsEvent and View from eventDragStart');
        console.log(jsEvent);
        console.log(view.intervalUnit);
        console.log(event.title + " started " + event.start.format() + ' ' + event.id);
        */
      };
    },
    eventDragStop: function (){
      return function (event,jsEvent,ui, view) {
       /* console.log('jsEvent and View from eventDragStop');
        console.log(jsEvent);
        console.log(view.intervalUnit);
        console.log(event.title + " was dragged on " + event.start.format() + ' ' + event.id);
        */
      };
    },
    eventDrop: function () {
      var fc = $('.fc');
      return function (event, delta, revertFunc, jsEvent,ui, view) {
        console.log(event.title + " was dropped on " + event.start.format() + ' ' + event.id + 'Delta: '+delta);
        console.log(delta);
        var CanDrop = false;
        console.log('jsEvent and View');
        console.log(jsEvent);
        console.log(view.intervalUnit);
        Slots.find({start: event.start.format()}).forEach(function (slot) {
          CanDrop = true;
        });
        if (CanDrop) {

          console.log('The Event: '+event);
          moveUrturn(event.id, event.start.format(), event.end.format());

       /*   var BackRefHold;
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
                $('.fc').fullCalendar('renderEvent', slot);
              }
              ;
            });
          });


          Slots.find({start: event.start.format()}).forEach(function (slot) {
            console.log(slot.start + ' ' + slot._id);

            Urturns.update(event.id, {$set: {start: event.start.format()}});
            Urturns.update(event.id, {$set: {end: event.end.format()}});
            Urturns.update(event.id, {$set: {BackRef: slot._id}});
            Slots.update(slot._id, {$set: {Hidden: true}});
            $('.fc').fullCalendar('removeEvents', slot._id);
          }); */

          $('.fc').fullCalendar('gotoDate', event.start.format());
          $('.fc').fullCalendar('changeView', 'agendaDay')

        }
        else {
          revertFunc();
        }
        ;


      };
    },

    eventClick: function () {
      var fc = $('.fc');
      return function (calEvent, jsEvent, view) {

        Session.set("holdDefaultDate",calEvent.start.format());
        console.log('Default Date Set: '+Session.get("holdDefaultDate")+' ' +calEvent.start.format());
        //Router.go('/');
        //Router.go('/turn/'+ calEvent.id);
        if (calEvent.type == 'Slot'){
          var data2 = Slots.findOne({_id: calEvent.id});
        };

        if (calEvent.type == 'Swop'){
          var data2 = Swops.findOne({_id: calEvent.id});
         // $('.js-add-new-me').prop('disabled', true);
          // $('.js-add-new-me').add
        };

        if (calEvent.type == 'Urturn' || calEvent.type == 'CommittedUrturn'){
          var data2 = Urturns.findOne({_id: calEvent.id});
        };
        var data = {
          _id: calEvent.id
        };
        urTurnModalViewHold = Blaze.renderWithData(Template.urturnModal,data2,document.body);




        //$("#urturn_form").modal('show');
       // alert('Event: ' + calEvent.start.format() + calEvent.id);
        // alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
        // alert('View: ' + view.name);

        // change the border color just for fun
        // $(this).css('border-color', 'red');

      }
    },
    defaultDate: function () {
      console.log('Default Date: '+Session.get("holdDefaultDate"));
      return Session.get("holdDefaultDate");
    }

});

Template.calendar.events({
  'click .gotoDay': function () {
    $('.fc').fullCalendar( 'changeView', 'agendaDay' );
  },
  'click .gotoMonth':function() {
    $('.fc').fullCalendar( 'changeView', 'month' );
  }
});

Template.calendar.onRendered( function (){
  Tracker.autorun(function(){
    Urturns.find().fetch();

    console.log('THE NEW RERENDER');
    $('.fc').fullCalendar( 'refetchEvents' );
  });
});

$(document).ready(function() {
  Meteor.setTimeout(function(){
    $('.fc').fullCalendar( 'next' );
    $('.fc').fullCalendar( 'prev' );
    $('.fc').fullCalendar('option', 'height', '');
    console.log('delayed start ran');
  /*  $('.fc').fullCalendar('option', 'header', {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaDay' // basicWeek,basicDay,agendaWeek,
    });*/
  },200);
  $('[data-toggle="tooltip"]').tooltip();
});