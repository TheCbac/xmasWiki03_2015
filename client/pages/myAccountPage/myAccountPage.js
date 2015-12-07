Template.myAccountTemplate.helpers({
	userIsAdmin: function(){
        if ( Meteor.user().profile.roles.indexOf("admin") >= 0 ){
            return true;
        }
        return false;
    }
});