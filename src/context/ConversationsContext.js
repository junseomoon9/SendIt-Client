import React, {createContext, useReducer, useEffect, useContext} from 'react'
import AppReducer from './AppReducer'
import axios from 'axios'

const initialState = {

    currentChatroom: "",
    conversations: []
}

export const ConversationsContext = createContext(initialState);


export const ConversationsProvider = props => {

    const [state, dispatch] = useReducer(AppReducer, initialState)
    

    function retrieveConversations(user) {
        
        axios.post("https://evening-reaches-01572.herokuapp.com/chat/retrieveConversations", {currentUserId: user._id})
        .then(res => {
            
            dispatch({type: "RETRIEVE_EXISTING_CONVERSATIONS", payload: res.data.conversations})
        }).catch(err => {
            console.log(err.response)
        })
    }

    function retrieveMessages() {
        axios.post("https://evening-reaches-01572.herokuapp.com/chat/retrieveMessages")
        .then(res => {
            console.log(res.data.messages)
            for (var i = 0; i < res.data.messages.length; i++) {
                dispatch({type: "ADD_NEW_MESSAGE", payload: res.data.messages[i]})
                console.log(res.data.messages[i])
            }
            // res.data.messages.forEach(message => {
                
            // })
            
        }).catch(err => {
            console.log(err.response)
        })
    }

    function createNewConversation(conversation) {
        dispatch({type: "CREATE_NEW_CONVERSATION", payload: conversation})
    }

    function addNewMessage(message) {
        
        dispatch({type: "ADD_NEW_MESSAGE", payload: message})
    }
    
    function setCurrentChatroom(room_id) {
        dispatch({type: "SET_CURRENT_CHATROOM", payload: room_id})
    }
    function deleteMessage(message) {
        console.log(message)
        dispatch({type: "DELETE_MESSAGE", payload: message})
    }

    return (
        <ConversationsContext.Provider value={{conversations: state.conversations, currentChatroom: state.currentChatroom, retrieveConversations, createNewConversation, setCurrentChatroom, addNewMessage, retrieveMessages, deleteMessage}}>
            {props.children}
        </ConversationsContext.Provider>
    )

}