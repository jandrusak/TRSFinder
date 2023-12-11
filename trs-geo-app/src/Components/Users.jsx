import React, { useEffect, useState } from 'react'

function Users(props) {
    const {users} = props
    if (!users) {
        return <p>Loading...</p>
    }
  return (
    <div>Users
        {users.map(user=>(
            <div key={user.user_id}>
                <p>Hello, {user.first_name}</p>
            </div>
        ))}
    </div>
  );
}

export default Users;