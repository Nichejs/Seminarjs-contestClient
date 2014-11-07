#!/usr/bin/env node

var package = require('../package.json'),
	request = require("request"),
	//exec = require('exec'),
	exec = require('child_process').exec,
	dashes = '\n------------------------------------------------\n';

console.log(dashes);
console.log("Seminarjs Contest Client");
console.log("Version " + package.version);
console.log("Usage: seminarjsContest [host] [token] [filename]");
console.log(dashes);

var arguments = process.argv.slice(2),
	host = arguments[0],
	token = arguments[1],
	filename = arguments[2];

if (typeof host == 'undefined' || !host) {
	console.error("[ERROR] No host specified");
	console.log(dashes);
	process.exit(-1);
}

if (typeof token == 'undefined' || !token) {
	console.error("[ERROR] No token specified");
	console.log(dashes);
	process.exit(-1);
}

if (typeof filename == 'undefined' || !filename) {
	console.error("[ERROR] No filename specified");
	console.log(dashes);
	process.exit(-1);
}

// Get the input from the server

request({
	uri: 'http://' + host + '/contest/input',
	method: "GET",
	timeout: 5000,
	followRedirect: false,
	qs: {
		'token': token
	}
}, function (error, response, body) {
	if (typeof (response) === 'undefined') {
		console.log("Error: Invalid host");
		return;
	}
	if (response.statusCode !== 200) {
		console.log(body);
	} else {
		executeProgram(body);
	}
});

// ------------------------------------------ //

function executeProgram(input, command) {
	var cmd = 'node ' + filename;
	if (typeof command !== 'undefined') {
		cmd = command + ' ' + filename;
	}
	console.log("[EXEC] " + cmd);

	var child = exec(cmd,
		function (error, stdout, stderr) {
			if (error !== null) {
				console.log('exec error: ' + error);
			} else {
				sendOutput(stdout);
			}
		});
	child.stdin.end(input + "\n");
}

function sendOutput(output) {
	request({
		uri: 'http://' + host + '/contest/output',
		method: "POST",
		timeout: 5000,
		followRedirect: false,
		qs: {
			'token': token
		},
		headers: {
			'Content-Type': 'text/plain'
		},
		body: output
	}, function (error, response, body) {
		if (response.statusCode !== 200) {
			console.log(body);
		} else {
			console.log(body);
		}
	});
}