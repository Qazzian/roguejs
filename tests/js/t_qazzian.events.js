/*global Qazzian, _, QUnit*/
/**
 * Created by Ian on 13/04/2015.
 */


QUnit.test('Qazzian.Events', function(){
	//QUnit.expect(6);
	QUnit.ok('Qazzian.Events defined', Qazzian.Events);

	var testEmitter = _.extend({}, Qazzian.Events);

	/*
	TODO
	test events are bound, triggered and unbound
	test event hierarchies 'A:B:C' should create 3 events, 'A', 'A:B', 'A:B:C'
	 */

	testEmitter.bind('SingleEvent', function(){
		QUnit.ok(true, 'Has single event');
	});

	testEmitter.bind('SingleEventWithArg', function(arg){
		QUnit.ok(arg, 'Single Events pass arguments');
	});


	// Notice that with hierarchical events like this, that the most specific event handler
	// is called before the more generic one. i.e. Parent:Middle:Child called before Parent
	testEmitter.bind('Parent', function(arg){
		QUnit.equal(arg, 'Parent:Middle:Child', 'Parent event handled');
	});

	testEmitter.bind('Parent:Middle:Child', function(arg){
		QUnit.ok(true, 'Child event handled');
	});

	testEmitter.bind('Parent:Middle', function(arg){
		QUnit.equal(arg, 'Parent:Middle:Child', 'Middle event handled');
	});


	try {
		testEmitter.trigger('SingleEvent');
		testEmitter.trigger('SingleEventWithArg', true);
		testEmitter.trigger('Parent:Middle:Child');
	}
	catch (error) {
		console.error(error);
		QUnit.ok('events were not triggered', false);
	}

});