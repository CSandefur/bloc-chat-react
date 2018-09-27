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
    };
    this.setActiveRoom = this.setActiveRoom.bind(this);

  }

  setActiveRoom(room) {
    console.log(room);
    this.setState({ activeRoom: room });
    console.log(this.state.activeRoom);
  }


  render() {
    return (
      <div className="App">
        <header>
          <h1>Bloc Chat</h1>
          <p>Placeholder for Active Room:</p>
        </header>
        <RoomList
          firebase={firebase}
          activeRoom={this.state.activeRoom}
          setActiveRoom={this.setActiveRoom}
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
