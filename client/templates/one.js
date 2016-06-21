/**
 * Created by GaryC on 2016/04/07.
 */

//var graph = require('fbgraph');

/* Template.oneMine.helpers({
  treeArgs: {
    "collection": collection,
    "subscription": "TreeData",
    "parent": null,
    "select": null,
    "openAll": false,
    "mapping": {
      "text": "name",
      "aAttr": function(item) {}
    },
    "jstree": {
      "plugins": [
        "checkbox",
        "contextmenu",
        "dnd",
        "sort",
        "state"
      ]
    },
    "events": {
      "changed": function(e, item, data) {},
      "create": function(e, item, data) {},
      "rename": function(e, item, data) {},
      "delete": function(e, item, data) {},
      "copy": function(e, item, data) {},
      "move": function(e, item, data) {}
    }
  }
}); */

Template.oneMine.helpers({
  treeArgs: {
    collection: TreeData,
    subscription: 'TreeData',
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
  }
});

Template.oneMine.onRendered(function() {
  Session.set("holdMenu", "one");
  $('#my-datepicker').datepicker({
    format: "yyyy-mm-dd",
    daysOfWeekDisabled: "0,1,2,3",
    datesDisabled: ['2016-04-06', '2016-04-08']
  });
  $('#my-datepicker').on("changeDate", function() {
    $('#my_hidden_input').val(
      $('#my-datepicker').datepicker('getFormattedDate')
    );
  });

});

Template.oneOpen.onRendered(function() {
  Session.set("holdMenu", "one");
});



Template.oneMine.events({
    "click .js-facebook"() {
   /*   graph.setAccessToken(
      "EAAPK9Np9Hn0BAFQT0lELujJTqPuqHZAYP0nwKhCfj4z5WIsZCIzJUkI7GyB2LUDprJncSqzcxCQiNuijGJzQwCDJIsVm64B4DfT9W3OxnUccAMWZBQgg74WRFZAogBFWlcU6soAksW4p6PDJACz6i0hfiTnfGlgZD"
      );
      console.log('facebook clicked');
      var options = {
        timeout: 3000
        , pool: {maxSockets: Infinity}
        , headers: {connection: "keep-alive"}
      };

      graph
        .setOptions(options)
        .get("zuck", function (err, res) {
          console.log(res); // { id: '4', name: 'Mark Zuckerberg'... }
        }); */



    },
  'click #btn-user-data': function(e) {
    Meteor.call('getUserData', function(err, data) {
      $('#result').text(JSON.stringify(data, undefined, 4));
    });
  },
  'click #btn-user-data2': function(e) {
    Meteor.call('getFriendsData', function(err, data) {
      console.log(data.picture.data.url);
      $('#result2').text(JSON.stringify(data, undefined, 4));
      $('#result3').attr("src", data.picture.data.url);
    });
  },
});

