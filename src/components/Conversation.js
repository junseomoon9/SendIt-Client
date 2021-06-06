import React, {useContext, useState, useEffect} from 'react'
import {ConversationsContext} from '../context/ConversationsContext'
import {UsersContext} from '../context/UsersContext'
import axios from "axios"

const Conversation = ({conversation, socketRef}) => {


    const [recipientUsername, setRecipientUsername] = useState("")
    const {setCurrentChatroom} = useContext(ConversationsContext)
    const {currentUser} = useContext(UsersContext)

    useEffect(() => {
     
        const recipientId = conversation.users.find(userId => userId !== currentUser._id)
        
        axios.post("https://evening-reaches-01572.herokuapp.com/finduser", {_id: recipientId})
        .then(res => {
            
            setRecipientUsername(res.data.user.username)
            
        }).catch(err => {
            console.log(err)
        })
    }, [])

     const connectToRoom = () => {
        socketRef.current.emit("join-room", {room_id: conversation.number})
    }

    const handleCurrentRecipient = () => {
        
        const recipientId = conversation.users.find(userId => userId !== currentUser._id)
        axios.post("https://evening-reaches-01572.herokuapp.com/finduser", {_id: recipientId})
        .then(res => {
            setRecipientUsername(res.data.user.username)
            setCurrentChatroom(conversation.number)
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div className="conversation" onClick={() => {handleCurrentRecipient(); connectToRoom()}}>
            <h1>{recipientUsername}</h1>
        </div>
    )
}

export default Conversation
