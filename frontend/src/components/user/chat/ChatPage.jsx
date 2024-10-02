import React, { useEffect, useState } from 'react'
import ChatSideBar from './ChatSideBar'
import ChatArea from './ChatArea'
import './chat-page.css'
import { useSelector } from 'react-redux'
import MessageInput from './MessageInput'
import { useParams } from 'react-router-dom'

const ChatPage = () => {
  const {user, userInfo} = useSelector((state) => state.auth);
  const {user_id} = useParams('id')
  console.log("=======================",userInfo.id)
  const [messages, setMessages] = useState([])
  const [socket, setSocket] = useState(null)

  useEffect( () => {
    // const newSocket = new WebSocket(`ws://localhost:8000/ws/chat/${userInfo.id}/`);
    const newSocket = new WebSocket(`wss://findme.siyadsavad.online/ws/chat/${userInfo.id}/`);

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

  },[])

  const sendMessage = (message) => {
    if (socket && socket.readyState === WebSocket.OPEN){
      socket.send(JSON.stringify({ message }))
    }
    console.log(messages);
  }

  return (
    <>
      <div className='chat-container'>
        <ChatSideBar/>
        <ChatArea messages={messages} user_id={userInfo.id}/>
      </div>
      <MessageInput sendMessage={sendMessage}/>
    </>
  )
}

export default ChatPage
