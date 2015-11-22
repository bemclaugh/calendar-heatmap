var React = require('react');
var moment = require('moment');
var _ = require('underscore');
var classNames = require('classnames');
require('../main.scss');

module.exports = React.createClass({
  propTypes: {
    year: React.PropTypes.number.isRequired,
    forceFullWeeks: React.PropTypes.bool,
    showDaysOfWeek: React.PropTypes.bool,
    onPickDate: React.PropTypes.func,
    landscapeOrientation: React.PropTypes.bool
  },
  getDefaultProps: function() {
    return {
      year: moment().year(),
      forceFullWeeks: false,
      showDaysOfWeek: true,
      onPickDate: null,
      selectedDay: moment(),
      landscapeOrientation: true
    };
  },
  getInitialState: function() {
    return({selected: '1_1'}) // change
  },
  monthDays: function() {
    var year = this.props.year;
    var forceFullWeeks = this.props.forceFullWeeks;
    var selectedDay = this.props.selectedDay;
    var days = _.range(0, 12).map(function(month, i) {
      var monthStart = moment([year, month, 1]);
      var prevMonthDaysCount = monthStart.weekday();
      var numberOfDays = monthStart.daysInMonth();
      var totalDays = forceFullWeeks ? 42 : 37;
      return _.range(1, totalDays + 1).map(function(day, i) {
        var date = moment([year, month, day - prevMonthDaysCount]);
        var calDate = {
          month: date.month(),
          date : date.date(),
          selected : false,
          otherMonth: false
        };
        if (( day <= prevMonthDaysCount ) || ( day > (numberOfDays + prevMonthDaysCount))) {
          calDate.otherMonth = true;
        }
        if (date.isSame(selectedDay, 'day')) {
          calDate.selected = true;
        }
        return calDate;
      });
    });
    return _.zip.apply(_, days);
  },
  daysOfWeek: function() {
    var totalDays = this.props.forceFullWeeks? 42: 37;
    return _.range(totalDays).map(function(i) {
      return moment().weekday(i).format('dd').charAt(0);
    });
  },
  monthNames: function(year) {
    return _.range(12).map(function(i) {
      return moment([year, i, 1]).format('MMM').charAt(0);
    });
  },
  dayClicked: function(id) {
    this.setState({selected: id});
  },
  render: function() {
    var header = this.daysOfWeek();
    return(
      <table className='calendar'>
      <thead>
        <HeaderRow labels={this.monthNames(this.props.year)}/>
      </thead>
      <tbody>
        {this.monthDays().map(function(rows, i) {
          return(<CalendarRow
            key={i}
            header={header[i]}
            rows={rows}
            selection={this.dayClicked}
            selected={this.state.selected}
            />
          );
        }, this)}
      </tbody>
      </table>
    );
  }
});

var HeaderRow = React.createClass({
  //months
  render: function() {
    return (
      <tr>
      <th>&nbsp;</th>
      {this.props.labels.map(function(cell, i) {
        return(<th key={i}>{cell}</th>);
      })}
      </tr>
    );
  }
});

var CalendarRow = React.createClass({
render: function() {
    return(
      <tr>
        <td key='1' className='row_header'>{this.props.header}</td>
        {this.props.rows.map(function(row, i) {
          var dayIndex = row.date + '_' + row.month;
          return(
            <Day
              id={dayIndex}
              key={i+1}
              selected={dayIndex === this.props.selected}
              otherMonth={row.otherMonth}
              value={row.date}
              onClick={this.props.selection}
            />
          );
        }, this)}
      </tr>
    );
  }
});

var Day = React.createClass({
  selectDay: function() {
    this.props.onClick(this.props.id);
  },
  render: function() {
    var dayClasses = classNames({
      'selected': this.props.selected,
      'otherMonth': this.props.otherMonth
    });
    return(
      <td className={dayClasses} onClick={this.selectDay}>{this.props.value}</td>
    );
  }
});
