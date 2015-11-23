var React = require('react');
var moment = require('moment');
var _ = require('underscore');
var classNames = require('classnames');
require('../main.scss');
var cmap = require('colormap');

module.exports = React.createClass({
  propTypes: {
    year: React.PropTypes.number.isRequired,
    forceFullWeeks: React.PropTypes.bool,
    selected: React.PropTypes.string
  },
  getDefaultProps: function() {
    var now = moment();
    var tableColors = cmap({
      colormap: 'RdBu',
      nshades: 100,
      format: 'rgbaString',
      alpha: 0.4
    });
    return {
      year: now.year(),
      forceFullWeeks: false,
      selected: now.month() + '_' + now.date()
    };
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
          index: date.month() + '_' + date.date(),
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
    this.setProps({selected: id});
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
            selected={this.props.selected}
            fillData={this.props.fillData}
            />
          );
        }, this)}
      </tbody>
      </table>
    );
  }
});

var HeaderRow = React.createClass({
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
          return(
            <Day
              id={row.index}
              key={i+1}
              selected={row.index === this.props.selected}
              otherMonth={row.otherMonth}
              value={row.date}
              onClick={this.props.selection}
              fillData={this.props.fillData[row.index]}
            />
          );
        }, this)}
      </tr>
    );
  }
});

var Day = React.createClass({
  propTypes: {
    tableColors: React.PropTypes.array,
    fillData: React.PropTypes.number
  },
  getDefaultProps: function() {
    var tableColors = cmap({
      colormap: 'RdBu',
      nshades: 100,
      format: 'rgbaString',
      alpha: 0.4
    });
    return({
      fillData: null,
      tableColors: tableColors,
    });
  },
  selectDay: function() {
    this.props.onClick(this.props.id);
  },
  setStyles: function() {
    return({
      backgroundColor: this.props.tableColors[this.props.fillData]
    });
  },
  render: function() {
    var dayClasses = classNames(
      {
        selected: this.props.selected,
        otherMonth: this.props.otherMonth
      }
    );
    return(
      <td
        className={dayClasses}
        onClick={this.selectDay}
        style={this.setStyles()}
      >
      {this.props.value}
      </td>
    );
  }
});
