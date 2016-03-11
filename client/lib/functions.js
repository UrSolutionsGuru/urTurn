/**
 * Created by GaryC on 2016/03/11.
 */
moveUrturn = function (event){
  var BackRefHold;

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


  Slots.find({start: event.start}).forEach(function (slot) {
    console.log(slot.start + ' ' + slot._id);

    Urturns.update(event.id, {$set: {start: event.start}});
    Urturns.update(event.id, {$set: {end: event.end}});
    Urturns.update(event.id, {$set: {BackRef: slot._id}});
    Slots.update(slot._id, {$set: {Hidden: true}});
    $('.fc').fullCalendar('removeEvents', slot._id);
  });


};
