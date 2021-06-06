import React, {useState, useContext, useEffect, useRef} from 'react'
import {ConversationsContext} from '../context/ConversationsContext'
import {UsersContext} from '../context/UsersContext'
import Message from './Message'
import axios from "axios"

const ChatSection = ({socketRef}) => {
    
    const {currentChatroom, conversations, addNewMessage, deleteMessage} = useContext(ConversationsContext)
    const {currentUser} = useContext(UsersContext)
    const [message, setMessage] = useState("")
    const [messages, setMessages] = useState([])
    const [recipientUsername, setRecipientUsername] = useState("")
    const input = useRef();

    const handleInputChange = (e) => {
        setMessage(e.target.value)
    }

    const handleNewMessages = () => {
  
        const obj = conversations.find(el => el.number === currentChatroom)
        if (obj !== undefined){
            
            setMessages([...obj.messages])
        }
    }

    useEffect(() => {
        handleNewMessages()
        handleRecipientUsername()
    }, [currentChatroom, conversations])

    useEffect(() => {
        socketRef.current.on('receive-message', message => {
            
            addNewMessage(message)
        })

        socketRef.current.on('delete-message', message => {
            deleteMessage(message)
        })
    }, [socketRef])

    const handleNewMessage =   (e) => {
        e.preventDefault()

        if (message !== "") {
            axios.post("https://evening-reaches-01572.herokuapp.com/chat/newmessage", {chatroom: currentChatroom, author: currentUser._id, message_body: message})
            .then(res => {
                
                addNewMessage(res.data)
                
                handleNewMessages()
                setMessage("")
                input.current.value = ""

                socketRef.current.emit("send-message", res.data)
                
            }).catch(err => {
                console.log(err)
            })
        }
    }

    const handleDeleteMessage = (e, data) => {
        e.preventDefault()
        
        axios.post("https://evening-reaches-01572.herokuapp.com/chat/deleteMessage", data.message)
        .then(res =>{
            
            deleteMessage(data.message)
            socketRef.current.emit("delete-message", data.message)
            handleNewMessages()
        }).catch(err => {
            console.log(err)
        })
    }

    const handleRecipientUsername = () => {
        
        const convo = conversations.find(el => el.number === currentChatroom)
        if (convo != null) {
            
            const recipientUserID = convo.users.find(user => (user !== currentUser._id))
           
            axios.post('https://evening-reaches-01572.herokuapp.com/finduser', {_id: recipientUserID})
            .then(res => {
                setRecipientUsername(res.data.user.username)
            }).catch(err =>{
                console.log(err)
            })
  
        }
 
    }

    return (
        <div className="chat-section">

            <div className="chat-section-header">
                <h1>{recipientUsername}</h1>
            </div>
            <div className="messages-container">
                {messages.map(message => (
                    <Message message={message} handleDeleteMessage={handleDeleteMessage}/>
                ))}
            </div>
            
            <form onSubmit={(e)=>handleNewMessage(e)} className="message-input-container">
                <input ref={input} onChange={handleInputChange} className="message-input" placeholder="Enter Message Here..."></input>
                <button className="message-input-btn" onClick={(e)=>handleNewMessage(e)}>Send</button>
            </form>
            
        </div>
    )
}

export default ChatSection
