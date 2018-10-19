import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';
import MessageList from './components/MessageList';
import User from './components/User';

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
      activeRoomId: '',
      currentUser: undefined,
      displayName: "Guest",
    };

  }

  setActiveRoom(room) {
    const activeRoomName = room.name;
    const newRoomId = room.key;
    console.log(activeRoomName);
    this.setState({ activeRoom: room });
    this.setState({ roomTitle: activeRoomName });
    this.setState({ activeRoomId: newRoomId });
  }

  setUser(user) {
    if (user !== null) {
      const name = user.displayName;
      this.setState({ displayName: name });
    }
    this.setState({ currentUser: user });
  }

  resetUser() {
    this.setState({ displayName: "Guest"});
  }


  render() {
    return (
      <div className="App">
        <header>
          <h1>Bloc Chat</h1>
          <h3>Active Room: {this.state.roomTitle}</h3>
        </header>
        <RoomList
          firebase={firebase}
          activeRoom={this.state.activeRoom}
          setActiveRoom={this.setActiveRoom.bind(this)}
          //setActiveRoom={() => this.setActiveRoom()}
          //though it normally works, don't do the above because of the onClick format in RoomList.js (it requires a parameter)
          //you can also bind it in the constructor and it will work, or in the method, but the format on line 51 is what was causing issues
        />
        <MessageList
          firebase={firebase}
          activeRoom={this.state.activeRoom}
          activeRoomId={this.state.activeRoomId}
          currentUser={this.state.currentUser}
          displayName={this.state.displayName}
        />
        <User
          firebase={firebase}
          currentUser={this.state.currentUser}
          setUser={this.setUser.bind(this)}
          displayName={this.state.displayName}
          resetUser={this.resetUser.bind(this)}
        />
      </div>
    );
  }
}

export default App;
