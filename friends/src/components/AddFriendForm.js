import React from 'react';
import {Redirect} from 'react-router-dom';




const AddFriendForm = props => {

        if(props.segueIdentifier === 'editForm') {
            
            {
                return(
                    <div>
                    <form onSubmit={(e) => props.updateFriend(e, props.friend.id)}>
                        <input type='text' name='name' placeholder={props.friend.name} value={props.stateData.name} onChange={(e) => props.inputChangeHandler(e)}/>
                        <input type='text' name='age' placeholder={props.friend.age} value={props.stateData.age} onChange={(e) => props.inputChangeHandler(e)}/>
                        <input type='text' name='email' placeholder={props.friend.email} value={props.stateData.email} onChange={(e) => props.inputChangeHandler(e)}/>
                        <button onClick={(e) => props.updateFriend(e, props.friend.id)}>{props.buttonName}</button>
                        <button onClick={(e) => {return props.deleteFriend(e, props.friend.id, props.history.push('/'))}} >Delete</button>
                    </form>
                </div>
            )}
        }

        else{

        return(
            <div>
                <form onSubmit={(e) => props.addFriend(e)}>
                    <input type='text' name='name' placeholder='Enter Friend Name' value={props.stateData.name} onChange={props.inputChangeHandler}/>
                    <input type='text' name='age' placeholder='Enter Friend Age' value={props.stateData.age} onChange={props.inputChangeHandler}/>
                    <input type='text' name='email' placeholder='Enter Friend Email' value={props.stateData.email} onChange={props.inputChangeHandler}/>
                    <button onClick={(e) => props.addFriend(e)} >{props.buttonName}</button>
                </form>
            </div>
        )
        }

}

export default AddFriendForm;