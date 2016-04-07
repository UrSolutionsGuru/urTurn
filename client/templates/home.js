/**
 * Created by GaryC on 2016/04/07.
 */

Template.homeMine.onRendered(function() {
  Session.set("holdMenu", "home");
});

Template.homeOpen.onRendered(function() {
  Session.set("holdMenu", "home");
});