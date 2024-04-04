// AdminChatPage.jsx
import React, { useEffect, useState } from 'react';
import AdminChatArea from './AdminChatArea';
import './admin-chat-page.css'; // Add your CSS file for styling
import AdminChatSidebar from './AdminChatSidebar';
import { useSelector } from 'react-redux';
import axios from 'axios';

const AdminChatPage = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  const [users, setUsers] = useState([])

  useEffect( () => {
    const fetchChatUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/admin/chat-unique-users/')
        setUsers(response.data)
      } catch (error) {
        console.error("Error fetching unique users:", error);
      }
    }
    fetchChatUsers()
  },[])

  console.log("===========",users);
  console.log("=========================selected user",selectedUser);

  useEffect( () => {
    const newSocket = new WebSocket(`ws://localhost:8000/ws/chat/${selectedUser}/`)
    console.log('-------------------');
    console.log(newSocket);
    newSocket.onopen = () => {
      console.log('WebSocket connection established.');
    };

    newSocket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages(prevMessages => [...prevMessages, message]);
    };

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  },[selectedUser])

  console.log("=======messagesssssssssssssssssssssssss", messages);

  return (
    <div className="admin-chat-container">
      <AdminChatSidebar
        messages={messages}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        users={users}
      />
      <AdminChatArea
        messages={messages}
        selectedUser={selectedUser}
        socket={socket}
      />
    </div>
  );
}

export default AdminChatPage;
