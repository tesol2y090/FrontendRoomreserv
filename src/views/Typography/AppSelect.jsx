import React, { Component } from 'react'
import { Modal, Button, Alert } from 'react-bootstrap'

const API_URL = "https://roomreserv-b72c4.appspot.com/approve"
const API_URL_CANCLE = "https://roomreserv-b72c4.appspot.com/approve"
// const API_URL = "http://localhost:5000/approve"
// const API_URL_CANCLE = "http://localhost:5000/cancle"

class AppSelect extends Component {

    constructor(props) {
        super(props);
        this.approveRoom = this.approveRoom.bind(this);
        this.cancleRoom = this.cancleRoom.bind(this);
    }

    approveRoom() {
        const book = {
            bookId: this.props.bookid[0]
        }
        fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify(book),
            headers: {
              'content-type': 'application/json'
            }
          })
    }

    cancleRoom() {
        const book = {
            bookId: this.props.bookid[0]
        }
        fetch(API_URL_CANCLE, {
            method: 'POST',
            body: JSON.stringify(book),
            headers: {
              'content-type': 'application/json'
            }
          })
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
                        Approve Room {bookId}
                    </Modal.Title>
            </Modal.Header>
                <Modal.Body>
                    <form id="addRoom">
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
                      </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.approveRoom.bind(this)}>Approve</Button>
                    <Button onClick={this.cancleRoom.bind(this)}>Not Approve</Button>
                    <Button onClick={this.props.onHide}>Cancle</Button>
                </Modal.Footer>
            </Modal>
                    )
        } else {
            return ""
        }
        
    }
}

export default AppSelect;