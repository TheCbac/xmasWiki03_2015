Router.configure({

	layoutTemplate:'appLayout',
	notFoundTemplate:"notFoundPage",
	yieldTemplates:{
		'appHeader': {to:'header'},
		'appFooter': {to: 'footer'}
	}
});

Router.onBeforeAction(function(){
	if (!Meteor.loggingIn() && !Meteor.user()) {
		this.redirect('/');
	} else {
		this.next();
	}
 }, {
 	//whitelist which routes don't need to be signed in for 
 	except:[
 	'pageNotFoundRoute',
 	'landingPageRoute']
 });

// Router.onBeforeAction(function() {
// 	if (Meteor.logginIn() ) {
// 	}
// 	else {
// 		this.redirect('/cheneyClan');
// 	}
// });

Router.route('landingPageRoute', {
	path:'/',
	template: 'landingPage',
});

Router.route('cheneyClanRoute', {
	path:'/cheneyClan',
	template: 'cheneyClanPage', 
});
