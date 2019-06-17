import React from 'react';
import {Route, NavLink,Switch, Redirect} from 'react-router-dom';
import axios from 'axios';
import './App.css';
import FriendsList from './components/FriendsList';
import EditFriend from './components/EditFriend';
import{Alert, Spinner, Carousel, Button} from 'react-bootstrap';


class App extends React.Component {

  constructor(){
    super()
    this.state = {
        friendsData: [],
        name:"",
        age:"",
        email:"",
        searchtext:""
    }
  }

  componentDidMount(){

     window.setTimeout(()=>{this.getFriendsData()}, 2000)
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
          searchtext: ""
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


  getFriendsData= () =>{
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


  postToFriendsData= (friend) =>{
      axios
      .post('http://localhost:5000/friends', friend)
      .then(res => { this.setState({friendsData: res.data })})
      .then(res => {alert("Friend Successfully Added!")})
      .catch(err => {alert(`${err}`)})
  }
  

  updateUI = (name,age,email) => {
     console.log("in update UI")
    this.setState({
      name:name,
      age:age,
      email:email
    })
}

searchFriend = (e) => {
  console.log('executing search')
  e.preventDefault()
  const friend = this.state.friendsData.find(friend => 
           `${friend.name.toLowerCase()}` === this.state.searchtext.toLowerCase() 
    )
  console.log(friend)
    this.setState({
      friendsData: [friend],
    })

}


  render(){
    if (this.state.friendsData.length <= 0){
        return ( <div className ="loading-spinners-wrapper" ><Spinner animation="grow" variant="primary" /> <Spinner animation="grow" variant="success" /></div>
        )
    }

    else{
        return (
          
          <div className="App">
          <NavLink to='/'>Home</NavLink> <input type='text' name = "searchtext" placeholder="Search Friends" value={this.state.searchtext} onChange={this.inputChangeHandler}/><Button variant="success" onClick={(e)=>this.searchFriend(e)}>Go</Button><Button variant="warning" onClick={this.getFriendsData}>Clear</Button>
            <h1>Using AXIOS example: <br/>Friends List</h1>


            <Switch>
              <Route exact path="/" render = {props => <FriendsList {...props} friendsList={this.state.friendsData} stateData={this.state} inputChangeHandler={this.inputChangeHandler} addFriend={this.addNewFriend} buttonName="Save"/>} />
              <Route path="/friend/:id" render={props => <EditFriend {...props} updateUI={this.updateUI} friendsData={this.state.friendsData} updateFriend={this.updateFriend} inputChangeHandler={this.inputChangeHandler} deleteFriend={this.deleteFriend} segueIdentifier="editForm" />}/>
            </Switch>
          </div>
        );
      }
  }

}

export default App;
