import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";

import { Card } from "../../components/Card/Card";
// const API_URL = "http://localhost:5000/deleteRoom"
const API_URL = "https://roomreserv-b72c4.appspot.com/deleteRoom"

class DeleteRoom extends Component {

    constructor(props) {
        super(props);
        this.deleteRoom = this.deleteRoom.bind(this);
    }

    deleteRoom(event) {
        event.preventDefault();
        const roomId = event.target.roomid.value

        const room = {
            roomId: roomId
        }


        fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify(room),
            headers: {
              'content-type': 'application/json'
            }
          })

        //reset form
        document.getElementById("deleteRoom").reset();
    }
    
    render() {

        return (
            <div>
                <Grid fluid>
                    <Row>
                      <Col md={16}>
                        <Card
                          title="Delete Room"
                          content={
                            <form onSubmit = {this.deleteRoom.bind(this)} id="deleteRoom">
                              <div class="form-group">
                                  <label id="Input">ROOMID</label>
                                  <input type="select" class="form-control" id="roomid"></input>
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

export default DeleteRoom;