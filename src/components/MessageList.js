import React, { Component } from 'react';

class MessageList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      newMessage: '',
    };

    this.messagesRef = this.props.firebase.database().ref('messages');
    this.handleChange = this.handleChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {
    this.messagesRef.on('child_added', snapshot => {
      console.log(snapshot);
      const message = snapshot.val();
      message.key = snapshot.key;
      this.setState({ messages: this.state.messages.concat( message ) });
    });
  }

  handleChange(e) {
    this.setState({ newMessage: e.target.value });
  }

  sendMessage(e) {
    e.preventDefault();
    this.messagesRef.push({
      content: this.state.newMessage,
      roomId: this.props.activeRoom.key,
      sentAt: this.props.firebase.database.ServerValue.TIMESTAMP,
      username: this.props.displayName
    });
    this.setState({ newMessage: ''});
  }


  render() {
    return (
      <section className='messagelist'>
        {
          this.state.messages.map( (message, index) =>
            <p key={index}>{message.roomId === this.props.activeRoomId ? message.content + " -" + message.username : (null)}</p>
          )
        }
        <div>
          {
            this.props.activeRoom !== undefined && this.props.currentUser === null ?
            <p>You must log in to post messages.</p> :
            this.props.activeRoom !== undefined && this.props.currentUser !== null ?
            <form onSubmit={this.sendMessage}>
              <input type="text" id="newMessage" value={this.state.newMessage} onChange={this.handleChange} />
              <input type="submit" value="Send Message" />
            </form> :
            (null)
          }
        </div>
      </section>
    );
  }
}

export default MessageList;
