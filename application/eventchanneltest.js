#!/usr/bin/env node
/**
 * EventChannel, 6.10.2016 Spaceify Oy
 *
 * @class EventChannel
 */

var spaceify = require("/var/lib/spaceify/code/spaceifyapplication.js");

function EventChannel()
{
var self = this;

var requiredService;

// EXPOSED JSON-RPC METHODS -- -- -- -- -- -- -- -- -- -- //

// eventchannel calls these methods when somebody fires the "red", "green" or "blue" events.
// The eventObject is from the caller of the event.
// The eventObject is totally customizable by the client. The only requirement is that it must be JSON and have the 
// event listener name. In this example: {name: "red", color: <>}, {name: "green", color: <>} or {name: "blue", color: <>}
var redEvent = function(eventObject, connObj, callback)
	{
	console.log("\n-\n", eventObject.name, eventObject.color, "\n-\n\n");

	callback(null, true);
	}

var greenEvent = function(eventObject, connObj, callback)
	{
	console.log("\n-\n", eventObject.name, eventObject.color, "\n-\n\n");

	callback(null, true);
	}

var blueEvent = function(eventObject, connObj, callback)
	{
	console.log("\n-\n", eventObject.name, eventObject.color, "\n-\n\n");

	callback(null, true);
	}

	// Remember to IMPLEMENT start AND fail METHODS IN YOUR APPLICATION!!! -- -- -- -- //
self.start = function()
	{
	// Connect to the eventchannel app
	requiredService = spaceify.getRequiredService("spaceify.org/services/eventchannel");

	// Expose the client-side metods for the event listeners
	requiredService.exposeRpcMethod("redEvent", self, redEvent);
	requiredService.exposeRpcMethod("greenEvent", self, greenEvent);
	requiredService.exposeRpcMethod("blueEvent", self, blueEvent);

	// Give the exposed methods event listener names:
	// "red" = redEvent, "green" = greenEvent and "blue" = blueEvent - these could be anything.
	requiredService.callRpc("addEventListener", [{name: "red"}, "redEvent"]);
	requiredService.callRpc("addEventListener", [{name: "green"}, "greenEvent"]);
	requiredService.callRpc("addEventListener", [{name: "blue"}, "blueEvent"]);
	};

self.fail = function()
	{
	};

}

var eventChannel = new EventChannel();
spaceify.start(eventChannel, {webservers: {http: true, https: true}});
