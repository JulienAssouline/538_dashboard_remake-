import position from "./position.csv"
import TableBar from "./TableBar"
import { transpose } from "./utils"
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

      var totals_array = [];

            tableData.forEach(d => {
              d.totals =
                +d["DNC members"] +
                +d["Former party leaders"] +
                +d["Governors"] +
                +d.Mayors +
                +d["Past presidents and vice presidents"] +
                +d["Representatives"] +
                +d["Senators"] +
                +d["State legislative leaders"] +
                +d["Statewide officeholders"];
              totals_array.push(d.totals);
            });

        tableData.sort((a,b) => b.totals - a.totals)

      var endorsees = tableData.map(obj => obj.endorsee)

      var stack = d3.stack()
          .keys([
                'Governors',
                'DNC members',
                'Former party leaders',
                'Mayors',
                'Past presidents and vice presidents',
                'Representatives',
                'Senators',
                'State legislative leaders',
                'Statewide officeholders',
              ])
          .order(d3.stackOrderNone)
          .offset(d3.stackOffsetNone)

      var series = stack(tableData)

      var types = series.map(({ key }) => key)

      var colors = d3.scaleOrdinal()
          .domain(types)
          .range([ "#b3d2eb","#a3c9e7","#94c0e3", "#84b7de", "#75adda", "#65a4d6", "#569bd2", "#4692ce", "#3689ca"])


     var data = transpose(series)

      var endorsees_img = endorsees.map(d => d.replace(/\s+/g,'').trim())

      var xScale = d3.scaleLinear()
            .domain([0, d3.max(totals_array)])
            .range([0, 110]);

      // xScale.domain([0, d3.max(tableData, function(d) { return d.total })])

    }

    return (
    <div id = "table_chart">
      <table className ="table">
            <tbody>
              {
                data !== undefined ? data.map((rows, i) => (
                <tr key = {"rows" + i}>
                <td>
                  <div><img src={require("./" +endorsees_img[i]+".png")} alt={endorsees[i]}/></div>
                 </td>
                  <td className = "endorsee">{endorsees[i]}</td>
                  <td>
                    <svg height = {80} width = {110}>
                      <g className="node" transform="translate(0,20)">
                        {rows.map((d, j) => (
                          <rect
                            key = {j + "rect"}
                            height={40}
                            width={xScale(d[1]) - xScale(d[0])}
                            x={xScale(d[0])}
                            style = {{
                              fill: colors(j)
                            }}
                          />
                        ))}
                      </g>
                    </svg>
                  </td>
                </tr>
              )) : null
            }
            </tbody>
          </table>
        </div>
      )
  }
}

export default TableChart