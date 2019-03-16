var React = require("react")
var d3 = require("d3")
const _ = require('lodash');

class TotalTable extends React.Component {
  render() {

    if (this.props.data.length > 0) {
      var data = this.props.data

      var dataFiltered = _.map(data, d => {
            return _.omit(d, ['city', 'category', "body", "district", "endorser party", "order", "source", "index"])
          })

      console.log(dataFiltered)
    }
    return (
      null
      )
  }
}

export default TotalTable