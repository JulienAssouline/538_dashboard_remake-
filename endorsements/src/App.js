import './App.css';
import data from './endorsements-2020.csv';
import Table from "./Table"
import GridMap from "./GridMap"
import TableChart from "./TableChart"
import PointKey from "./PointKey"
import TotalTable from "./TotalTable"
var React = require("react")
var d3 = require("d3")

class App extends React.Component {

  constructor(props) {
    super(props)
    this.showMoreBooker = this.showMoreBooker.bind(this)
    this.showLessBooker = this.showLessBooker.bind(this)
    this.showMoreHarris = this.showMoreHarris.bind(this)
    this.showLessHarris = this.showLessHarris.bind(this)
    this.onHover = this.onHover.bind(this)
    this.event = { hover: "none" }
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

  onHover(d) {
    this.setState({
      hover: d
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
      <div className = "explination">
      <p> This is a remake of <a href = "https://projects.fivethirtyeight.com/2020-endorsements/democratic-primary/?ex_cid=rrpromo"> FiveThirtyEight's endorsement </a> dashboard. All design and data comes from them. This was an exercise in building a medium sized React application and combining it with D3. The application isn't live so the data I am using is outdated. I learned a lot, and you can find all of the source code <a href="https://github.com/JulienAssouline/538_dashboard_remake-">here</a>. </p>
      </div>
      <h1> The 2020 Endorsement Primary [Remake] </h1>
      <p style = {{ fontSize: 18}}> Which Democratic candidates are receiving the most support from prominent members of their party? </p>
      <br />
      <br />
      <br />
      <div className = "summary_container">
      <TableChart data = {data}  hoverElement={this.state.hover} onHover = {this.onHover} />
      <PointKey />
      </div>
      <br />
      <br />
      <div className = "endorsee_top">
      <div className="line"> </div>
      <img className = "endorsee_img" src={require("./CoryBooker.png")} alt={"Cory Booker"}/>
      </div>
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
      <br />
       <br />
        <br />
         <br />
      <div className = "endorsee_top">
            <div className="line"> </div>
            <img className = "endorsee_img" src={require("./AmyKlobuchar.png")} alt={"Amy Klobuchar"}/>
      </div>
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
              <br />
               <br />
                <br />
                 <br />
        <div className = "endorsee_top">
                    <div className="line"> </div>
                    <img className = "endorsee_img" src={require("./KamalaHarris.png")} alt={"Kamala Harris"}/>
        </div>
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
      <br />
       <br />
        <br />
         <br />
      <div className = "endorsee_top">
          <div className="line"> </div>
          <img className = "endorsee_img" src={require("./BernieSanders.png")} alt={"Bernie Sanders"}/>
      </div>
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
      <br />
       <br />
        <br />
         <br />
        <div className = "endorsee_top">
          <div className="line"> </div>
          <img className = "endorsee_img" src={require("./JoeBiden.png")} alt={"Joe Biden"}/>
        </div>
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
         <div className = "endorsee_top">
                   <div className="line"> </div>
                   <img className = "endorsee_img" src={require("./ElizabethWarren.png")} alt={"Elizabeth Warren"}/>
                 </div>
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
            <div className = "endorsee_top">
                 <div className="line"> </div>
                 <img className = "endorsee_img" src={require("./JulianCastro.png")} alt={"Julian Castro"}/>
            </div>
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
            <div className = "endorsee_top">
                 <div className="line"> </div>
                 <img className = "endorsee_img" src={require("./JohnDelaney.png")} alt={"John Delaney"}/>
              </div>
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
            <div className = "endorsee_top">
                 <div className="line"> </div>
                 <img className = "endorsee_img" src={require("./JayInslee.png")} alt={"Jay Inslee"}/>
              </div>
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
                <div className = "endorsee_top">
                   <div className="line"> </div>
                   <img className = "endorsee_img" src={require("./MichaelBloomberg.png")} alt={"Michael Bloomberg"}/>
                </div>
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
                  <TotalTable data = {data} />
      </div>
    );
  }
}

export default App;
