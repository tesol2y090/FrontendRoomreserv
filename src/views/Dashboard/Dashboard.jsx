import React, { Component } from "react";
import RenderTable from './RenderTable.jsx';
import "./form.css"

// const API_URL = "http://localhost:5000/rooms"

const API_URL = "https://roomreserv-b72c4.appspot.com/rooms"

class Dashboard extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  async componentDidMount() {
    let Rooms = await fetch(API_URL).then(res => res.json());
    let roomsArray = [Rooms.rooms]
    this.setState({
      allrooms: roomsArray.reverse()
    });
  }

  render() {
    return (<RenderTable allrooms={this.state} />)
  }
}

export default Dashboard;
