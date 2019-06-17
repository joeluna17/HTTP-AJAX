import React from 'react';
import Friend from './Friend';
import AddFriendForm from './AddFriendForm';
import {Link} from 'react-router-dom';

const FriendsList = props => {
 
    return (
        <div>
           <AddFriendForm stateData={props.stateData} inputChangeHandler={props.inputChangeHandler} addFriend={props.addFriend} buttonName="Save"/>
            <div className = "friend-list-wrapper">
              {
                  props.friendsList.map(friend =>{
                   return <Link to={`/friend/${friend.id}`}><Friend friend={friend} key={friend.id}/></Link>
                  })
              }   
              </div>  
        </div>
    )
}

export default FriendsList;