import React from 'react';
import {Route, NavLink,Switch, Redirect} from 'react-router-dom';
import axios from 'axios';
import './App.css';
import FriendsList from './components/FriendsList';
import EditFriend from './components/EditFriend';


class App extends React.Component {

  constructor(){
    super()
    this.state = {
        friendsData: [],
        name:"",
        age:"",
        email:"",
    }
  }

  componentDidMount(){

      this.getFriendsData()

  }

  inputChangeHandler = (e) => {
    
     const name = e.target.name
     const value = e.target.value
    
      this.setState({
       [name]: value,
      })
    }


  addNewFriend = (e) => { 
    e.preventDefault();
    
    const newFiend = {
      name: this.state.name,
      age: this.state.age,
      email: this.state.email
    }

    this.postToFriendsData(newFiend) // Important note: you post the new addition to the server but if will not render the changes becuase setState is not called and there is no other .get request from the server so you still have to add to the local state memory and here. This way it will update what the user sees and persist to the server data.

      this.setState({
          //friendsData: [...this.state.friendsData, newFiend],
          name:"",
          age:"",
          email:"",
      })
  }

  updateFriend = (e,id)=>{
    e.preventDefault()

    const newFiend = {
      name: this.state.name,
      age: this.state.age,
      email: this.state.email
    }

    axios.put(`http://localhost:5000/friends/${id}`, newFiend)
    .then(res => {
      console.log(res)
        this.setState({
          friendsData: res.data
        })
    }).then(res => 
      this.setState({
        name:"",
        age:"",
        email:"",
    })
      )
    .then(res => {alert('Update Successful!')})
    .catch((err) => {alert('There was and Error', err )})
  }


  deleteFriend = (e,id)=>{
    e.preventDefault()
      axios.delete(`http://localhost:5000/friends/${id}`)
      .then(res => {
        this.setState({
          friendsData: res.data
        })
      })
      .then(res => {
        alert("Delete Successful, you didn't need them anyways!")
        
      })
      .catch(err => {
        alert("There was an Error", err)
      })

  }




  getFriendsData(){
    axios
    .get('http://localhost:5000/friends')
    .then(res => {
      console.log(res.data)
      this.setState({friendsData: res.data })
      // I think we need to implement some success indicator like a loading bar or some UI for the user in the next .then() 
    }).catch(err => {
          alert(`Error while fething data ${err}`)
    })
  }


  postToFriendsData(friend){
      axios
      .post('http://localhost:5000/friends', friend)
      .then(res => { this.setState({friendsData: res.data })})
      .then(res => {alert("Friend Successfully Added!")})
      .catch(err => {alert(`${err}`)})
  }


  render(){
  return (
    <div className="App">
     <NavLink to='/'>Home</NavLink>
      <h1>Using AXIOS example: <br/>Friends List</h1>
      <Switch>
        <Route exact path="/" render = {props => <FriendsList {...props} friendsList={this.state.friendsData} stateData={this.state} inputChangeHandler={this.inputChangeHandler} addFriend={this.addNewFriend} buttonName="Save"/>} />
        <Route path="/friend/:id" render={props => <EditFriend {...props} friendsData={this.state.friendsData} updateFriend={this.updateFriend} inputChangeHandler={this.inputChangeHandler} deleteFriend={this.deleteFriend} segueIdentifier="editForm" />}/>
      </Switch>
    </div>
  );
}
}

export default App;
