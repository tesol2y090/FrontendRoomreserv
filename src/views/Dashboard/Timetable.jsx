import React, { Component } from 'react'
import { Modal, Button, Table } from 'react-bootstrap'
import sha256 from 'js-sha256'

// const API_URL = "http://localhost:5000/bookings"
const API_URL = "https://roomreserv-b72c4.appspot.com/bookings"

class Timetable extends Component {

    sendData(event) {
        event.preventDefault();

        let r = Math.random().toString(36).substring(7);

        const bookId = this.props.roomid + (sha256(reason+r)).substring(1, 7)
        const studentId = parseInt(event.target.studentId.value)
        const timeSelect = event.target.timeSelect.value
        const reason = event.target.reason.value
        const telePhone = event.target.telePhone.value
        const password = event.target.password.value
    
        const bookings = {
            bookId: bookId,
            AstudentId: studentId,
            BtimeSelect: timeSelect,
            CtelePhone: telePhone,
            Dreason: reason,
            Epassword: password,
            Fdate: new Date().toUTCString()
        }
    
        fetch(API_URL, {
          method: 'POST',
          body: JSON.stringify(bookings),
          headers: {
            'content-type': 'application/json'
          }
        })
    
        //reset form
        document.getElementById("addBook").reset();
      }


    render() {
        if(this.props.show) {
            return (
            <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
            >
            <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Select Time Room {this.props.roomid}
                    </Modal.Title>
            </Modal.Header>
                <Modal.Body>
                    <Table striped bordered hover size="lg">
                        <thead>
                            <tr>
                            <th>Date</th>
                            <th>09.00 - 10.00</th>
                            <th>10.00 - 11.00</th>
                            <th>11.00 - 12.00</th>
                            <th>13.00 - 14.00</th>
                            <th>14.00 - 15.00</th>
                            <th>15.00 - 16.00</th>
                            <th>16.00 - 17.00</th>
                            <th>17.00 - 18.00</th>                            
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>02/05/2019</td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                            <td> </td>
                        </tr>
                        </tbody>
                    </Table>
                        <form onSubmit = {this.sendData.bind(this)} id="addBook">
                            <div class="form-group">
                                <label id="Input">Student ID</label>
                                <input type="select" class="form-control" id="studentId"></input>
                            </div>
                            <div class="form-group">
                                <label for="exampleFormControlSelect1">Time Select</label>
                                  <select class="form-control" id="timeSelect">
                                    <option>9.00 - 10.00</option>
                                    <option>10.00 - 11.00</option>
                                    <option>11.00 - 12.00</option>
                                    <option>12.00 - 13.00</option>
                                    <option>13.00 - 14.00</option>
                                    <option>15.00 - 16.00</option>
                                    <option>16.00 - 17.00</option>
                                    <option>17.00 - 18.00</option>
                                  </select>
                              </div>
                            <div class="form-group">
                                <label id="Input">Telephon Number</label>
                                <input type="select" class="form-control" id="telePhone"></input>
                            </div>
                            <div class="form-group">
                                <label id="Input">Reason</label>
                                <textarea class="form-control" id="reason" rows="5"></textarea>
                            </div>
                            <div class="form-group">
                                  <label id="Input">Password</label>
                                  <input type="password" class="form-control" id="password"></input>
                                  <h5>Note : Password for cancel</h5>
                            </div>
                            <button type="submit" class="btn btn-light ">Submit</button>
                        </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
                    )
        } else {
            return ""
        }
        
    }
}

export default Timetable;