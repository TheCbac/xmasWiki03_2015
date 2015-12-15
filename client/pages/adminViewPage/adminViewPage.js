
Template.adminView.helpers({
    personInGroup: function(){
        if (Meteor.user() !==undefined) {
            // Find the id of the clan - this should not be hard coded
            var clanIds = Groups.findOne({name:"CheneyClan"});
            // get the list of member Ids in the clan
            var members = clanIds.members;
            // return the users from the list of member ID's 
            var people =  Meteor.users.find({ _id : {$in:members}},
                                            {sort: {email:1}}
                                             );
            
            return people;
        }
    },

    userIsAdmin: function(){
        if(Meteor.user()){
            if ( Meteor.user().profile.roles.indexOf("admin") >= 0 ){
                return true;
            }
        }
        return false;
    }

});

Template.adminView.rendered = function () {
    Session.set("selectedPlayer", Meteor.userId());
};

Template.personListItem.helpers({
    personName: function(){
        return this.profile.firstName;
    },

    defaultSelection : function() {
        if (Meteor.user()){
            if (Meteor.user()._id === this._id){
                return  "person-selected";
            }
        }
        return "";
    },

    itemName: function() {
        return this.details.name;
    },
});

Template.personListItem.events({
    'click .person':function(event, template){
        Session.set("selectedPlayer", this._id);
        
        oldPersonItem = document.getElementsByClassName("person-selected")[0];
        
        var currentPersonItem = event.currentTarget;

        toggleClass(currentPersonItem, "person-selected");
        toggleClass(oldPersonItem, "person-selected");

    }
});

Template.giftItems.helpers({
    giftItemsList: function(){
        var currentPerson = Session.get("selectedPlayer");
            var itemsList = items.find({owner:currentPerson});
            
            if (itemsList.count()===0) {
                return false;
            }
            else{
                return itemsList;
            }
    },

    recipient:function() {
        if (Meteor.user() !==undefined) {

            var selectedName = Meteor.users.findOne({_id:Session.get('selectedPlayer')});
            if(selectedName){
                if (selectedName._id === Meteor.userId()){
                    return "You don't";
                }   
                else{
                    return selectedName.profile.firstName +" doesn't";
                }
            }
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

    link: function() {
        var linkToGift = this.details.link;
        if (linkToGift === ""){
            return "";
        }

        else if (linkToGift.substring(0,7) == "http://"){
            return linkToGift;
        }
    
        return "http://"+linkToGift;
    },

    linkTarget: function(){
        var linkToGift = this.details.link;
        if (linkToGift === ""){
            return "";
        }

        return "_blank";
    }



});

toggleClass = function(element, className){
    var classes = element.className.split(/\s+/),
            length = classes.length,
            i = 0;

        for(; i < length; i++) {
          if (classes[i] === className) {
            classes.splice(i, 1);
            break;
          }
        }
        // The className is not found
        if (length === classes.length) {
            classes.push(className);
        }

        element.className = classes.join(' ');
};


Template.adminView.events({
    'click #menuLink' : function( event, template){
        var active = 'active';

        var layout   = document.getElementById('layout'),
        menu     = document.getElementById('menu'),
        menuLink = document.getElementById('menuLink');

        event.preventDefault();
        toggleClass(layout, active);
        toggleClass(menu, active);
        toggleClass(menuLink, active);
    },

    'click #signoutBtn': function(event, template){
        Meteor.logout();
    },
    
    'click .pure-menu-item' : function(event, template){
        var selectedClass = "pure-menu-selected";
        var selectedItems = document.getElementsByClassName(selectedClass);
        // turn off already selected items 
        for (var i = 0; i < selectedItems.length; i++) {
            toggleClass(selectedItems[i], selectedClass);
        }
        
        toggleClass(event.currentTarget, selectedClass);
    },



});


Template.giftItemButton.helpers({
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

Template.giftItemButton.events({


    'click .removeButton' : function(event, template){
        
        items.remove(template.data._id);

    },

    'click .giftButton' : function(event, template){
        items.update({_id:template.data._id},
                { $set:
                    {gifter:Meteor.userId()} 
                }
            );
    },

    'click .ungiftButton' : function(event, template){

        items.update({_id:template.data._id},
                { $set:
                    {gifter:null} 
                }
            );
    }

});


Session.setDefault("addItemBtnPressed", false);
Session.setDefault("newItemError", null);

Template.addGiftItem.helpers({
    addItem: function() {
        return Session.get("addItemBtnPressed");
    },
});


Template.addGiftItem.events({
    'click .addNewItmBtn' : function(event, template){
        console.log("pressed");

        var currentState = Session.get("addItemBtnPressed");
        var newState = !currentState;
        Session.set("addItemBtnPressed", newState);
        // console.log(newState);
    },

    'submit #newItemForm' :function(event, template){
        event.preventDefault();

        var giftName = template.find("#giftName").value;
        var linkName = template.find("#linkName").value;
        console.log(linkName);
        // var giftCost = template.find("#giftCost").value;
        if(!giftName.length){
            Session.set("newItemError", "Name is Blank");
                    
        }   
        // else if(!linkName.length){
        //     Session.set("newItemError", "URL is blank");
        // }
        else{

            newId = items.insert({
                owner:Meteor.userId(),
                gifter:null,
                details:{
                    name:giftName,
                    link:linkName,
                }
            });
            Session.set("newItemError", null);
            Session.set("addItemBtnPressed", false);
        }

        
    }
});

