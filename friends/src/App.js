import React from 'react';
import {Route, NavLink} from 'react-router-dom';
import axios from 'axios';
import './App.css';
import FriendsList from './components/FriendsList';

class App extends React.Component {

  constructor(){
    super()
    this.state = {
        friendsData: [],
    }
  }

  componentDidMount(){

    axios
    .get('http://localhost:5000/friends')
    .then(res => {
      this.setState({friendsData: res.data })
      // I think we need to implement some success indicator like a loading bar or some UI for the user in the next .then() 
    }).catch(err => {
          alert(`Error while fething data ${err}`)
    })

  }

  render(){
  return (
    <div className="App">
      <h1>Using AXIOS example: <br/>Friends List</h1>
      <FriendsList friendsList={this.state.friendsData} />
    </div>
  );
}
}

export default App;


// data object model 
// age: 30
// email: "ben@lambdaschool.com"
// id: 1
// name: "Ben"