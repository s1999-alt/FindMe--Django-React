import React from 'react'

const AdminMessage = ({text, sent}) => {
  return (
    <div className={`admin-message ${sent ? 'sent': 'recieved'}`}>
      <div className="admin-message-bubble">
        {text}
      </div>
    </div>
  )
}

export default AdminMessage
