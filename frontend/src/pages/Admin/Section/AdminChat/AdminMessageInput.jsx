import React, { useEffect, useState } from 'react'
import './admin-message-input.css'
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from '../../../../features/auth/authSlice';

const AdminMessageInput = ({ sendMessage, socket }) => {
  const {user, userInfo} = useSelector((state) => state.auth);
  const [message, setMessage] = useState('');
  const dispatch = useDispatch()
  
  useEffect(() => {
    // Dispatch the getUserInfo action when the component mounts
    if (user) {
      dispatch(getUserInfo());
    }
  }, [dispatch, user]);

  const handleChange = (e) => {
    setMessage(e.target.value);
  }

  const handleSend = () => {
    
    if (message.trim() !== '') {
      console.log(userInfo.id);
      console.log('----------------------------');
      const formattedMessage = {
          "message": message,
          "sender": userInfo.id,
      };
      sendMessage(formattedMessage, socket); // Send message only if it's not empty
      setMessage('');
    }
  };

  console.log("=========admin==================id", userInfo.id);
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
