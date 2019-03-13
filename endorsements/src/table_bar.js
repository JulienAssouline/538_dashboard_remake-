var React = require("react")
var d3 = require("d3")

class TableBar extends React.Component {
  anchorRef = React.createRef()

  render() {
    const colors = this.props.colors

         const table = this.props.rows !== undefined ? this.props.endorsee.map((row, i) =>
            <tr key = {"row"+i}>
            {

              <td key = {"endorsee"+i}> {row} </td>

            }
                <td id = "bars" key = {i}>
                 <svg id = "svgs" ref = {this.anchorRef} width = {71} height = {18}>
                  {
                // this.props.rows.map((rows, i) =>

                //   <g key = {"g"+i} style = {{
                //         fill: this.props.colors(i)
                //       }}>
                //   {
                //       rows.map((d, i) =>
                //         <rect
                //         key = {"rects" + i}
                //         x={this.props.xScale(d[0])}
                //         width = {(d[1] - d[0])}
                //         height = { 18 }
                //         />
                //         )
                //   }
                //   </g>
                //   )

                }
                </svg>
                 </td>
            </tr>
            ) : null

         if (this.anchorRef.current !== null) {
          var groups = d3.selectAll("#svgs")
            .selectAll("g")
            .data(this.props.rows)
            .enter()
            .append("g")
            .style("fill", (d, i) => colors(i))

          groups.selectAll(".rect")
              .data(function(d){
                return d
              })
              .enter()
              .append("rect")
              .attr("class", "rects")
              .attr("x", (d) =>  d[0])
              .attr("height", 18)
              .attr("width", (d) => d[1] - d[0])
              .style("opacity", 1)

         }






    return (
        <table className ="table">
        <tbody>
        { table }
        </tbody>
        </table>
      )
  }
}

export default TableBar