import React, { Component } from "react";
import { Grid, Row, Col, Tabs, Tab, Button } from "react-bootstrap";
import sha256 from 'js-sha256'

// import { Card } from "components/Card/Card.jsx";
import { Card } from "../../components/Card/Card";

import Approve from "./Approve";
import EditRoom from "./EditRoom"
import DeleteRoom from "./DeleteRoom"

// const API_URL = "http://localhost:5000/rooms"
const API_URL = "https://roomreserv-b72c4.appspot.com/rooms"


class Typography extends Component {

  constructor(props) {
      super(props);
      this.state = {
        isLogin: false,
        key: 'home',
      }
      this.sendData = this.sendData.bind(this);
  }

  login(event) {
    const user = event.target.user.value
    const pass = event.target.pass.value
    if(user === "admin" && sha256(pass) === "945cb3f2ebe03333b474476dd9e0e9d8c55e58e49b06fd841ef140facaa42778") {
      this.setState({
        isLogin: true
      })
    } else {
      
    }
  }

  sendData(event) {
    event.preventDefault();
    const roomid = event.target.roomid.value
    const building = event.target.buildingselect.value
    const roomselect = event.target.roomselect.value
    const amount = parseInt(event.target.amount.value)
    const facilities = event.target.facilities.value

    const room = {
      roomid: roomid,
      Abuildingselect: building,
      Broomselect: roomselect,
      Camount: amount,
      Dfacilities: facilities
  }

    fetch(API_URL, {
      method: 'POST',
      body: JSON.stringify(room),
      headers: {
        'content-type': 'application/json'
      }
    })

    //reset form
    document.getElementById("addRoom").reset();
  }

  render() {
    return (
      <div>
          {this.state.isLogin ? <div className="content">
              <Tabs
                id="controlled-tab-example"
                activeKey={this.state.key}
                onSelect={key => this.setState({ key })}
              >
                <Tab eventKey="home" title="Add Room">
                  <Grid fluid>
                    <Row>
                      <Col md={16}>
                        <Card
                          title=""
                          content={
                            <form onSubmit = {this.sendData.bind(this)} id="addRoom">
                              <div class="form-group">
                                  <label id="Input">ROOMID</label>
                                  <input type="select" class="form-control" id="roomid"></input>
                              </div>
                              <div class="form-group">
                                <label for="exampleFormControlSelect1">Building</label>
                                  <select class="form-control" id="buildingselect">
                                    <option>Makamakut</option>
                                    <option>​TAB</option>
                                    <option>Mahavachiruthit</option>
                                  </select>
                              </div>
                              <div class="form-group">
                                  <label id="Input">Room</label>
                                  <input type="select" class="form-control" id="roomselect"></input>
                              </div>
                              <div class="form-group">
                                  <label id="Input">Amount</label>
                                  <input type="select" class="form-control" id="amount"></input>
                              </div>
                              <div class="form-group">
                                  <label id="Input">Facilities</label>
                                  <textarea class="form-control" id="facilities" rows="5"></textarea>
                              </div>
                              <button type="submit" class="btn btn-light ">Submit</button>
                            </form>
                          }
                        />
                      </Col>
                    </Row>
                  </Grid>
                </Tab>

                <Tab eventKey="approve" title="Approve">
                    <Approve />
                </Tab>

                <Tab eventKey="editRoom" title="Edit Room">
                    <EditRoom />
                </Tab>

                <Tab eventKey="deleteRoom" title="Delete Room">
                    <DeleteRoom />
                </Tab>
              </Tabs>
            </div> : 

                <Grid fluid>
                    <Row>
                      <Col md={16}>
                        <Card
                          title="Login"
                          content={
                            <form onSubmit = {this.login.bind(this)} id="addRoom">
                              <div class="form-group">
                                  <label id="Input">User</label>
                                  <input type="select" class="form-control" id="user"></input>
                              </div>
                              <div class="form-group">
                                  <label id="Input">Password</label>
                                  <input type="password" class="form-control" id="pass"></input>
                              </div>
                              <Button variant="primary" type="submit"> Submit </Button>
                            </form>
                          }
                        />
                      </Col>
                    </Row>
                </Grid>
          }
      </div>
    );
  }
}

export default Typography;
