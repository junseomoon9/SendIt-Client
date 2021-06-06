export default (state, action) => {
    switch (action.type) {
      case "SIGNUP_NEW_USER":
          return {
              ...state, 
              users: [action.payload, ...state.users]
          }
      case "SET_CURRENT_USER":
          return {
              ...state,
              currentUser: action.payload
          }
      case "SET_CURRENT_CHATROOM":
          return {
              ...state,
              currentChatroom: action.payload
          }
      case "CREATE_NEW_CONVERSATION":
          return {
              ...state,
              conversations: [ ...state.conversations, action.payload]
          }
      case "RETRIEVE_EXISTING_CONVERSATIONS": 
          return {
              ...state,
              conversations: [...action.payload]
          }
      case "ADD_NEW_MESSAGE":
          return {
            ...state,
            conversations: state.conversations.map(conversation => {
                if (conversation.number !== action.payload.room){
                    return conversation
                } else {
                    return {
                        ...conversation,
                        messages: [...conversation.messages, action.payload]
                        
                    }
                }
            })
          }
      case "DELETE_MESSAGE":
          return {
              ...state,
              conversations: state.conversations.map(conversation => {
                if (conversation.number !== action.payload.room){
                    return conversation
                } else {
                    return {
                        ...conversation,
                        messages: [...conversation.messages.filter(message => message._id !== action.payload._id)]
                        
                    }
                }
            })
          }
      default:
          return state
    }
}