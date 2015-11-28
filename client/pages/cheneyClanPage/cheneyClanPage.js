Template.cheneyClanPage.helpers({
	personInClan: function () {
		if (Meteor.user() !==undefined) {
			var clanIds = Groups.findOne({name:"CheneyClan"});
			var members = clanIds.members;
			var people =  Meteor.users.find({ _id : {$in:members}},
											{sort: {email:1}}
											 );
			
			return people;
		}
	}
});

Template.cheneyClanPage.rendered = function () {
	Session.set("selectedPlayer", Meteor.userId());
};



Template.personTile.helpers({
	getName: function() {
		return this.profile.firstName;
	},

	selected: function(){
		return Session.equals("selectedPlayer", this._id) ? "selected" : "";
	}

});

Template.personTile.events({
	'click' : function() {
		Session.set("selectedPlayer", this._id);
	}
});

// Template.wishList.events({
// 	"click .giftButton" : function(event, template){
// 		console.log("pressed gift");
// 	}
// });

Template.wishList.helpers({
	wishItems: function () {
		var currentPerson = Session.get("selectedPlayer");
		var itemsList = items.find({owner:currentPerson});
		
		if (itemsList.count()===0) {
			return false;
		}
		else{
			return itemsList;
		}
	},

	itemName: function() {
		return this.details.name;
	},

	gifter: function(){
		if (Session.get('selectedPlayer') == Meteor.userId() ){
			return "";
		}

		else{
			var person = Meteor.users.findOne({_id:this.gifter});
			var selectedName = Meteor.users.findOne({_id:Session.get('selectedPlayer')});
			if (person!== undefined){
				return person.profile.firstName + " is getting this for " +selectedName.profile.firstName ;
			}

			else{
				return "No one is getting this for " + selectedName.profile.firstName + " yet";
			}
			
			
		}
	},

	//should chache the peron _id 
	link: function() {
		return this.details.link;
	},

	recipient:function() {
		if (Meteor.user() !==undefined) {

			var selectedName = Meteor.users.findOne({_id:Session.get('selectedPlayer')});
			if (selectedName._id === Meteor.userId()){
				return "You don't";
			}	
			else{
				return selectedName.profile.firstName +" doesn't";
			}
		}
	},
});

Session.setDefault("addItemBtnPressed", false);
Session.setDefault("newItemError", null);

Template.addItemTemplate.events({
	'click .addNewItmBtn' : function(event, template){
		console.log("pressed");

		var currentState = Session.get("addItemBtnPressed");
		var newState = !currentState;
		Session.set("addItemBtnPressed", newState);
		console.log(newState);
	},

	'submit #newItemForm' :function(event, template){
		event.preventDefault();

		var giftName = template.find("#giftName").value;
		var linkName = template.find("#linkName").value;
		var giftCost = template.find("#giftCost").value;
		if(!giftName.length){
			Session.set("newItemError", "Name is Blank");
					
		}	
		else if(!linkName.length){
			Session.set("newItemError", "URL is blank");
		}
		else{

			newId = items.insert({
				owner:Meteor.userId(),
				gifter:null,
				details:{
					name:giftName,
					link:linkName,
					cost:giftCost
				}
			});
			Session.set("newItemError", null);
			Session.set("addItemBtnPressed", false);
		}

		
	}
});



Template.addItemTemplate.helpers({
	addItem: function() {
		return Session.get("addItemBtnPressed");
	},
});


Template.giftButton.helpers({
	giftIcon : function(){
		if (this.gifter === Meteor.userId() ){
			return "fa-ban";
		}
		else{
			return "fa-gift";
		}
	},

	giftIconClass: function() {
		if (this.gifter === Meteor.userId() ){
			return "ungiftButton";
		}

		else{
			return "giftButton";
		}
	}
});

Template.giftButton.events({
	'click .removeButton' : function(event, template){
		
		reply = confirm("Are you sure you want to delete "+ template.data.details.name +"?");
		if (reply){
			items.remove(template.data._id);
		}

		else{}
	},

	'click .giftButton' : function(event, template){
		var owner = Meteor.users.findOne(template.data.owner).profile.firstName;
		reply = confirm("Are you sure you want to get " + template.data.details.name + " for " +owner);	
		if (reply) {

			items.update({_id:template.data._id},
				{ $set:
					{gifter:Meteor.userId()} 
				}
			);
		}
	},

	'click .ungiftButton' : function(event, template){
		var owner = Meteor.users.findOne(template.data.owner).profile.firstName;
		reply = confirm("Are you sure you want don't want to get " + template.data.details.name + " for " +owner);	
		if (reply) {

			items.update({_id:template.data._id},
				{ $set:
					{gifter:null} 
				}
			);
		}
	}

});

Template.newItemError.helpers({
	error: function () {
		return Session.get("newItemError");
	}
});



