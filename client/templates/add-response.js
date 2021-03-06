/**
 * Created by GaryC on 2016/04/21.
 */

 //var serviceQuery = 'mo';

var ServiceChangedReactiveVar = new ReactiveVar(1);

Template.addResponse.helpers({
  treeArgs: {
    collection: ServiceTree,
    subscription: 'ServiceTree',
    mapping: {
      text: 'name'

    },
    events: {
      changed: function (e, item) {
        console.log("Item " + item + "selected.");
      }
    },
    jstree: {

      checkbox: {whole_node: false, keep_selected_style: false, three_state: false},
      plugins: [
        "checkbox",
        //"contextmenu",
        //"dnd",
        // "sort",
        "state"

      ],
      core: {multiple: false}
    }
  },
  pullDownCount: function(){
    return Session.get("holdPullDownCount");
  },
  slotPullDownCount: function(){
    return Session.get("holdSlotPullDownCount");
  },
  mySlots: function() {
    //Session.set("holdServiceDate", moment(ev.date) );
    Session.set("holdSlotPullDownCount", Slots.find({service: Session.get("holdService"), theDate: Session.get("holdServiceDate")}).count());
    return Slots.find({service: Session.get("holdService"), theDate: Session.get("holdServiceDate")});
    return Slots.find({service: Session.get("holdService")});
    
  },
  myServices: function() {
    //ServiceChangedReactiveVar.set(ServiceChangedReactiveVar.get() + 1);
    if (Template.instance().subscriptionsReady()) {
      let workForm = Session.get("ServiceQuery");

     // first extract anything to do with Org:
      let orgTextStart = 0;
      let orgTextEnd = 0;
      let orgReg = /\bOrg:\(/ig;
      let restBracket= /.*\)/ig;
      let orgHold = 'string';
      //console.log(orgReg);
      if (orgReg.test(workForm)) {
        restBracket.lastIndex = orgReg.lastIndex;
        orgTextStart = restBracket.lastIndex - 5;
        orgHold = restBracket.exec(workForm);
        orgTextEnd = restBracket.lastIndex;
        //console.log(orgHold);
      }
      Session.set("OrgQuery", orgHold);

      //console.log(orgTextStart+":"+orgTextEnd);

      var res = workForm.substr(0, orgTextStart);
      var res2 = workForm.substr(orgTextEnd, workForm.length);
      var res3 = res.concat(" ", res2);
      //console.log(res3);
     // Session.set("ServiceQuery", res3);

      //Now extract Ser:( as the service string works with all this and everything outside any backets
      let serTextStart = 0;
      let serTextEnd = 0;
      let serReg = /\bSer:\(/ig;
      let serHold = 'string';
      //console.log(serReg);
      if (serReg.test(res3)) {
        //restBracket.lastIndex = orgReg.lastIndex;
        serTextStart = serReg.lastIndex - 5;
       // orgHold = restBracket.exec(workForm);
        serTextEnd = serReg.lastIndex;
        //console.log(orgHold);
      }
     // Session.set("OrgQuery", orgHold);

      //console.log(serTextStart+":"+serTextEnd);

      var sres = res3.substr(0, serTextStart);
      var sres2 = res3.substr(serTextEnd, res3.length);
      var sres3 = sres.concat(" ", sres2);
      //console.log(sres3);

      let serviceQuery = sres3;

      //Now parse for Org: stuff
     // let serviceQuery = Session.get("ServiceQuery");
      let orgQuery = Session.get("OrgQuery");
      let pq = /\b\w*\b/ig;
      let orgArray = [];
      let fred = {$and: []};
      let textHold = [];
      let textCount = 0;
      let moreText = true;
      while (moreText) {
        textHold = pq.exec(orgQuery);
        //console.log(textCount);
        //console.log(textHold);
        if (_.isEmpty(textHold)) {
          //console.log('ORG in side textHold empty');
          moreText = false;
        } else {
          if (_.isEmpty(textHold[0])) {
            //console.log('ORGin side textHold[0] empty');
            moreText = false;
          } else {
            //console.log('ORG in side');
            fred['$and'].push({title: {$regex: textHold[0], $options: 'i'}});
            pq.lastIndex++;
            textCount++;
          }
        }
      }
      //console.log(fred);
      if (textCount == 0) {
        //orgArray = ['yezN93Sp6ktGM4x34','HdTRTrGqvHe9LHYsn'];
        var j = 0;
        Orgs.find({}).forEach(function (org){
          orgArray[j] = org._id;
          j++;
        });
      } else {
        var j = 0;
        Orgs.find(fred).forEach(function (org){
          orgArray[j] = org._id;
          j++;
        });
      }                                              //need to catour for words that dont match and an emprty array

      //console.log(orgArray);


      //orgArray = ['yezN93Sp6ktGM4x34','HdTRTrGqvHe9LHYsn'];

      fred = {$and: []};
      textHold = [];
      textCount = 0;
      moreText = true;
      while (moreText) {
        textHold = pq.exec(serviceQuery);
        //console.log(textCount);
        //console.log(textHold);
        if (_.isEmpty(textHold)) {
          //console.log('in side textHold empty');
          moreText = false;
        } else {
          if (_.isEmpty(textHold[0])) {
            //console.log('in side textHold[0] empty');
            moreText = false;
          } else {
            //console.log('in side');
            fred['$and'].push({title: {$regex: textHold[0], $options: 'i'}});
            pq.lastIndex++;
            textCount++;
          }
        }
      }
      //ServiceChangedReactiveVar.set(ServiceChangedReactiveVar.get() + 1); //force form submit thru autorun
      if (_.isEmpty(orgArray)) {
        if (textCount == 0) {
          Session.set("holdPullDownCount", Services.find({}).count());
          return Services.find({});
        }
        //fred['$and'].push({org: {$in: orgArray}});
        //console.log(fred);
        Session.set("holdPullDownCount", Services.find(fred).count());
        return Services.find(fred);
      } else {
        if (textCount == 0) {
          Session.set("holdPullDownCount", Services.find({org: {$in: orgArray}}).count());
          return Services.find({org: {$in: orgArray}});
        }
        fred['$and'].push({org: {$in: orgArray}});
        //console.log(fred);
        Session.set("holdPullDownCount", Services.find(fred).count());
        return Services.find(fred);
      }
    } /* else {
      return {one: null};
    } */

   // let one = pq.exec(serviceQuery);
   // console.log("one" + one);
   // pq.lastIndex++;
   // let two = pq.exec(serviceQuery);
   // console.log(two);

    //let n = serviceQuery.search(/\s/);
    //console.log(n);
    //let one = serviceQuery.substr(0,n);
    //let two = 'boa';


   // console.log(exp);
    //Services.createIndex({title: "text"});
   // let fred = { $regex: 'boa', $regex: 'bla', $options: 'i' };
   // console.log(fred);

    //fred = { $regex: 'boa'};
   // fred['$and'].push({title: {$regex: one[0], $options: 'i' }});
   // fred['$and'].push({title: {$regex: two[0], $options: 'i' }});


    //return Services.find({title: { $in: [/boa/i, /bla/i]}});
  // return Services.find({title: { $regex: serviceQuery}});
   // return Services.find({title: { $regex: '(?i)' + serviceQuery}});
    //return Services.find({title: { $regex: serviceQuery, $options: 'i' }});
  },
  serviceQuery: function() {
    return Session.get("ServiceQuery");
  }
});

Template.myOrgService.helpers({
  org: function() {
    return Orgs.findOne({_id: Services.findOne({_id: this._id}).org}).title;
  }
});

Template.myOrgServiceSlot.helpers({
  serv: function() {
    return Services.findOne({_id: Slots.findOne({_id: this._id}).service}).title;
  }
});

Template.addResponse.events ({
  "submit .js-addResponse-query-form":function(event) {
    Session.set("ServiceQuery", event.target.serviceQueryText.value);

    //$('#testtesttest').submit();

    return false;// stop the form submit from reloading the page
  },
  "submit .js-service-select-query-form":function(event) {
    console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHit");
    //console.log(event);

    //console.log(selection.type);
    if (Template.instance().subscriptionsReady()) {
      var selection = event.target.selectfrom2.value;
      Session.set("holdService", selection );
      console.log(selection);
      console.log(Services.findOne({_id: selection}).title);
      
      let slotStart = [];
      Slots.find({service: selection}).forEach(function(slot){
        slotStart.push(slot.start);
      });

      //console.log(slotStart);
      slotStart.sort();
     // console.log(slotStart);
      slotStart.sort(function(a,b){var first = moment(a);var second = moment(b);return first.diff(second);});
     // console.log(slotStart);
      let slotDate = [];
      $.each(slotStart, function(i, el){slotDate[i] = moment(el).format('YYYY-MM-DD')});
      console.log(slotDate);
      slotDate = uniq_fast(slotDate);
      console.log(slotDate);
      let notAllowedDate = [];
      let walker = moment(slotDate[0]);
      let endDate = moment(slotDate[slotDate.length - 1]);
      let protRunAway = 1;
      let i = 0;
      while(!walker.isSame(endDate)){
        if (walker.isSame(moment(slotDate[i]))) {i++} else{notAllowedDate.push(walker.format('YYYY-MM-DD'))};
        walker.add(1,'d');

        protRunAway++;
        if (protRunAway > 800) {console.log('aborting while'); break;}
      };
      console.log(notAllowedDate);

      console.log(moment(slotStart[0]).format('YYYY-MM-DD'));
      console.log(moment(slotStart[slotStart.length - 1]).format('YYYY-MM-DD'));

      let dateJson = {
        format: "yyyy-mm-dd",
        orientation: "auto",
        //daysOfWeekDisabled: "0,1,2,3",
        autoclose: true,
        startDate: "2014-01-24",
        endDate: "2014-01-24",
        datesDisabled: ['2016-04-06', '2016-04-08']
      }

     /* if (selection === '6eWqY5yMYDoagaa7p') {
        dateJson['daysOfWeekDisabled'] ="0,6";
      } else {
        dateJson['daysOfWeekDisabled'] = "0,1,2,3";
      };*/

      dateJson['startDate'] = moment(slotStart[0]).format('YYYY-MM-DD');
      dateJson['endDate'] = moment(slotStart[slotStart.length - 1]).format('YYYY-MM-DD');
      dateJson['datesDisabled'] = notAllowedDate;

      console.log(dateJson);

      $('#addResponse-datepicker .input-group.date').datepicker('remove');
      $('#addResponse-datepicker .input-group.date').datepicker(dateJson);
      $('#addResponse-datepicker .input-group.date').datepicker().on('changeDate', function(ev) {
        console.log(moment(ev.date).format('YYYY-MM-DD'));
        Session.set("holdServiceDate", moment(ev.date).format('YYYY-MM-DD') );
        console.log(Session.get("holdServiceDate") );
      });
    }
    return false;// stop the form submit from reloading the page
  },
  "DOMSubtreeModified .select-from3":function(event) { // DOMContentLoaded does not fire
    console.log("TTTTTmodified");
    //console.log(event);
    if (Session.get("holdPullDownCount") !== Session.get("OLDholdPullDownCount")) {
      Session.set("OLDholdPullDownCount", Session.get("holdPullDownCount"));
      Meteor.setTimeout(function(){
        $('#testtesttest').submit();
      },200);
    }

  },
  "change .select-from3":function(event) {
    console.log("TTTchange");
   // console.log(event);
    $('#testtesttest').submit();

  },
  "keyup #serviceQueryText":function(event) {

    $('#keyByKey').submit();
    //$('#testtesttest').submit();
  },
  "click #js-ok-button":function(event){
    console.log($('#serviceQueryText').val());
    $("#grc-one").text($('#serviceQueryText').val());
    $("#grc-two").text($('#selectfrom2').val());
    $("#grc-three").text($('#js-date-picker').val());
    $("#grc-four").text($('#selectfrom4').val());
  }
  /*,
  "click #testSub13":function(event) {

    ServiceChangedReactiveVar.set(ServiceChangedReactiveVar.get() + 1);
    //$('#testtesttest').submit();
  } */


});



Template.addResponse.onRendered(function() {
  Session.set("holdMenu", "addResponse");
  Session.set("ServiceQuery", "");
  //Session.set("OrgQuery", "dac systems");

  Meteor.call("makeServiceTree");

  //serviceQuery = 'mo';

  $('#addResponse-datepicker .input-group.date').datepicker({
    format: "yyyy-mm-dd",
    orientation: "auto",
    //daysOfWeekDisabled: "0,1,2,3",
    autoclose: true
   // , datesDisabled: ['2016-04-06', '2016-04-08']
  });
  /* $('#addResponse-datepicker').on("changeDate", function() {
    $('#addResponse_hidden_input').val(
      $('#addResponse-datepicker').datepicker('getFormattedDate')
    );
  }); */



});

Template.addResponse.onCreated(function(){
  this.subscribe('Orgs');
  this.subscribe('services');



/*  Tracker.autorun(function () {

    let x = ServiceChangedReactiveVar.get();
   // if (Template.instance().subscriptionsReady()) {
      $('#testtesttest').submit();
   // }
    console.log(x);

  });
  */
});

$(document).ready(function() {

});

//orgsSubscribe = Meteor.subscribe('Orgs');
//servicesSubscribe = Meteor.subscribe('services');

function uniq_fast(a) {
  var seen = {};
  var out = [];
  var len = a.length;
  var j = 0;
  for(var i = 0; i < len; i++) {
    var item = a[i];
    if(seen[item] !== 1) {
      seen[item] = 1;
      out[j++] = item;
    }
  }
  return out;
}