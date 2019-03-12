var React = require("react")
var d3 = require("d3")
var _ = require("underscore")

class DataSeries extends React.Component {

  render() {
    var data = {
  series1: [ 30, 10, 5, 8, 15, 10 ],
  series2: [ 5, 20, 12, 4, 6, 2 ],
  series3: [ 5, 8, 2, 4, 6, 2 ]
};

var size = { width: 600, height: 300 };

    var zipped = _.zip(data.series1, data.series2, data.series3);


var totals = _.map(zipped, function(values) {
  return _.reduce(values, function(memo, value) { return memo + value; }, 0);
});

var yScale = d3.scale.linear()
  .domain([0, d3.max(totals)])
  .range([0, this.props.height]);

return (
  <div>
    <DataSeries data={data.series1} size={size} yScale={yScale} ref="series1" color="cornflowerblue" />
    <DataSeries data={data.series2} size={size} yScale={yScale} ref="series2" color="red" />
    <DataSeries data={data.series3} size={size} yScale={yScale} ref="series3" color="green" />
  </div>
);
  }
}

export default DataSeries