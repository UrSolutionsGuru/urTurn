/**
 * Created by GaryC on 2016/03/10.
 */
Router.route('/', function () {
  this.render('calendar');
});

Router.route('/admin', function () {
  this.render('admin');
});

Router.route('/test', function () {
  this.render('test');
});

Router.route('/turn/:_id', function () {
  this.render('urturnForm',{
    data: function(){
      return Urturns.findOne({_id: this.params._id});
    }
  });
});