import DataTable from "./dataTable"

var React = require("react")
const _ = require('lodash');

class Table extends React.Component {
  // constructor(props) {
  //   super(props)
  //   this.showMore = this.showMore.bind(this)
  //   this.showLess = this.showLess.bind(this)
  // }

  // showMore() {
  //   this.setState({
  //     more: true,
  //     less: false
  //   })
  // }

  // showLess() {
  //   this.setState({
  //       more: false,
  //       less: true
  //     })
  // }

  // componentWillUpdate() {

  //  const button = document.getElementById("show")



  //  console.log(this)

  //   console.log(button)
  // }

  render() {

  if (this.props.columns !== undefined) {
    let tableRows = this.props.data

   var tableColumnsFiltered = ["date", "endorser", "position", "points"]
   var tableRowsFiltered = _.map(tableRows, d => {
         return _.omit(d, ['city', 'category', "body", "district", "endorsee", "endorser party", "order", "source", "state", "index"])
       })

  }
    return (
      <DataTable  rows={tableRowsFiltered} cols={tableColumnsFiltered} />
      )
  }
}

export default Table