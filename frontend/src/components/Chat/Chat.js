import React, { useState, useEffect } from 'react'
import queryString from 'query-string'
import io from 'socket.io-client'

import InfoBar from '../InfoBar/InfoBar'
import Input from '../Input/Input'
import Messages from '../Messages/Messages'
import UsersOn from '../UsersOn/UsersOn'

import './Chat.css'

let socket

export default function Chat({ location }) {
    const [name, setName] = useState('')
    const [room, setRoom] = useState('')
    const [message, setMessage] = useState('')
    const [messages, setMessages] = useState([])
    // const ENDPOINT = 'https://react-chat-julio.herokuapp.com/'
    const ENDPOINT = 'http://localhost:8000'
    const [data, setData] = useState([])
    const [showUsers, setShowUsers] = useState(false)

    useEffect(() => {
        const { name, room } = queryString.parse(location.search)

        socket = io(ENDPOINT)

        setName(name)
        setRoom(room)

        socket.emit('join', { name, room }, () => {
            // console.log(error)
        })

        socket.on('roomData', data => {
            setData(data)
        })
        
        return () => {
            socket.emit('disconnect')
            socket.off()
        }

    }, [ENDPOINT, location.search])

    useEffect(() => {
        socket.on('message', message => {
            setMessages([...messages, message])
        })  

    }, [messages])

    const sendMessage = event => {
        event.preventDefault()

        if(message) {
            socket.emit('sendMessage', message, () => setMessage(''))
        }
    }

    const handleShowUsers = () => {
        setShowUsers(!showUsers)
    }

    return (
        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} handleShowUsers={handleShowUsers} />
                
                <Messages messages={messages} name={name} />

                <Input 
                    message={message} 
                    setMessage={setMessage} 
                    sendMessage={sendMessage}
                />
            </div>
            <UsersOn names={data.users} showUsers={showUsers} />
        </div>
    )
}
