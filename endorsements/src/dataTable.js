var React = require("react")

   var DataTable = (props) => {
    return (
      <table className ="table">
        <thead id  ="headers">
          <tr>
            {
             props.cols !== undefined ? props.cols.map((d, i) =>
              <th key = {"header" + i}> {d} </th>
              ) : null
           }
          </tr>
        </thead>
        <tbody>
          {
            props.rows !== undefined ? props.rows.map((row, i) =>
              <tr key = {"row"+i}>
              {
               props.rows !== undefined ?  props.cols.map((col, i) =>
                  <td key = {col}> <span className = {col === "points" ? "points" : "rows"}> {row[col]} </span> </td>
                  ) : null
              }
              </tr>
              ) : null
          }
        </tbody>

      </table>
      )
   }

   export default DataTable