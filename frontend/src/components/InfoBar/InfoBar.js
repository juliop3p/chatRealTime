import React from 'react'
import './InfoBar.css'

import onlineIcon from '../../icons/onlineIcon.png'
import closeIcon from '../../icons/closeIcon.png'

export default function InfoBar({ room, handleShowUsers }) {
    return (
        <div className="infoBar">
            <div className="leftInnerContainer">
                <img src={onlineIcon} alt="" className="onlineIcon"/>
                <h3>{ room }</h3>
            </div> 

            <div onClick={() => handleShowUsers()}>
                <i className="fas fa-users icon"></i>    
            </div>   

            <div className="rightInnerContainer">
                <a href="/">
                    <img src={closeIcon} alt="close icon" />
                </a>
            </div>         
        </div>
    )
}
