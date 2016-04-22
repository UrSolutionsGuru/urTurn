/**
 * Created by GaryC on 2016/04/21.
 */

Template.addResponse.helpers({
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

Template.addResponse.onRendered(function() {
  Session.set("holdMenu", "addResponse");
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