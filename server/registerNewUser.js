Accounts.emailTemplates.siteName = "Xmas Wiki 2015";
Accounts.emailTemplates.from = "Craig Cheney <ccheney@mit.edu>";
Accounts.emailTemplates.enrollAccount.subject = function (user) {
    return "Welcome to the Xmas Wiki";
};

Accounts.emailTemplates.enrollAccount.text = function (user, url) {
   return "Please activate your Xmas Wiki account by simply click the link below:\n\n"+ url;
};

Meteor.methods({
	createNewUser : function(firstIn, lastIn, emailIn, genderIn, clanIdIn){
		newId = Accounts.createUser({
			email:emailIn,
			// password:"password",
			profile:{
				firstName: firstIn,
				lastName: lastIn,
				groups:[clanIdIn],
				gender:genderIn
			}
		});

		Accounts.sendEnrollmentEmail(newId);

		Groups.update({_id:clanIdIn},
							{$addToSet:
								{members:newId}
							});
		return newId;
	}
});
