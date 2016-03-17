/**
 * Created by GaryC on 2016/03/16.
 */
Template.body.helpers({
  menuOpen: function() {
    if (Session.set("holdMenu") == 'admin'){
      return '<span class="sr-only">(current)</span>';
    } else {return "";};

  }
});