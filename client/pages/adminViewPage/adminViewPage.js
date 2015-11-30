
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
    }

});

Template.adminView.rendered = function () {
    Session.set("selectedPlayer", Meteor.userId());
};

Template.personListItem.helpers({
    personName: function(){
        return this.profile.firstName;
    },

    itemName: function() {
        return this.details.name;
    },
});

Template.personListItem.events({
    'click .person':function(event, template){
        Session.set("selectedPlayer", this._id);
        console.log('player');
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
            if (selectedName._id === Meteor.userId()){
                return "You don't";
            }   
            else{
                return selectedName.profile.firstName +" doesn't";
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
        return this.details.link;
    },



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
    
    'click .pure-menu-item' : function(event, template){
        var selectedClass = "pure-menu-selected";
        var selectedItems = document.getElementsByClassName(selectedClass);
        // turn off already selected items 
        for (var i = 0; i < selectedItems.length; i++) {
            toggleClass(selectedItems[i], selectedClass);
        }
        
        toggleClass(event.currentTarget, selectedClass);
        console.log("changeSelection");

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

        // reply = confirm("Are you sure you want to delete "+ template.data.details.name +"?");
        // if (reply){
        //     items.remove(template.data._id);
        // }

        // else{}
    },

    'click .giftButton' : function(event, template){
        items.update({_id:template.data._id},
                { $set:
                    {gifter:Meteor.userId()} 
                }
            );
        // var owner = Meteor.users.findOne(template.data.owner).profile.firstName;
        // reply = confirm("Are you sure you want to get " + template.data.details.name + " for " +owner); 
        // if (reply) {

        //     items.update({_id:template.data._id},
        //         { $set:
        //             {gifter:Meteor.userId()} 
        //         }
        //     );
        // }
    },

    'click .ungiftButton' : function(event, template){

        items.update({_id:template.data._id},
                { $set:
                    {gifter:null} 
                }
            );
        // var owner = Meteor.users.findOne(template.data.owner).profile.firstName;
        // reply = confirm("Are you sure you want don't want to get " + template.data.details.name + " for " +owner);  
        // if (reply) {

        //     items.update({_id:template.data._id},
        //         { $set:
        //             {gifter:null} 
        //         }
        //     );
        // }
    }

});
