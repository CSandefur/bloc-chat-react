import React, { Component } from 'react';

class User extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    this.props.firebase.auth().onAuthStateChanged( user => {
      console.log(user);
      this.props.setUser(user);
    });
  }

  handleSignIn = () => {
    const provider = new this.props.firebase.auth.GoogleAuthProvider();
    this.props.firebase.auth().signInWithPopup( provider );
  }

  handleSignOut = () => {
    this.props.firebase.auth().signOut();
    this.props.resetUser();
  }

  render() {
    return (
      <section className="userManagement">
        {/*<h4>{this.props.currentUser.displayName}</h4>
        <h4>{this.props.user.displayName}</h4>*/}
        <h4>{this.props.displayName}</h4>
        <input type="button" id="signInButton" value="Sign In" onClick={() => this.handleSignIn()}/>
        <input type="button" id="signOutButton" value="Sign Out" onClick={() => this.handleSignOut()}/>
      </section>
    );
  }
}

export default User;
