/**
 * Created by GaryC on 2016/04/21.
 */

 //var serviceQuery = 'mo';

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
  myServices: function() {
    if (orgsSubscribe.ready()) {
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

Template.addResponse.events ({
  "submit .js-addResponse-query-form":function(event) {
    Session.set("ServiceQuery", event.target.serviceQueryText.value);

    //$('#testtesttest').submit();

    return false;// stop the form submit from reloading the page
  },
  "submit .js-service-select-query-form":function(event) {
    console.log("HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHit");
    //console.log(event);
    var selection = event.target.select_from2.value;
    //console.log(selection);
    console.log(Services.findOne({_id: selection}).title);
    return false;// stop the form submit from reloading the page
  },
  "change #select_from2":function(event) {
    console.log("STTTTTTTTTTTTTTTTTTTTTTTTTTSit");
    console.log(event);
    $('#testtesttest').submit();
  },
  "keyup #serviceQueryText":function(event) {

    $('#keyByKey').submit();
  }


});



Template.addResponse.onRendered(function() {
  Session.set("holdMenu", "addResponse");
  Session.set("ServiceQuery", "black board");
  //Session.set("OrgQuery", "dac systems");

  Meteor.call("makeServiceTree");

  //serviceQuery = 'mo';

  $('#addResponse-datepicker .input-group.date').datepicker({
    format: "yyyy-mm-dd",
    orientation: "auto",
    daysOfWeekDisabled: "0,1,2,3",
    autoclose: true,
    datesDisabled: ['2016-04-06', '2016-04-08']
  });
  /* $('#addResponse-datepicker').on("changeDate", function() {
    $('#addResponse_hidden_input').val(
      $('#addResponse-datepicker').datepicker('getFormattedDate')
    );
  }); */

});

orgsSubscribe = Meteor.subscribe('Orgs');