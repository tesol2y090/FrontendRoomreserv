import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";

import { Card } from "../../components/Card/Card";
// const API_URL = "http://localhost:5000/editRoom"
const API_URL = "https://roomreserv-b72c4.appspot.com/editRoom"

class EditRoom extends Component {

    constructor(props) {
        super(props);
        this.editRoom = this.editRoom.bind(this);
    }

    editRoom(event) {
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
        document.getElementById("editRoom").reset();
    }
    
    render() {

        return (
            <div>
                <Grid fluid>
                    <Row>
                      <Col md={16}>
                        <Card
                          title="Edit Room"
                          content={
                            <form onSubmit = {this.editRoom.bind(this)} id="editRoom">
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
            </div>
        )
    }
}

export default EditRoom;