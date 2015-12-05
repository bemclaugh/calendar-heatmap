var React = require('react')
var cmap = require('colormap')
var classNames = require('classnames')

module.exports = React.createClass({
  propTypes: {
    tableColors: React.PropTypes.array,
    fillData: React.PropTypes.number,
    id: React.PropTypes.string,
    onClick: React.PropTypes.func,
    selected: React.PropTypes.bool,
    otherMonth: React.PropTypes.bool,
    value: React.PropTypes.number,
    fillColor: React.PropTypes.object
  },
  getDefaultProps: function () {
    return ({
      fillColor: {
        fillData: null,
        colormap: 'RdBu',
        nshades: 100,
        format: 'rgbaString',
        alpha: 0.4
      }
    })
  },
  selectDay: function () {
    this.props.onClick(this.props.id)
  },
  setStyles: function () {
    var tableColors = cmap(this.props.fillColor)
    return ({
      backgroundColor: tableColors[this.props.fillData]
    })
  },
  render: function () {
    var dayClasses = classNames(
      {
        selected: this.props.selected,
        otherMonth: this.props.otherMonth
      }
    )
    return (
    <td className={dayClasses} onClick={this.selectDay} style={this.setStyles()}>
      {this.props.value}
    </td>
    )
  }
})
