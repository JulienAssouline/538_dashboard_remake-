import data from './endorsements-2020.csv';
const React = require("react")
const d3 = require("d3")
const _ = require('lodash');


class TotalTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = { data: [], direction: "desc" };
    this.sortTable = this.sortTable.bind(this)
  }

  componentWillMount() {
    d3.csv(data)
      .then(data => {

        data.forEach(d => d.points = +d.points)

        data.sort((a,b) => b.points - a.points)

        this.setState({
          data
        })

      })
  }

  sortTable(event, sortKey) {

    const direction = this.state.direction === 'asc' ? 'desc' : 'asc';

    console.log(this.state.data)
    console.log(sortKey)

    const dataSorted = this.state.data;


    if (sortKey === "points") {
      console.log(direction === "desc")
     direction === "desc" ? dataSorted.sort((a,b) => b.points - a.points) : dataSorted.sort((a,b) => a.points - b.points)
      this.setState({
        dataSorted,
        direction: direction
      })
    }
    else {

      dataSorted.sort((a, b) => {
        var nameA = a[sortKey].toUpperCase(); // ignore upper and lowercase
        var nameB = b[sortKey].toUpperCase(); // ignore upper and lowercase
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      });

      if (direction === 'desc') {
        dataSorted.reverse();
        }


      this.setState({
        dataSorted,
        direction: direction
      })
    }



  }

  render() {

    if (this.state.data.length > 0) {
      var data = this.state.data

      console.log(this.state)

    var columns = ["points", "position", "state", "endorser","endorsee",  "date"]

      var dataFiltered = _.map(data, d => {
            return _.omit(d, ['city', 'category', "body", "district", "endorser party", "order", "source", "index"])
          })

    }

    const points_array = [...Array(11).keys()]
    points_array.shift()

    var colors = d3.scaleOrdinal()
     .domain(points_array)
     .range(["#c2dbef","#b3d2eb","#a3c9e7","#94c0e3","#84b7de", "#75adda", "#65a4d6", "#569bd2", "#4692ce", "#3689ca"])

    String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
    return (
      <table className ="table">
        <thead id  ="headers">
        <tr>
        {
         columns !== undefined ? columns.map((d, i) =>
            <th className = "total_headers" onClick = {e => this.sortTable(e, d)} key = {"columns" + i}>
            {d.capitalize()}
            <div className="sortdir">
              <div className="desc">▲</div>
              <div className="asc">▼</div>
            </div>
            </th>
            ) : null
        }
        </tr>
      </thead>
      <tbody>
      {
        dataFiltered !== undefined ? dataFiltered.map((d,i) =>
          <tr key = {"row" + i}>
          {
            dataFiltered !== undefined ?  columns.map((col, i) =>
            <td key = {col}> <span className = {col === "points" ? "points" : "others"} style = {{background: col === "points" ? colors(d[col]) : "white", color: col === "points" ? "white" : d.endorsee !== "" ? "black" : "lightgrey"}}> { d[col] } </span> </td>
            ) : null
          }
          </tr>
          ) : null
      }
      </tbody>
      </table>
      )
  }
}

export default TotalTable