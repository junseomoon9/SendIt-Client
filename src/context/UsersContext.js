import React, {createContext, useReducer, useEffect} from 'react'
import AppReducer from './AppReducer'
const initialState = {
    currentUser: {},
    users: []
}

export const UsersContext = createContext(initialState);

export const UsersProvider = props => {

    const [state, dispatch] = useReducer(AppReducer, initialState);

    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(state.users))
    }, [state])

    // actions
    const signupNewUser = user => {
        dispatch({type: "SIGNUP_NEW_USER", payload: user})
    }

    const setCurrentUser = user => {
        dispatch({type: "SET_CURRENT_USER", payload: user})
    }

    return (
        <UsersContext.Provider value={{users: state.users, currentUser: state.currentUser, signupNewUser, setCurrentUser}}>
            {props.children}
        </UsersContext.Provider>
    )
}