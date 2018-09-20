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

var roomAccess = firebase.database().ref('rooms');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRoom: 0,
    };

  }

  componentDidMount() {
    roomAccess.on('child_added', snapshot => {
      const room = snapshot.val();
      room.key = snapshot.key;
      var allRooms = [];
      allRooms.push(room);
      console.log(allRooms);
      this.setState({ activeRoom: allRooms[0] });
    });
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>Bloc Chat</h1>
        </header>
        <RoomList
          firebase={firebase}
        />
        <MessageList
          firebase={firebase}
        />
      </div>
    );
  }
}

export default App;
