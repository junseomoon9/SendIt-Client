import React, {useState, useContext} from 'react'
import NewConversation from './NewConversation'
import {ConversationsContext} from '../context/ConversationsContext'
import {UsersContext} from '../context/UsersContext'
import Conversation from './Conversation'
import {FaPlus} from 'react-icons/fa'

const Conversations = ({socketRef}) => {

    const [newConvoBtnClicked, setNewConvoBtnClicked] = useState(false)

    const handleNewConvoBtn = (e) => {
        e.preventDefault()
        setNewConvoBtnClicked(!newConvoBtnClicked)
    }

    const {conversations} = useContext(ConversationsContext)
    // const {currentUser} = useContext(UsersContext)

    return (
        <div className="conversations">
            <div className="conversations-header">
                <h1>Conversations</h1>
                <button className="new-convo-btn" onClick={handleNewConvoBtn}><FaPlus className="new-convo-btn-icon"/></button>
            </div>
            <NewConversation socketRef={socketRef} newConvoBtnClicked={newConvoBtnClicked} handleNewConvoBtn={handleNewConvoBtn}/>
            {conversations.map(conversation => (
                <Conversation conversation={conversation} socketRef={socketRef}/>
            ))}
        </div>
    )
}

export default Conversations
