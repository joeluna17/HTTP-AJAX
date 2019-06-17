import React from 'react';
import {Card} from 'react-bootstrap'



const Friend = props => {
    return (
        <Card className="friend-card" bg="dark" text="white" >
            <Card.Body>
            <Card.Title>{props.friend.name}</Card.Title>
            <Card.Text>{props.friend.age}</Card.Text>
            <Card.Text>{props.friend.email}</Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Friend;


// data object model 
// age: 30
// email: "ben@lambdaschool.com"
// id: 1
// name: "Ben"