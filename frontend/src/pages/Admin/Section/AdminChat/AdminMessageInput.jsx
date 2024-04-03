import React, { useState } from 'react'
import './admin-message-input.css'

const AdminMessageInput = ({sendMessage}) => {
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setMessage(e.target.value);
  }

  const handleSend = () => {
    if (message.trim() !== '') {
      sendMessage(message); // Send message only if it's not empty
      setMessage('');
    }
  };


  return (
    <div className='admin-message-input'>
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

export default AdminMessageInput
