import React, { Component } from 'react';

class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');
    this.handleChange = this.handleChange.bind(this);
  //  this.handleRoomClick = this.handleRoomClick.bind(this);
  }

  componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      this.setState({ rooms: this.state.rooms.concat( room ) });
    });
  }

  handleChange(e) {
    this.setState({ newName: e.target.value });
    console.log(this.state.newName);
  }

  createRoom = (e) => {
    e.preventDefault();
    const newRoomName = this.state.newName;
    console.log(newRoomName);
    this.roomsRef.push({
      name: this.state.newName
    });
    this.setState({ newName: ''});
  }

  render() {
    return (
      <section className='roomlist'>
        {
          this.state.rooms.map( (room, index) =>
            <p key={index} onClick={() => this.props.setActiveRoom(room)}>{room.name}</p>
            /*he adds ....setActiveRoom(room.key)...*/
          )
        }
        <form onSubmit={this.createRoom}>
          <input type="text" id="newName" value={this.state.newName} onChange={this.handleChange} />
          <input type="submit" value="New Room" />
        </form>
      </section>
    );
  }
}


export default RoomList;
