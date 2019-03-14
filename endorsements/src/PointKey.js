var React = require("react")
var d3 = require("d3")

class PointKey extends React.Component {
  render() {
    // var value = [10,8,6,5,3,2,1]

   const values = [
    {key: 10,
      value: ["Former presidents and vice presidents", "Current national party leaders"]
    },
    { key: 8,
      value: ["Governers"]
    },
    {
      key:6,
      value: ["U.S. senators"]
    },
    {
      key: 5,
      value: ["Former presidential and vice-presidential nominees", "Former national party leaders", "Former national party leaders"]
    },
    {
      key: 3,
      value: ["U.S. representatives", "Mayors of large cities"]
    },
    {
      key: 2,
      value: ["Officials in statewide elected offices", "State legislative leaders"]
    },
    {
      key: 1,
      value: ["Other Democratic National Committee members"]
    }]

    const colorsPoints = d3.scaleOrdinal()
        .domain([1,2,3,5,6,8,10])
        .range([ "#b3d2eb","#a3c9e7","#94c0e3", "#84b7de", "#75adda", "#65a4d6", "#569bd2", "#4692ce", "#3689ca"])



  const points_value =  values.map((d,i) =>
    <ul key = {"point"+i}>
      <div className = "value" style = {{ background: colorsPoints(d.key) }}>
      {d.key + " points"}
      </div>
      <ul>
      {d.value.map((v,i) =>
        <li key = {"value"+i}>
        {v}
        </li>
        )}
      </ul>
      </ul>
      )
    return (
      <div className="point_key">
      <h2> FiveThirtyEight’s point scale </h2>
        {points_value}
        <br/>
      </div>
      )
  }
}

export default PointKey