import position from "./position.csv"
import TableBar from "./table_bar"
var React = require("react")
var d3 = require("d3")


class TableChart extends React.Component {

  state = {
    position: [],
  }

  componentWillMount() {
    d3.csv(position)
      .then(position => {

        this.setState({
          position
        })

      })
  }

  render(){

    if (this.state.position.length > 0) {
      const tableData = this.state.position

      var endorsee_array = [];
      var totals_array = [];

      tableData.forEach(d => {
        endorsee_array.push(d.endorsee)
        d.totals = (+d["DNC members"]) + (+d["Former party leaders"]) + (+d["Governors"]) + (+d.Mayors) + (+d["Past presidents and vice presidents"]) + (+d["Representatives"]) + (+d["Senators"]) + (+d["State legislative leaders"]) + (+d["Statewide officeholders"])
        totals_array.push(d.totals)
        })

      var columns = tableData.columns

      columns.shift()

      var stack = d3.stack()
          .keys(columns)

      var series = stack(tableData)

      var colors = d3.scaleOrdinal()
          .domain(columns)
          .range(["#20363A", "#576F72", "#FF6A28", "#FFD626", "#801F73", "#FAB924"])

      var xScale = d3.scaleLinear()
            .domain([0, d3.max(totals_array)])
            .range([0, 71]);

      series.forEach(d =>  d.endorsee_position = endorsee_array)


    }

    return (
      <TableBar rows = {series} endorsee = {endorsee_array} colors= {colors} xScale = {xScale} />
      )
  }
}

export default TableChart