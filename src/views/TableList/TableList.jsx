import React, { Component } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";

import { Card } from "../../components/Card/Card";
import { responsiveBar } from "../../variables/Variables";

const API_URL = "https://roomreserv-b72c4.appspot.com/rooms"

class TableList extends Component {

  constructor(props) {
    super(props);
    this.state = {
        bookingsArray: {}
      }
  }

  async componentDidMount() {
      let Bookings = await fetch(API_URL).then(res => res.json());
      let bookingsArray = [Bookings.bookings]
      this.setState({
          bookingsArray: bookingsArray
      })
  }

  renderTable() {
    if(!(Object.entries(this.state.bookingsArray).length === 0 && this.state.bookingsArray.constructor === Object)) {
      const allBookings = this.state.bookingsArray["0"]
      let allBookingsArray = Object.keys(allBookings).map(function(key) {
          return [String(key), ...[...Object.keys(allBookings[key]).map(function(keys) {
              return allBookings[key][keys]
          })]]
      })

      allBookingsArray = allBookingsArray.map((all) => {
        all.splice(5,1)
        return all
    })

        allBookingsArray = allBookingsArray.filter((all) => {
          return all[6] === "Approved"
      })
      
      // LineChart Preprocess
      const timeLineChart = ["9.00 - 10.00", "10.00 - 11.00", "11.00 - 12.00", "12.00 - 13.00",
                             "13.00 - 14.00", "14.00 - 15.00", "15.00 - 16.00", "16.00 - 17.00", "17.00 - 18.00" ]
      const frequencTime = []
      for (let i = 0; i < allBookingsArray.length; i++) {
        frequencTime.push(allBookingsArray[i][2])
      }
      const freqTimeLineChart = [0, 0, 0, 0, 0, 0, 0, 0, 0]

      for (let i = 0; i < timeLineChart.length; i++) {        
        let newValue = 0;
        for (let j = 0; j < frequencTime.length; j++) {
          if(timeLineChart[i] === frequencTime[j]) {
            newValue++;
          }
        }
        freqTimeLineChart[i] = newValue;
      }
      
      const dataFreqTimeLineChart = {labels : timeLineChart, series : [freqTimeLineChart]}
      const maxValueFreqTimeLineChart = Math.max(...freqTimeLineChart)
      const optionFreqTimeLineChart = {low: 0, high: maxValueFreqTimeLineChart + 2, 
                                       showArea: false, axisX: {showGrid: false}, lineSmooth: false}

      // BarChart Preprocessing
      const frequencUser = []
      for (let i = 0; i < allBookingsArray.length; i++) {
        frequencUser.push(allBookingsArray[i][1])
      }


      const rawFreqUser = {};
      for(var i = 0; i < frequencUser.length; ++i) {
          if(!rawFreqUser[frequencUser[i]]) {
            rawFreqUser[frequencUser[i]] = 0;
          }
          ++rawFreqUser[frequencUser[i]];
      }


      let labelBarChart = Object.keys(rawFreqUser)
      let freqUserBarChart = Object.values(rawFreqUser)
      if (labelBarChart.length >= 10) {
        labelBarChart = labelBarChart.slice(0, 10)
        freqUserBarChart = freqUserBarChart.slice(0, 10)
      } else {
        labelBarChart = labelBarChart
        freqUserBarChart = freqUserBarChart
      }

      const dataBarChart = {labels: labelBarChart, series: [freqUserBarChart]}
      const optionBarChart = {seriesBarDistance: 10, axisX: {showGrid: false}, height: "245px"}

      // PieChart Preprocessing
      const frequencBuilding = []
      for (let i = 0; i < allBookingsArray.length; i++) {
        frequencTime.push(allBookingsArray[i][2])
        if(allBookingsArray[i][0].length == 13) {
          const building = allBookingsArray[i][0]
          frequencBuilding.push(building.substring(0, 4))
        } else {
          const building = allBookingsArray[i][0]
          frequencBuilding.push(building.substring(0, 3))
        }
      }

      const rawFreqBuilding = {};
      for(var i = 0; i < frequencBuilding.length; ++i) {
          if(!rawFreqBuilding[frequencBuilding[i]]) {
            rawFreqBuilding[frequencBuilding[i]] = 0;
          }
          ++rawFreqBuilding[frequencBuilding[i]];
      }

      let labelPieChart = Object.keys(rawFreqBuilding)
      let namePieChart = labelPieChart
      let freqUserPieChart = Object.values(rawFreqBuilding)
      const sumPieChart = freqUserPieChart[0] + freqUserPieChart[1] +freqUserPieChart[2]
      freqUserPieChart = freqUserPieChart.map((all) => {
        return all / sumPieChart * 100
      })
      labelPieChart = freqUserPieChart.map((all) => {
        return all.toString().substring(0,5) + "%"
      })

      const useDataPie = {labels: labelPieChart, series: freqUserPieChart}
      const useLegendPie = {names: namePieChart, types: ["info", "danger", "warning"]}

      return(
        <Row>

            <Col md={12}>
              <Card
                statsIcon="fa fa-history"
                id="chartHours"
                title="Most Time Frequence Booking"
                category="24 Hours Booking"
                stats="Updated 1 minutes ago"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={dataFreqTimeLineChart}
                      type="Line"
                      options={optionFreqTimeLineChart}
                    />
                  </div>
                }
              />
            </Col>

            <Col md={12}>
              <Card
                id="chartActivity"
                title="Most User Frequence Booking"
                category="All time user booking"
                stats="Updated 1 minutes ago"
                statsIcon="fa fa-history"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={dataBarChart}
                      type="Bar"
                      options={optionBarChart}
                      responsiveOptions={responsiveBar}
                    />
                  </div>
                }
              />
            </Col>

            <Col md={12}>
              <Card
                statsIcon="fa fa-history"
                title="Most User Frequence Booking"
                category="All time building booking"
                stats="Updated 1 minutes ago"
                content={
                  <div
                    id="chartPreferences"
                    className="ct-chart ct-perfect-fourth"
                  >
                    <ChartistGraph data={useDataPie} type="Pie" />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(useLegendPie)}</div>
                }
              />
            </Col>

      </Row>
      )
    } else {
      return(
        " "
      )
    }
  }

  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }

  render() {
    return (
      <div>
        {this.renderTable()}
      </div>
    );
  }
}

export default TableList;
