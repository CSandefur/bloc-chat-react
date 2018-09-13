import React, { Component } from 'react';
import './App.css';
import * as firebase from 'firebase';
import RoomList from './components/RoomList';

"https://www.gstatic.com/firebasejs/5.4.2/firebase.js"
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
  render() {
    return (
      <div className="App">
        <header>
          <h1>Bloc Chat</h1>
        </header>
        <RoomList
          firebase={firebase}
        />
      </div>
    );
  }
}

export default App;
