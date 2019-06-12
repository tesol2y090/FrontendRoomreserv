import React, { Component } from "react";
import { Grid, Row, Col, Button, ButtonToolbar } from "react-bootstrap";

// import { Card } from "components/Card/Card.jsx";
import { Card } from "../../components/Card/Card";
import Timetable from "./Timetable"
import "./form.css"

class renderTable extends Component {

 constructor(props) {
    super(props)
    this.state = { 
        modalShow: false,
        allroomsArray: []
    };
 }

  renderTable() {

    if(!(Object.entries(this.props.allrooms).length === 0 && this.props.allrooms.constructor === Object)) {
        const allrooms = this.props.allrooms.allrooms["0"]
        let allroomsArray = Object.keys(allrooms).map(function(key) {
            return [String(key), ...[...Object.keys(allrooms[key]).map(function(keys) {
                return allrooms[key][keys]
            })]]
        })

        return(
            <div className="content">
              <Grid fluid>
                <Row>
                  <Col lg={12} sm={6}>
                    <Card
                      title = "Search"
                      content = {
                      <div>
                        <div class="form-group pull-right">
                          <input type="text" class="search form-control" placeholder="What you looking for?"/>
                        </div>
                      <span class="counter pull-right"></span>
                        <table class="table table-hover table-bordered results">
                          <thead>
                            <tr>
                              <th>RoomId</th>
                              <th class="col-md-5 col-xs-5">Builind</th>
                              <th class="col-md-4 col-xs-4">Room</th>
                              <th class="col-md-3 col-xs-3">Amount</th>
                              <th class="col-md-3 col-xs-2">Facilities</th>
                              
                            </tr>
                            <tr class="warning no-result">
                              <td colspan="4"><i class="fa fa-warning"></i> No result</td>
                            </tr>
                          </thead>
                          <tbody>
                          {
                                allroomsArray.map(row => (
                                    <tr>
                                        {
                                          row.map(e => (
                                                <td onClick={() => this.setState({
                                                     modalShow: true,
                                                     roomid: row[0]
                                                    })}>{e}</td>
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
        <Timetable
          show={this.state.modalShow}
          onHide={modalClose}
          roomid={this.state.roomid}
        />
        </div>
    
    )
  }
}

export default renderTable;
