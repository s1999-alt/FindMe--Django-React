// AdminChatArea.jsx

import React, { useState, useEffect } from 'react';
import AdminMessage from './AdminMessage';
import AdminMessageInput from './AdminMessageInput';
import './admin-chat-area.css'; // Add your CSS file for styling

const AdminChatArea = ( { messages, selectedUser, socket} ) => {

  const sendMessage = (message, socket) => {
    if (socket && socket.readyState === WebSocket.OPEN){
      socket.send(JSON.stringify({ message }))
    }
    console.log(messages);
  }

  return (
    <div className="admin-chat-area">
      <div className="admin-chat-header">chat with {selectedUser} </div>
      <div className="admin-messages">
        {messages.map((message, index) => (
          <div className={`admin-message ${message.sender === selectedUser ? 'recieved': 'sent'}`}>
            <div className="admin-message-bubble">
              {message.message}
            </div>
          </div>
        ))}
      </div>
      <AdminMessageInput sendMessage={sendMessage} socket={socket}/>
    </div>
  );
}

export default AdminChatArea;
