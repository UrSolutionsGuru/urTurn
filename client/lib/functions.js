/**
 * Created by GaryC on 2016/03/11.
 */
moveUrturn = function (eventId, eventStart, eventEnd){
  var BackRefHold;

  var count = 0;
  Urturns.find({_id: eventId}).forEach(function (urturn) {
    BackRefHold = urturn.BackRef;
    console.log(BackRefHold + ' ' + urturn.BackRef);
  });
  Urturns.find({BackRef: BackRefHold}).forEach(function (turn) {
    count++;
  });
  console.log(count + ' BackRefHold: ' + BackRefHold);

  Urturns.find({_id: eventId}).forEach(function (urturn) {
    Slots.find({_id: urturn.BackRef}).forEach(function (slot) {
      if (count < 2) {
        Slots.update(slot._id, {$set: {Hidden: false}});
        $('.fc').fullCalendar('renderEvent', slot);
      }
      ;
    });
  });


  Slots.find({start: eventStart}).forEach(function (slot) {
    console.log(slot.start + ' ' + slot._id);

    Urturns.update(eventId, {$set: {start: eventStart}});
    Urturns.update(eventId, {$set: {end: eventEnd}});
    Urturns.update(eventId, {$set: {BackRef: slot._id}});
    Slots.update(slot._id, {$set: {Hidden: true}});
    $('.fc').fullCalendar('removeEvents', slot._id);
  });


};


