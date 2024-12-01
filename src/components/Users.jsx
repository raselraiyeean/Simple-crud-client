import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";


const Users = () => {
    const loadedUsers = useLoaderData();

    const [users, setUsers] = useState(loadedUsers);

    const HandleDeleteUser = _id => {
      console.log('User id', _id);
      fetch(`http://localhost:5000/users/${_id}`, {
        method: 'DELETE'
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if(data.deletedCount> 0) {
            alert('Deleted User Successfully');
            const remainingUsers = users.filter(user => user._id !== _id);
            setUsers(remainingUsers);
        }
      })
    }
    return (
        <div>
            <h1>Numbers of users: {users.length}</h1>

            {
                users.map(user => 
                <h3 key={user._id}>{user.name} : {user.email} 
                <Link to={`/update/${user._id}`}>
                <button>Update</button>
                </Link>
                <button onClick={() => HandleDeleteUser(user._id)}>X</button>
                </h3>)
            }
        </div>
    );
};

export default Users;