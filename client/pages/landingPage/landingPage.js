Session.setDefault("error", "");

Template.landingPage.helpers({
	goToGroup: function(){
		Router.go("/cheneyClan");
	},

	errors: function(){
		var errorId = Session.get("error");
		return (errorId == "badPassword");
	}
});

Template.landingPage.events({
	'click #signInButton': function(event, template){
		var userEmail = document.getElementById("email").value;
		var userPassword = document.getElementById("password").value;
		Meteor.loginWithPassword(userEmail, userPassword, passwordCallBack);
		event.preventDefault();
	}
});

passwordCallBack = function(error,id){
	if (error){
		if(error.error == 403){
			Session.set("error","badPassword");
		}

	}
	
	else{
		Session.set("error", "");
	}
};