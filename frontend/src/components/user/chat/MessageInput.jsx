import React, { useState } from 'react'
import './message-input.css'
import { useSelector } from 'react-redux';

const MessageInput = ({sendMessage}) => {
  const {user, userInfo} = useSelector((state) => state.auth);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSend = () => {
   

      if (message.trim() !== '') {
        const messageData = {
          "message": message,
          "sender": userInfo.id
        };
        sendMessage(messageData); // Send message only if it's not empty
        setMessage('');
      }
    
  };
  return (
    <div className='message-input'>
      <textarea 
      style={{width:'30%'}}
      placeholder='Type Your Message'
      value={message}
      onChange={handleChange}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  )
}

export default MessageInput;
