var React = require('react');
var ReactDOM = require('react-dom');
var _ = require('underscore');
var Calendar = require('./components/Calendar.jsx');

var testData = function() {
	var m = _.range(12);
	var d = _.range(1, 32);
	var data = {};
	for(var i in m) {
		for(var j in d) {
			var key = m[i] + '_' + d[j];
			data[key] = Math.floor(Math.random() * (100 - 1)) + 1;
		}
	}
	return(data);
};
ReactDOM.render(<Calendar fillData={testData()}/>, document.getElementById('calendar'));
