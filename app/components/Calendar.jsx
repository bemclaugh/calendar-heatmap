var React = require('react')
var moment = require('moment')
var _ = require('underscore')
var Day = require('./Day.jsx')

module.exports = React.createClass({
  propTypes: {
    year: React.PropTypes.number.isRequired,
    forceFullWeeks: React.PropTypes.bool,
    selected: React.PropTypes.bool,
    selectedDay: React.PropTypes.string,
    now: React.PropTypes.object,
    fillData: React.PropTypes.object,
    fillColor: React.PropTypes.object,
    labels: React.PropTypes.object
  },
  getDefaultProps: function () {
    var now = moment()
    return {
      year: now.year(),
      forceFullWeeks: false,
      selectedDay: now.year() + '-' + ('0' + (now.month() + 1)).slice(-2) + '-' + ('0' + now.date()).slice(-2),
      fillColor: {colormap: 'RdBu', nshades: 100, format: 'rgbaString', alpha: 0.15}
    }
  },
  monthDays: function () {
    var days = _.range(0, 12).map(function (month, i) {
      var monthStart = moment([this.props.year, month, 1])
      var prevMonthDaysCount = monthStart.weekday()
      var numberOfDays = monthStart.daysInMonth()
      var totalDays = this.props.forceFullWeeks ? 42 : 37
      return _.range(1, totalDays + 1).map(function (day, i) {
        var date = moment([this.props.year, month, day - prevMonthDaysCount])
        var calDate = {
          index: date.year() + '-' + ('0' + (date.month() + 1)).slice(-2) + '-' + ('0' + date.date()).slice(-2),
          month: date.month(),
          date: date.date()
        }
        calDate.otherMonth = ((day <= prevMonthDaysCount) || (day > (numberOfDays + prevMonthDaysCount)))
        calDate.selected = date.isSame(this.props.selectedDay, 'day')
        return calDate
      }, this)
    }, this)
    return _.zip.apply(_, days)
  },
  daysOfWeek: function () {
    var totalDays = this.props.forceFullWeeks ? 42 : 37
    return _.range(totalDays).map(function (i) {
      return moment().weekday(i).format('dd').charAt(0)
    })
  },
  monthNames: function (year) {
    return _.range(12).map(function (i) {
      return moment([year, i, 1]).format('MMM').charAt(0)
    })
  },
  dayClicked: function (id) {
    this.setProps({selectedDay: id})
    console.log('clicked')
  },
  render: function () {
    return (
    <table className='calendar'>
      <thead>
        <HeaderRow labels={this.monthNames(this.props.year)} />
      </thead>
      <tbody>
        {this.monthDays().map(function (rows, i) {
          return (<CalendarRow
            key={i}
            header={this.daysOfWeek()[i]}
            rows={rows}
            dayClicked={this.dayClicked}
            fillData={this.props.fillData}
            fillColor={this.props.fillColor} />
          )
        }, this)}
      </tbody>
    </table>
    )
  }
})

var HeaderRow = React.createClass({
  propTypes: {
    labels: React.PropTypes.array
  },
  render: function () {
    return (
    <tr>
      <th></th>
      {this.props.labels.map(function (cell, i) {
        return (<th key={i}>{cell}</th>)
      })}
    </tr>
    )
  }
})

var CalendarRow = React.createClass({
  propTypes: {
    rows: React.PropTypes.array,
    header: React.PropTypes.string,
    dayClicked: React.PropTypes.func,
    fillData: React.PropTypes.object,
    fillColor: React.PropTypes.object
  },
  render: function () {
    return (
    <tr>
      <td key='1' className='row_header'>
        {this.props.header}
      </td>
      {this.props.rows.map(function (row, i) {
        return (
         <Day
           id={row.index}
           key={i + 1}
           selected={row.selected}
           otherMonth={row.otherMonth}
           value={row.date}
           onClick={this.props.dayClicked}
           fillData={this.props.fillData[row.index]}
           fillColor={this.props.fillColor} />
         )
      }, this)}
    </tr>
    )
  }
})
