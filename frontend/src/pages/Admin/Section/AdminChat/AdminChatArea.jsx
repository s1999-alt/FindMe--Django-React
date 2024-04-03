// AdminChatArea.jsx

import React, { useState, useEffect } from 'react';
import AdminMessage from './AdminMessage';
import AdminMessageInput from './AdminMessageInput';
import './admin-chat-area.css'; // Add your CSS file for styling

const AdminChatArea = ( {messages, selectedUser} ) => {

  return (
    <div className="admin-chat-area">
      <div className="admin-chat-header">chat with {selectedUser}</div>
      <div className="admin-messages">
        {messages.map((message, index) => (
          <AdminMessage key={index} text={message.text} sent={message.sent} />
        ))}
      </div>
      <AdminMessageInput/>
    </div>
  );
}

export default AdminChatArea;
