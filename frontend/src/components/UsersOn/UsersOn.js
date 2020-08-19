import React from 'react'
import onlineIcon from '../../icons/onlineIcon.png'
import ScrollToBottom from 'react-scroll-to-bottom';

import './UsersOn.css'

export default function UsersOn({ showUsers, names }) {
    return (
        <ScrollToBottom className={showUsers ? 'users-on' : 'hide'}>
            {names && names.map(name => {
                return (
                    <div key={name.id}>
                        <span><img src={onlineIcon} alt="online icon"/></span>
                        <strong>{name.name}</strong>
                    </div>
                )
            }) }       
        </ScrollToBottom>
    )
}
