import React, {useState, useContext, useEffect} from 'react'
import {ConversationsContext} from "../context/ConversationsContext"
import {UsersContext} from "../context/UsersContext"
import {FaTimes, FaPlus} from 'react-icons/fa'
import axios from 'axios'

const NewConversation = ({socketRef, newConvoBtnClicked, handleNewConvoBtn}) => {

    const {createNewConversation, setCurrentChatroom} = useContext(ConversationsContext)
    const {currentUser} = useContext(UsersContext)
    const [recipientUsername, setRecipientUsername] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    

    useEffect(() => {
        socketRef.current.on('create-room', (data) => {
            console.log(data)
            if (data.recipientId === currentUser._id) {
                const conversation = {room_id: data.room_id, users: [data.initiatorId, data.recipientId], messages: []}
                createNewConversation(conversation)
            }
            
        })
    }, [socketRef])

    const handleUsernameChange = (e) => {
        setRecipientUsername(e.target.value)
    }

    const handleNewConversation = (e) => {
        e.preventDefault()
        
       axios.post("https://evening-reaches-01572.herokuapp.com//chat/newconversation", {recipientUsername: recipientUsername, currentUserEmail: currentUser.email, currentUserId: currentUser._id})
       .then(res => {
           
           setCurrentChatroom(res.data.room_id)
           
           const conversation = {number: res.data.room_id, users: [currentUser._id, res.data.recipientId], messages: []};
           createNewConversation(conversation)

           socketRef.current.emit('create-room', {room_id: res.data.room_id, initiatorId: currentUser._id, recipientId: res.data.recipientId} )
           socketRef.current.emit('join-room', {room_id: res.data.room_id})
           setErrorMessage("")
           handleNewConvoBtn(e);
           setRecipientUsername("")
       }).catch(err => {
           console.log(err.response)
           setErrorMessage(err.response.data)
       })

    }

    return (
        (newConvoBtnClicked) ? (
        <div className="new-conversation">
            <div className="new-conversation-container">
                <FaTimes className="close-icon" onClick={handleNewConvoBtn}/>
                <form className="new-conversation-container-form" onSubmit={handleNewConversation}>
                    <h1>New Conversation</h1>
                    <div className="new-conversation-input">
                        <h2>Username:</h2>
                        <input type="text" onChange={handleUsernameChange}></input>
                    </div>
                    <p className="error-message">{errorMessage}</p>
                    <button onClick={(e) => {handleNewConversation(e) }}>Create</button>
                </form>
            </div>
        </div>) : ""
    )
}

export default NewConversation
