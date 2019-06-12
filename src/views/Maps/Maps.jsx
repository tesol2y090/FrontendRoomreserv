import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";

// import Card from "components/Card/Card";
import Card from "../../components/Card/Card";

import CancleBook from "./CancleBook"

// const API_URL = "http://localhost:5000/rooms"
const API_URL = "https://roomreserv-b72c4.appspot.com/rooms"

class Maps extends Component {

  constructor(props) {
    super(props);
    this.state = {
        bookingsArray: {},
        findPass: []
      }
  }

  async componentDidMount() {
      let Bookings = await fetch(API_URL).then(res => res.json());
      let bookingsArray = [Bookings.bookings]
      this.setState({
          bookingsArray: bookingsArray,
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
          return all[6] === "Waiting"
      })

      allBookingsArray.sort(function(a, b) { 
        return a[5] < b[5] ? 1 : -1;
    });

      return(
        <div className="content">
          <Grid fluid>
            <Row>
              <Col lg={12} sm={6}>
                <Card
                  title = ""
                  content = {
                    <div>
                        <span class="counter pull-right"></span>
                            <table class="table table-hover table-bordered results">
                                <thead>
                                    <tr>
                                    <th>BookingId</th>
                                    <th class="col-md-2 col-xs-2">Student ID</th>
                                    <th class="col-md-2 col-xs-2">Time Select</th>
                                    <th class="col-md-2 col-xs-2">Telephone</th>
                                    <th class="col-md-4 col-xs-4">Reason</th>
                                    <th class="col-md-5 col-xs-5">Date</th>
                                    <th class="col-md-3 col-xs-2">Approve</th>
                                    
                                    </tr>
                                    <tr class="warning no-result">
                                    <td colspan="4"><i class="fa fa-warning"></i> No result</td>
                                    </tr>
                                </thead>
                        <tbody>
                        {
                                allBookingsArray.map(row => (
                                    <tr>
                                        {
                                        row.map(e => (
                                            <td onClick={() => this.setState({
                                                modalShow: true,
                                                bookid: row
                                               })}>{e.toString()}</td>
                                            ))
                                        }
                                    </tr>
                                ))
                            }
                        </tbody>
                        </table>
                    </div>
                  }
                />
              </Col>
            </Row>
          </Grid>
        </div>
      )
    } else {
        return ("")
    }

  }

  render() {
    let modalClose = () => this.setState({ modalShow: false });

        return (
            <div>
                {this.renderTable()}
                <CancleBook
                show={this.state.modalShow}
                onHide={modalClose}
                bookid={this.state.bookid}
                findPass={this.state.bookingsArray[0]}
                />
            </div>
        )
  }
}

export default Maps;
