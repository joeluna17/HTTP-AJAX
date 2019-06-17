import React from 'react';
import AddFriendsForm from './AddFriendForm'
import Friend from './Friend'

const EditFriend = props => {
        const id = props.match.params.id;
        const friend = props.friendsData.find(friend => `${friend.id}` === id)

        return(
                <div>
                    <h1>Edit Friend</h1>
                    <AddFriendsForm history={props.history} stateData ={props} friend={friend} buttonName="Save Updates" updateFriend ={props.updateFriend} inputChangeHandler={props.inputChangeHandler} deleteFriend={props.deleteFriend} updateUI={props.updateUI} segueIdentifier={props.segueIdentifier} />
                    <div className="edit-friend-card-wrapper"><Friend className="edit-friend" friend={friend} /></div>
                </div>
        )

}

export default EditFriend;