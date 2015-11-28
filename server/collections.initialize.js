Meteor.startup(function() {

	var craigId, adrienneId, brianId, kathleenId, bruceId, crisId;
	if (Meteor.users.find().count() === 0){
		craigId = Accounts.createUser({
			email:'ccheney@mit.edu',
			password:'password',
			profile: {
				firstName: 'Craig',
				lastName:'Cheney',
				groups:[cheneyClanId],
				gender:"Male",
				roles:["admin"],
			}
		});

		adrienneId = Accounts.createUser({
			email:'adcheney88@gmail.com',
			password:'password',
			profile: {
				firstName: 'Adrienne',
				lastName:'Cheney',
				groups:[cheneyClanId],
				gender:"Female",
			}
		});

		brianId = Accounts.createUser({
			email:'briancheney2010@yahoo.com',
			password:'password',
			profile: {
				firstName: 'Brian',
				lastName:'Cheney',
				groups:[cheneyClanId],
				gender:"Male",
			}
		});

		kathleenId = Accounts.createUser({
			email:'kbuckcheney@comcast.net',
			password:'password',
			profile: {
				firstName: 'Kathleen',
				lastName:'Buck',
				groups:[cheneyClanId],
				gender:"Female",
			}
		});		

		bruceId = Accounts.createUser({
			email:'bwcheney@comcast.net',
			password:'password',
			profile: {
				firstName: 'Bruce',
				lastName:'Cheney',
				groups:[cheneyClanId],
				gender:"Male",
			}
		});

		crisId = Accounts.createUser({
			email:'cmc04747@pomona.edu',
			password:'password',
			profile: {
				firstName: 'Cris',
				lastName:'Cheney',
				groups:[cheneyClanId],
				gender:"Female",
			}
		});
	}

	// var bowId,  kittyId, chocolateId, zoombaShoeId;
	// if (items.find().count()===0){

	// 	bowId = items.insert({
	// 		owner: craigId,
	// 		gifter: brianId,
	// 		details: {
	// 			name:"a cool bow",
	// 			link: "www.google.com",
	// 			cost: "$25.99"
	// 		}
	// 	});

	// 	kittyId = items.insert({
	// 		owner: craigId,
	// 		gifter: adrienneId,
	// 		details: {
	// 			name: "a Big Kitty",
	// 			link: "www.reuters.com",
	// 			cost: "$7.99"
	// 		}
	// 	});

	// 	chocolateId = items.insert({
	// 		owner: brianId,
	// 		gifter: adrienneId,
	// 		details: {
	// 			name: "Chocolate",
	// 			link: "www.reuters.com",
	// 			cost: "$7.99"
	// 		}
	// 	});

	// 	zoombaShoeId = items.insert({
	// 		owner: kathleenId,
	// 		gifter: adrienneId,
	// 		details: {
	// 			name: "Zoomba Shoe",
	// 			link: "www.jcpenny.com",
	// 			cost: "$98"
	// 		}
	// 	});

	// }

		var cheneyClanId;
	if (Groups.find().count()===0){
		cheneyClanId = Groups.insert({
			name:"CheneyClan",
			members:[craigId, bruceId, brianId, adrienneId, kathleenId, crisId],
			admins:[craigId]
		});
	}
});