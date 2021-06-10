import React, {useContext, useState, useEffect} from 'react'
import {UsersContext} from '../context/UsersContext'
import {ConversationsContext} from '../context/ConversationsContext'
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";
import axios from 'axios'

const Message = ({message, handleDeleteMessage}) => {

    const {currentUser} = useContext(UsersContext)
    const {conversations} = useContext(ConversationsContext)
    const [timePassed, setTimePassed] = useState("")

    useEffect(() => {
        var currentTime = Date.now();
        currentTime = new Date(currentTime)
        currentTime.setSeconds(currentTime.getSeconds() +4)
        var created_at = new Date(message.created_at)
        

        const created_at_month = created_at.getMonth()
        const currentTime_month = currentTime.getMonth()

        var string = ""

        if (currentTime_month > created_at_month) {

            const diffMon = currentTime_month - created_at_month
            string = `${diffMon}m ago`

        } else if (currentTime_month === created_at_month) {
            const created_at_day = created_at.getDate();
            const currentTime_day = currentTime.getDate();

            if (currentTime_day > created_at_day){

                const diffDay = currentTime_day - created_at_day
                string = `${diffDay}d ago`

            } else if (currentTime_day === created_at_day) {

                const created_at_hour = created_at.getHours()
                const currentTime_hour = currentTime.getHours()

                if (currentTime_hour > created_at_hour) {

                    if (currentTime_hour - created_at_hour === 1) {
                        const created_at_min = created_at.getMinutes()
                        const currentTime_min = currentTime.getMinutes()

                        if (currentTime_min >=  created_at_min) {

                            string = "1hr ago"
    
                        } else {
                            const diffMin = currentTime_min + (60 - created_at_min)
                            string = `${diffMin}min ago`
                        }
                    }
                    else {
                        const diffHour = currentTime_hour - created_at_hour
                        string = `${diffHour}hr ago`
                    }
                } else if (currentTime_hour === created_at_hour){
                    const created_at_min = created_at.getMinutes()
                    const currentTime_min = currentTime.getMinutes()

                    if (currentTime_min > created_at_min) {

                        if (currentTime_min - created_at_min === 1) {
                            const created_at_sec = created_at.getSeconds();
                            const currentTime_sec = currentTime.getSeconds()

                            if (currentTime_sec >= created_at_sec) {
                                string = "1min ago"
                            } else {
                                const diffSec = currentTime_sec + (60 - created_at_sec)
                                string = `${diffSec}sec ago`
                            }
                        } else {
                            const diffMin = currentTime_min - created_at_min
                            string = `${diffMin}min ago`
                        }

                    
                    } else if (currentTime_min === created_at_min) {
                        
                        const created_at_sec = created_at.getSeconds();
                        const currentTime_sec = currentTime.getSeconds()
                        console.log(created_at_sec)
                        console.log(currentTime_sec)

                        const diffSec = currentTime_sec - created_at_sec;
                        string = `${diffSec}s ago`
                    }
                } else if (currentTime_hour < created_at_hour) {
                    const diffHour = currentTime_hour + (24 - created_at_hour)
                    string = `${diffHour}d ago`
                }
            }
        }

        if (string === "0s ago") {
            string = "1s ago"
        }
        
        setTimePassed(string)
        
    })

    
    

    if (message.author === currentUser._id) {
        return (
            
            <div className="message-container-purple">
                <ContextMenuTrigger  id={message._id}>
                    <div className="message-purple">
                        <h1>{message.message_body}</h1>
                    </div> 
                </ContextMenuTrigger>
                <p>{timePassed}</p>
                <ContextMenu className="context" id={message._id}>
                    <MenuItem className="menu-item" data={{message: message}} id="item-1"  onClick={handleDeleteMessage}>
                        Delete Message
                    </MenuItem>
                </ContextMenu>
            </div>
            
            
            
        )
    } else {
        return (
            <div className="message-container-white">
                    <div className="message-white">
                        <h1>{message.message_body}</h1>
                    </div>
                    <p>{timePassed}</p>
            </div>
            
        )
    }
    
}

export default Message
