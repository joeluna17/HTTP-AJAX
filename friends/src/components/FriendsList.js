import React from 'react'
import Friend from './Friend';

const FriendsList = props => {
    return (
        <div>
              {
                  props.friendsList.map(friend =>{
                     return <Friend friend={friend} key={friend.id}/>
                  })
              }     
        </div>
    )
}

export default FriendsList;