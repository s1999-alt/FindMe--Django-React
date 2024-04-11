import React, { useEffect, useState } from 'react'
import './chat-area.css'
// import MessageInput from './MessageInput'

const ChatArea = ({messages, user_id}) => {
  console.log("javsdvajdvjavdjasdjdjdajdjasd",user_id);
  console.log('messages array', messages);
  console.log('===============mesages timestamp===================', messages.timestamp);
  return (
    <div className='chat-area'>
      <div className="chat-header"></div>
      <div className="messages">
        {messages ? (
          messages.map((message, index) => (
            <div className={`message ${message.sender == user_id ? 'sent': 'recieved'}`}>
              <div className="message-bubble">
                {message.message}
                <div>{new Date(message.time_stamp).toLocaleString()}</div>
                {/* <span className="timestamp">{new Date(message.time_stamp).toLocaleString()}</span>  */}
              </div>
            </div>
          ))
        ) : (
          <p>No messages to display</p>
        )}
      </div>
    </div>
  );
}

export default ChatArea
