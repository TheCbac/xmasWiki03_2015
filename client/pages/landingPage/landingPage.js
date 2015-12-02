Session.setDefault("error", "");

Template.landingPage.helpers({
	goToGroup: function(){
		Router.go("/cheneyClan");
	},

	errors: function(){
		var errorId = Session.get("error");
		return errorId;
	}
});

Template.landingPage.events({
	'click #signInButton': function(event, template){
		Session.set('error',"");
		var userEmail = document.getElementById("email").value;
		var userPassword = document.getElementById("password").value;
		Meteor.loginWithPassword(userEmail, userPassword, loginCallBack);
		event.preventDefault();
	},

	'click #forgotPasswordButton' : function(event, template){
		event.preventDefault();
		Session.set('error',"");
		var userEmail = document.getElementById('email').value;
		if(userEmail === ""){
			Session.set("error", "Missing Email");
		}
		else{
			Accounts.forgotPassword({email:userEmail}, forgotPasswordCallBack);	
		}
		
	}
});

loginCallBack = function(error,id){
	if (error){
		if(error.reason == "Incorrect password"){
			Session.set("error","Incorrect password");
		}
		else{
			Session.set('error', "An error occured");
		}

	}
	
	else{
		Session.set("error", "");
	}
};

forgotPasswordCallBack = function(error, id){
	if(error){
		if (error.reason =="User not found"){
			Session.set("error", "Email not found");
		}
		else{
			Session.set('error', "An error occured");
		}
	}
	else{
		Session.set("error", "An email has been sent");
	}
};