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
