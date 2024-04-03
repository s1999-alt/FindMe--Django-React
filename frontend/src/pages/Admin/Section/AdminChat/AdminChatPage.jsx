// AdminChatPage.jsx
import React, { useEffect, useState } from 'react';
import AdminChatArea from './AdminChatArea';
import './admin-chat-page.css'; // Add your CSS file for styling
import AdminChatSidebar from './AdminChatSidebar';
import { useSelector } from 'react-redux';

const AdminChatPage = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect( () => {
    const newSocket = new WebSocket(`ws://localhost:8000/ws/chat/${3}/`)

    newSocket.onopen = () => {
      console.log('WebSocket connection established.');
    };

    newSocket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  },[])

  return (
    <div className="admin-chat-container">
      <AdminChatSidebar
        messages={messages}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
      />
      <AdminChatArea
        messages={messages.filter((message) => message.sender === selectedUser)}
        selectedUser={selectedUser}
      />
    </div>
  );
}

export default AdminChatPage;
