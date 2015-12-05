var React = require('react')
var ReactDOM = require('react-dom')
var _ = require('underscore')
require('./main.scss')
var Calendar = require('./components/Calendar.jsx')

var testData = function () {
  var m = _.range(12)
  var d = _.range(32)
  const y = '2015'
  var data = {}
  for (var i in m) {
    for (var j in d) {
      var key = y + '-' + ('0' + (m[i] + 1)).slice(-2) + '-' + ('0' + (d[j] + 1)).slice(-2)
      data[key] = Math.floor(Math.random() * (100 - 1)) + 1
    }
  }
  return (data)
}
ReactDOM.render(<Calendar fillData={testData()} />, document.getElementById('calendar'))
