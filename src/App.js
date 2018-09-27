import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCVPTG4Ipd-ixc0QymFqCyhQdLz9mdkuFg",
  authDomain: "bloc-chat-react-1475d.firebaseapp.com",
  databaseURL: "https://bloc-chat-react-1475d.firebaseio.com",
  projectId: "bloc-chat-react-1475d",
  storageBucket: "bloc-chat-react-1475d.appspot.com",
  messagingSenderId: "416612472491"
};
firebase.initializeApp(config);


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRoom: undefined,
      roomTitle: '',
    };

  }

  setActiveRoom(room) {
    const activeRoomName = room.name;
    console.log(activeRoomName);
    this.setState({ activeRoom: room });
    this.setState({ roomTitle: activeRoomName });
  }


  render() {
    return (
      <div className="App">
        <header>
          <h1>Bloc Chat</h1>
          <p>Active Room: {this.state.roomTitle}</p>
        </header>
        <RoomList
          firebase={firebase}
          activeRoom={this.state.activeRoom}
          setActiveRoom={this.setActiveRoom.bind(this)}
          //setActiveRoom={() => this.setActiveRoom()}
        />
        <MessageList
          firebase={firebase}
          activeRoom={this.state.activeRoom}
        />
      </div>
    );
  }
}

export default App;
