import data from './endorsements-2020.csv';
const React = require("react")
const d3 = require("d3")
const _ = require('lodash');

function isSearched(searchTerm) {
  return function(item) {
    return (item.state.toLowerCase().includes(searchTerm.toLowerCase().trim()) || item.position.toLowerCase().includes(searchTerm.toLowerCase().trim()) || item.endorser.toLowerCase().includes(searchTerm.toLowerCase().trim()))
  }
}


class TotalTable extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      direction: "desc",
      value: "Search by position, state, or endorser",
      totalTableMore: true
    };
    this.sortTable = this.sortTable.bind(this)
    this.onSearchChange = this.onSearchChange.bind(this)
    this.searchClick = this.searchClick.bind(this)
    this.showMoreTotal = this.showMoreTotal.bind(this)
    this.showLessTotal = this.showLessTotal.bind(this)
  }

  anchorRef = React.createRef()

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

  onSearchChange(event) {
    this.setState({
      value: event.target.value
    })
  }

  searchClick() {
    this.setState({
      value: ""
    })
  }

  sortTable(event, sortKey) {

    const direction = this.state.direction === 'asc' ? 'desc' : 'asc';

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

  showMoreTotal() {
    this.setState({
        totalTableMore: true,
      })
  }

  showLessTotal() {
    this.setState({
        totalTableMore: false,
      })
  }

  render() {

    if (this.state.data.length > 0) {
      var data = this.state.data

    var columns = ["points", "position", "state", "endorser","endorsee",  "date"]

      var dataFiltered = _.map(data, d => {
            return _.omit(d, ['city', 'category', "body", "district", "endorser party", "order", "source", "index"])
          })

      if (this.state.totalTableMore === true) {
        dataFiltered.forEach((d, i) => {
          d.index = i
        })

        dataFiltered = dataFiltered.filter(d => d.index < 15)
      }


      var dataNew = this.state.value === "Search by position, state, or endorser" ? dataFiltered : dataFiltered.filter(isSearched(this.state.value))


    }

    const points_array = [...Array(11).keys()]
    points_array.shift()

    var colors = d3.scaleOrdinal()
     .domain(points_array)
     .range(["#c2dbef","#b3d2eb","#a3c9e7","#94c0e3","#84b7de", "#75adda", "#65a4d6", "#569bd2", "#4692ce", "#3689ca"])

        String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
        }

    const total_table = document.getElementById("total_button")
    if (total_table !== null) {
     this.state.totalTableMore === true ? total_table.innerText = "Show More" : total_table.innerText = "Show Less"
    }

    return (
    <div className = "table_input">
      <form>
          <input onClick = {this.searchClick} ref = { node => this.node = node } className = "seachbox" type = "text" onBlur={this.onSearchChange} placeholder="Search by position, state, or endorser" />
     </form>
     <div style = {{height: 50}}>
     <br />
     </div>
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

        dataNew !== undefined ? dataNew.map((d,i) =>
          <tr key = {"row" + i}>
          {
            dataNew !== undefined ?  columns.map((col, i) =>
            <td key = {col}> <span className = {col === "points" ? "points" : "others"} style = {{background: col === "points" ? colors(d[col]) : "white", color: col === "points" ? "white" : d.endorsee !== "" ? "black" : "#999"}}> { d[col] } </span> </td>
            ) : null
          }
          </tr>
          ) : null
      }
      </tbody>
      </table>
      <button onClick = {this.state.totalTableMore === false? this.showMoreTotal : this.showLessTotal } id="total_button"> Show More </button>
      </div>
      )
  }
}

export default TotalTable