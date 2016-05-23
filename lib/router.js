/**
 * Created by GaryC on 2016/03/10.
 */
Router.route('/', function () {
  if (Meteor.userId()) {
    this.render('homeMine');
  } else {
    this.render('homeOpen');
  }
});

Router.route('/addResponse', function () {
  this.render('addResponse');
});

Router.route('/one', function () {
  if (Meteor.userId()) {
    this.render('oneMine');
  } else {
    this.render('oneOpen');
  }
});

Router.route('/calendar', function () {
  this.render('calendar');
});

Router.route('/admin', function () {
  this.render('admin');
});

Router.route('/test', function () {
  this.render('test');
});

Router.route('/me', function () {
  this.render('me');
});

Router.route('/acceptSwop', function () {
  this.render('acceptSwop');
});

Router.route('/turn/:_id', function () {
  this.render('urturnForm',{
    data: function(){
      return Urturns.findOne({_id: this.params._id});
    }
  });
});

Router.route('/map', function () {
  this.render('mapMain');
});