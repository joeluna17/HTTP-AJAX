import React from 'react';
import {Button} from 'react-bootstrap';



const AddFriendForm = props => {
      
        if(props.segueIdentifier === 'editForm') {
            
            {
                return(
                    <div className="friends-form" >
                    <form onSubmit={(e) => {props.updateFriend(e, props.friend.id)}} className="edit-form">
                        <button onClick={(e)=>{return e.preventDefault(),props.updateUI(props.friend.name, props.friend.age, props.friend.email)}}>UPDATE UI</button>
                        <input type='text' name='name' defaultValue={props.friend.name} value={props.stateData.name} onChange={(e) => props.inputChangeHandler(e)}/>
                        <input type='text' name='age' defaultValue={props.friend.age} value={props.stateData.age} onChange={(e) => props.inputChangeHandler(e)}/>
                        <input type='text' name='email' defaultValue={props.friend.email} value={props.stateData.email} onChange={(e) => props.inputChangeHandler(e)}/>
                        <Button variant="primary" onClick={(e) => props.updateFriend(e, props.friend.id)}>{props.buttonName}</Button>
                        <Button variant="danger" onClick={(e) => {return props.deleteFriend(e, props.friend.id), props.history.push('/')}} >Delete</Button>  
                        <Button variant="warning" onClick={(e)=> props.history.push('/')}>Cancel</Button>   
                    </form>
                </div>
            )}
        }

        else{

        return(
            <div className="friends-form">
                <form onSubmit={(e) => props.addFriend(e)}>
                    <input type='text' name='name' placeholder='Enter Friend Name' value={props.stateData.name} onChange={props.inputChangeHandler}/>
                    <input type='text' name='age' placeholder='Enter Friend Age' value={props.stateData.age} onChange={props.inputChangeHandler}/>
                    <input type='text' name='email' placeholder='Enter Friend Email' value={props.stateData.email} onChange={props.inputChangeHandler}/>
                    <Button variant="primary" onClick={(e) => props.addFriend(e)} >{props.buttonName}</Button>
                </form>
            </div>
        )
        }

}

export default AddFriendForm;