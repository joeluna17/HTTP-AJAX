import React from 'react';


const Friend = props => {
    return (
        <div>
            <h2>{props.friend.name}</h2>
            <p>{props.friend.age}</p>
            <p>{props.friend.email}</p>
        </div>
    )
}

export default Friend;


// data object model 
// age: 30
// email: "ben@lambdaschool.com"
// id: 1
// name: "Ben"