import DataTable from "./dataTable"

var React = require("react")
var d3 = require("d3")
const _ = require('lodash');

class Table extends React.Component {

  render() {

  if (this.props.columns !== undefined) {
    let tableRows = this.props.data

   var tableColumnsFiltered = ["date", "endorser", "position", "points"]
   var tableRowsFiltered = _.map(tableRows, d => {
         return _.omit(d, ['city', 'category', "body", "district", "endorsee", "endorser party", "order", "source", "state", "index"])
       })

   // var points_array = [];
   // tableRowsFiltered.forEach(d => points_array.push(d.points))

  var points = tableRowsFiltered.map(d => d.points)

  var points_sum = points.reduce((total, num) => total + num)


   const points_array = [...Array(11).keys()]
   points_array.shift()

   // console.log(tableRowsFiltered)

   var colors = d3.scaleOrdinal()
     .domain(points_array)
     .range(["#c2dbef","#b3d2eb","#a3c9e7","#94c0e3","#84b7de", "#75adda", "#65a4d6", "#569bd2", "#4692ce", "#3689ca"])

  }
    return (
      <div>
      <DataTable  rows={tableRowsFiltered} cols={tableColumnsFiltered} colors = {colors} />
      <h2 className="total_points"> Total: <span className = "total"> {points_sum +" "} </span> </h2>
      </div>
      )
  }
}

export default Table