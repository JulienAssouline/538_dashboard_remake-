var React = require("react")

class TableBar extends React.Component {
  anchorRef = React.createRef()

  render() {
    console.log(this.props)
    console.log(this.anchorRef.current)


         const table = this.props.rows !== undefined ? this.props.endorsee.map((row, i) =>
            <tr key = {"row"+i}>
            {

              <td key = {"endorsee"+i}> {row} </td>

            }
                <td id = "bars" key = {i}>
                 <svg ref = {this.anchorRef} width = {71} height = {18}>
                  {
                this.props.rows.map((rows, i) =>

                  <g key = {"g"+i} style = {{
                        fill: this.props.colors(i)
                      }}>
                  {
                      rows.map((d, i) =>
                        <rect
                        key = {"rects" + i}
                        x={this.props.xScale(d[0])}
                        width = {(d[1] - d[0])}
                        height = { 18 }
                        />
                        )
                  }
                  </g>
                  )

                }
                </svg>
                 </td>
            </tr>
            ) : null


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