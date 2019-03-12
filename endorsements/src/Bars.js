var React = require("react")
var d3 = require("d3")

class Bars extends React.Component {
  render() {

    const dataSeries = this.props.data



  var groups = d3.selectAll("#bars")
    .data(dataSeries)
    .enter()
    .append("svg")
    .attr("class", "bars")
    .attr("height", 12)
    .attr("width", 71)
    .append("g")
    .style("fill", (d, i) => this.props.colors(i) )


  groups.selectAll(".rect")
              .data(function(d){
                return d
              }).enter()
              .append("rect")
              .attr("class", "rects")
              .attr("x", function(d){
                return this.props.xScale(d[0])
              })

              .attr("height", 18)
              .attr("width", function(d){
                return d[1] - d[0];
              })




   // td.selectAll("td")
   //  .data(dataSeries)
   //  .enter()
   //  .append("g")


    return (
      null
      )
  }
}

export default Bars