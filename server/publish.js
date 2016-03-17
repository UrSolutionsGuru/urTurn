/**
 * Created by GaryC on 2016/03/17.
 */
Meteor.publish('publicLists', function() {
  return Lists.find({userId: {$exists: false}});
});