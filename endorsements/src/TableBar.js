var React = require("react")

var TableBar = (props) => {
    return (
      <table className ="table">
        <tbody>
          {
            props.rows !== undefined ? props.endorsee.map((row, i) =>
              <tr key = {"row"+i}>
              {

                <td key = {"endorsee"+i}> {row} </td>

              }
                  <td id = "bars" key = {i}>
                   <svg width = {71} height = {18}>
                    {
                  props.rows.map((rows, i) =>

                    <g key = {"g"+i} style = {{
                          fill: props.colors(i)
                        }}>
                    {
                        rows.map((d, i) =>
                          <rect
                          key = {"rects" + i}
                          x={d[0]}
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
          }
        </tbody>

      </table>
      )
   }

export default TableBar