import React from 'react'

const AdminChatSidebar = ({ messages, selectedUser, setSelectedUser }) => {
  const users = [...new Set(messages.map((message) => message.sender))];
  return (
    <div className='admin-sidebar'>
      <h2>Users</h2>
      <ul>
        {users.map((user)=>(
          <li
            key={user}
            className={selectedUser === user ? 'active' : ''}
            onClick={() => setSelectedUser(user)}
          >
            {user}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AdminChatSidebar
