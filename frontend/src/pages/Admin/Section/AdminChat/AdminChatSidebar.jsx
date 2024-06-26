import React from 'react'

const AdminChatSidebar = ({ users, selectedUser, setSelectedUser }) => {
  // const users = [...new Set(messages.map((message) => message.sender))];
  return (
    <div className='admin-sidebar'>
      <h2>Users</h2>
      <ul>
        {users.map((user)=>(
          <li
            key={user.id}
            className={`${selectedUser === user.id ? 'active' : ''} ${user.isOnline ? 'online' : 'offline'}`}
            onClick={() => setSelectedUser(user.id)}
          >
            {user.email} {user.isOnline ? '(Online)' : '(Offline)'}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AdminChatSidebar
