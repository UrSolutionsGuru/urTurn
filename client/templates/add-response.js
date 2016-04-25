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
  myServices: function() {
    let serviceQuery = Session.get("ServiceQuery");
   // console.log(serviceQuery);
    /*let one = /m/;
    let two = /o/i;
    let exp = new RegExp(one.source + two.source); */
    let one = 'ck b';
    let two = '';
    let exp = one + two;
   // console.log(exp);
    //Services.createIndex({title: "text"});
   // let fred = { $regex: 'boa', $regex: 'bla', $options: 'i' };
   // console.log(fred);
    fred = {$and: []};
    //fred = { $regex: 'boa'};
    fred['$and'].push({title: {$regex: serviceQuery, $options: 'i' }});
   // fred['$and'].push({title: {$regex: 'bla', $options: 'i' }});

    console.log(fred);
    return Services.find(fred);
    return Services.find({title: { $in: [/boa/i, /bla/i]}});
   return Services.find({title: { $regex: serviceQuery}});
    return Services.find({title: { $regex: '(?i)' + serviceQuery}});
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
    let serviceQuery = event.target.serviceQueryText.value;
    console.log(serviceQuery);
    return false;// stop the form submit from reloading the page
  }
});

Template.addResponse.onRendered(function() {
  Session.set("holdMenu", "addResponse");
  //Session.set("ServiceQuery", "mo");

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