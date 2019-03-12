import gridData from "./endorsements_analysed.csv"
var React = require("react")
var d3 = require("d3")

class GridMap extends React.Component {

  state = {
    gridData: [],
  }

  componentWillMount() {
    d3.csv(gridData)
      .then(gridData => {

        gridData.forEach(d => {
          d.points = +d.points
          d.x = (d.x)
          d.points_y = +d.points_y
        }
          )

        this.setState({
          gridData
        })

      })
  }

  render() {
    const width = 35
    const height = 35

    const { gridData } = this.state

    const points_state_array = gridData.map(d => d.points_x);

    const max = Math.max(...points_state_array)
    const min = Math.min(...points_state_array)

    var color = d3.scaleQuantize()
      .domain([min, max])
      .range(['#b2ddf0', '#92bcd8', '#769cbf', '#5d7da7', '#46608f', '#334577', '#232d5f'])

    var rectScale = d3.scaleLinear()
           .domain(d3.extent(gridData, function(d){ return +d.points_x}))
           .range([1, 15])

    const gridmap = gridData.map((d,i) =>
      <g key = {"grid" + i} transform={"translate(" + (d.x * width) + "," + (d.y * height) + ")"}>
        <rect
          width = {width}
          height = { height  }
          style = {{
            fill : d.endorsee === this.props.name ? color(d.points_by_state) : "transparent",
            // opacity: d.endorsee === "Cory Booker" ? 1 :0,
            stroke: "lightgrey",
          }}
        />
        <text
          textAnchor="middle"
          x = {width/2}
          y = {height/2}
          style= {{
            fontWeight : "normal",
            fontSize: "12px",
            // opacity: d.endorsee === "Cory Booker" ? 1 :0,
            fill: "grey",
          }}
        > {d.state} </text>
      </g>

      )

    return (
      <div id = "charts">
      <svg width = {12 * width} height = {12 * height}>
      <g>
      { gridmap }
      </g>
      </svg>
      </div>
      )
  }
}

export default GridMap