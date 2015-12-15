Meteor.startup(function() {

	process.env.MAIL_URL="smtp://ccheney:Remembertokeepthegoalinsight!@outgoing.mit.edu:465";

	var craigId, adrienneId, brianId, kathleenId, bruceId, crisId;
	if (Meteor.users.find().count() === 0){
		craigId = Accounts.createUser({
			email:'ccheney@mit.edu',
			password:"password",
			profile: {
				firstName: 'Craig',
				lastName:'Cheney',
				groups:[cheneyClanId],
				gender:"Male",
				roles:["admin"],
			}
		});



		// adrienneId = Accounts.createUser({
		// 	email:'adcheney88@gmail.com',
		// 	profile: {
		// 		firstName: 'Adrienne',
		// 		lastName:'Cheney',
		// 		groups:[cheneyClanId],
		// 		gender:"Female",
		// 	}
		// });
		// Accounts.sendEnrollmentEmail(adrienneId);

		// brianId = Accounts.createUser({
		// 	email:'briancheney2010@yahoo.com',
		// 	profile: {
		// 		firstName: 'Brian',
		// 		lastName:'Cheney',
		// 		groups:[cheneyClanId],
		// 		gender:"Male",
		// 	}
		// });
		// Accounts.sendEnrollmentEmail(brianId);

		// kathleenId = Accounts.createUser({
		// 	email:'kbuckcheney@comcast.net',
		// 	profile: {
		// 		firstName: 'Kathleen',
		// 		lastName:'Buck',
		// 		groups:[cheneyClanId],
		// 		gender:"Female",
		// 	}
		// });	
		// Accounts.sendEnrollmentEmail(kathleenId);	

		// bruceId = Accounts.createUser({
		// 	email:'bwcheney@comcast.net',
		// 	profile: {
		// 		firstName: 'Bruce',
		// 		lastName:'Cheney',
		// 		groups:[cheneyClanId],
		// 		gender:"Male",
		// 	}
		// });
		// Accounts.sendEnrollmentEmail(bruceId);

		// crisId = Accounts.createUser({
		// 	email:'cmc04747@pomona.edu',
		// 	profile: {
		// 		firstName: 'Cris',
		// 		lastName:'Cheney',
		// 		groups:[cheneyClanId],
		// 		gender:"Female",
		// 	}
		// });
		// Accounts.sendEnrollmentEmail(crisId);
	}

		var cheneyClanId;
	if (Groups.find().count()===0){
		cheneyClanId = Groups.insert({
			name:"CheneyClan",
			members:[craigId],
			// members:[craigId, bruceId, brianId, adrienneId, kathleenId, crisId],
			admins:[craigId]
		});
	}
});