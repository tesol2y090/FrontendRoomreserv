import React, { Component } from 'react'
import { Modal, Button, Alert } from 'react-bootstrap'

// const API_URL = "http://localhost:5000/approve"
const API_URL = "https://roomreserv-b72c4.appspot.com/deleteBooking"
// const API_URL = "http://localhost:5000/deleteBooking"


class CancleBook extends Component {

    constructor(props) {
        super(props);
        this.cancleBooking = this.cancleBooking.bind(this);
    }

    cancleBooking(event) {
        event.preventDefault();
        let bookId = this.props.bookid[0]
        let allBook = this.props.findPass
        let allBookingsArray = Object.keys(allBook).map(function(key) {
            return [String(key), ...[...Object.keys(allBook[key]).map(function(keys) {
                return allBook[key][keys]
            })]]
        })
        allBookingsArray = allBookingsArray.filter((all) => {
            return all[0] == bookId
        })
        const pass = allBookingsArray[0][5]
        const passuser = event.target.pass.value

        if(pass === passuser) {
            const book = {
                bookId: bookId
            }
            fetch(API_URL, {
                method: 'POST',
                body: JSON.stringify(book),
                headers: {
                  'content-type': 'application/json'
                }
              })
        }
        document.getElementById("cancleRoom").reset();
        
    }

    render() {
        if(this.props.show) {
            const bookId = this.props.bookid[0]
            const studentId = this.props.bookid[1]
            const timeSelect = this.props.bookid[2]
            const telephone = this.props.bookid[3]
            const reason = this.props.bookid[4]
            const date = this.props.bookid[5]
            return (
            <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
            >
            <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        CancleBooking {bookId}
                    </Modal.Title>
            </Modal.Header>
                <Modal.Body>
                    <form id="cancleRoom" onSubmit = {this.cancleBooking.bind(this)}>
                        <div class="form-group">
                            <label id="Input">Student Id</label>
                            <Alert variant='dark'>
                                {studentId}
                            </Alert>
                        </div>
                        <div class="form-group">
                            <label id="Input">Time Select</label>
                            <Alert variant='dark'>
                                {timeSelect}
                            </Alert>
                        </div>
                        <div class="form-group">
                            <label id="Input">Telephone</label>
                            <Alert variant='dark'>
                                {telephone}
                            </Alert>
                        </div>
                        <div class="form-group">
                            <label id="Input">Reason</label>
                            <Alert variant='dark'>
                                {reason}
                            </Alert>
                        </div>
                        <div class="form-group">
                            <label id="Input">Date</label>
                            <Alert variant='dark'>
                                {date}
                            </Alert>
                        </div>
                        <div class="form-group">
                            <label id="Input">Password</label>
                            <input type="password" class="form-control" id="pass"></input>
                        </div>
                        <button type="submit" class="btn btn-light ">Cancle Booking</button>
                        <button type="submit" class="btn btn-light " onClick={this.props.onHide}>Close</button>
                      </form>
                </Modal.Body>
                <Modal.Footer>
                    {/* <Button onClick={this.cancleBooking.bind(this)}>Cancle Booking</Button>
                    <Button >Close</Button> */}
                </Modal.Footer>
            </Modal>
                    )
        } else {
            return ""
        }
        
    }
}

export default CancleBook;