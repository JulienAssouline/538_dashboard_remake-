import './App.css';
import data from './endorsements-2020.csv';
import Table from "./Table"
import GridMap from "./GridMap"
import TableChart from "./TableChart"
var React = require("react")
var d3 = require("d3")

class App extends React.Component {

  constructor(props) {
    super(props)
    this.showMoreBooker = this.showMoreBooker.bind(this)
    this.showLessBooker = this.showLessBooker.bind(this)
    this.showMoreHarris = this.showMoreHarris.bind(this)
    this.showLessHarris = this.showLessHarris.bind(this)
  }

  state = {
    data: [],
    screenWidth: window.innerWidth,
    screenHeight: 500,
    harrisMore: true,
    bookerMore: true
  }

  showMoreBooker() {
    this.setState({
      bookerMore: true,
    })
  }

  showLessBooker() {
    this.setState({
        bookerMore: false,
      })
  }

  showMoreHarris() {
    this.setState({
      harrisMore: true,
    })
  }

  showLessHarris() {
    this.setState({
        harrisMore: false,
      })
  }


  componentWillMount() {
    d3.csv(data)
      .then(data => {

        data.forEach(d => d.points = +d.points)

        this.setState({
          data
        })

      })
  }

  render() {

    const { data } = this.state

    // filter data

    let harris_data = data.filter((d) => d.endorsee === "Kamala Harris")
    let booker_data = data.filter((d) => d.endorsee === "Cory Booker")
    const amy_data = data.filter((d) => d.endorsee === "Amy Klobuchar")
    const bernie_data = data.filter((d) => d.endorsee === "Bernie Sanders")
    const biden_data = data.filter((d) => d.endorsee === "Joe Biden")
    const elizabeth_data = data.filter((d) => d.endorsee === "Elizabeth Warren")
    const julian_data = data.filter((d) => d.endorsee === "Julian Castro")
    const john_data = data.filter((d) => d.endorsee === "John Delaney")
    const jay_data = data.filter((d) => d.endorsee === "Jay Inslee")
    const michael_data = data.filter((d) => d.endorsee === "Michael Bloomberg")

    if (this.state.harrisMore === true) {
      harris_data.forEach((d, i) => {
        d.index = i
      })

      harris_data = harris_data.filter(d => d.index < 10)
    }

    if (this.state.bookerMore === true) {
      booker_data.forEach((d, i) => {
        d.index = i
      })

      booker_data = booker_data.filter(d => d.index < 10)
    }

    const columns = data.columns

   const booker = document.getElementById("Booker")
   const harris = document.getElementById("Harris")
   if (booker !== null) {
    this.state.bookerMore === true ? booker.innerText = "Show More" : booker.innerText = "Show Less"
    this.state.harrisMore === true ? harris.innerText = "Show More" : harris.innerText = "Show Less"
   }

    return (
      <div className="App">
      <TableChart data = {data} />
      <hr
        style={{
            color: "lightgrey",
        }} />
      <br />
      <h1> Cory Booker </h1>
       <p> U.S. senator from New Jersey </p>
       <br />
       <div id= "endorsee">
      <GridMap width = {this.state.screenWidth} data = {booker_data} name = {"Cory Booker"} />
      <div id = "tables">
        <Table bookerMore = {this.state.bookerMore} data = { booker_data } columns = { columns } />
        <button onClick = {this.state.bookerMore=== false? this.showMoreBooker : this.showLessBooker } id="Booker"> Show More </button>
      </div>
      </div>
      <br />
      <hr
        style={{
            color: "lightgrey",
        }}
        />
        <br />
        <h1> Amy Klobuchar </h1>
        <p> U.S. senator from Minnesota </p>
        <br />
        <div id= "endorsee">
        <GridMap width = {this.state.screenWidth} data = {booker_data} name = {"Amy Klobuchar"} />
        <div id = "tables">
          <Table data = { amy_data } columns = { columns } />
        </div>
        </div>

        <br />
        <hr
          style={{
              color: "lightgrey",
          }}
          />
          <br />
      <h1> Kamala Harris </h1>
      <p> U.S. senator from California </p>
      <br />
      <div id= "endorsee">
      <GridMap width = {this.state.screenWidth} data = {booker_data} name = {"Kamala Harris"} />
      <div id = "tables">
        <Table harrisMore = {this.state.harrisMore} data = { harris_data } columns = { columns } />
        <button onClick = {this.state.harrisMore=== false? this.showMoreHarris : this.showLessHarris } id="Harris"> Show More </button>
      </div>
      </div>
      <br />
      <hr
        style={{
            color: "lightgrey",
        }}
        />
        <br />
        <h1> Bernie Sanders </h1>
        <p> U.S. senator from Vermont </p>
        <br />
        <div id= "endorsee">
        <GridMap width = {this.state.screenWidth} data = {booker_data} name = {"Bernie Sanders"} />
        <div id = "tables">
          <Table data = { bernie_data } columns = { columns } />
        </div>
        </div>
        <br />
        <hr
          style={{
              color: "lightgrey",
          }}
          />
          <br />
        <h1> Joe Biden </h1>
        <p> former vice president </p>
        <br />
        <div id= "endorsee">
        <GridMap width = {this.state.screenWidth} data = {booker_data} name = {"Joe Biden"} />
        <div id = "tables">
          <Table data = { biden_data } columns = { columns } />
        </div>
        </div>
         <br />
          <br />
          <hr
            style={{
                color: "lightgrey",
            }}
            />
            <br />
          <h1> Elizabeth Warren </h1>
          <p> U.S. senator from Massachusetts </p>
          <br />
          <div id= "endorsee">
           <GridMap width = {this.state.screenWidth} data = {booker_data} name = {"Elizabeth Warren"} />
           <div id = "tables">
             <Table data = { elizabeth_data } columns = { columns } />
           </div>
           </div>
           <br />
            <br />
            <hr
              style={{
                  color: "lightgrey",
              }}
              />
              <br />
            <h1> Julian Castro </h1>
            <p> former U.S. secretary of Housing and Urban Development </p>
            <br />
            <div id= "endorsee">
            <GridMap width = {this.state.screenWidth} data = {booker_data} name = {"Julian Castro"} />
            <div id = "tables">
              <Table data = { julian_data } columns = { columns } />
            </div>
            </div>
             <br />
            <hr
              style={{
                  color: "lightgrey",
              }}
              />
              <br />
              <br />
            <h1> John Delaney </h1>
            <p> former U.S. representative from Maryland </p>
            <br />
            <div id= "endorsee">
            <GridMap width = {this.state.screenWidth} data = {booker_data} name = {"John Delaney"} />
            <div id = "tables">
              <Table data = { john_data } columns = { columns } />
            </div>
            </div>
             <br />
            <hr
              style={{
                  color: "lightgrey",
              }}
              />
              <br />
                <br />
              <h1> Jay Inslee </h1>
              <p> governor of Washington </p>
              <br />
              <div id= "endorsee">
              <GridMap width = {this.state.screenWidth} data = {booker_data} name = {"Jay Inslee"} />
              <div id = "tables">
                <Table data = { jay_data } columns = { columns } />
              </div>
              </div>
               <br />
                <br />
                <hr
                  style={{
                      color: "lightgrey",
                  }}
                  />
                  <br />
                <h1> Michael Bloomberg </h1>
                <p> former mayor of New York </p>
                <br />
                <div id= "endorsee">
                <GridMap width = {this.state.screenWidth} data = {booker_data} name = {"Michael Bloomberg"} />
                <div id = "tables">
                  <Table data = { michael_data } columns = { columns } />
                </div>
                </div>
                 <br />
                  <br />
      </div>
    );
  }
}

export default App;
