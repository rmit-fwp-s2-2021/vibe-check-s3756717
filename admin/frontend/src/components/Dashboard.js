import 'bootstrap/dist/css/bootstrap.min.css';
import { deleteUser, getUsers } from "../data/repository";
import { useState, useEffect } from "react";
import User from './User';

export default function Dashboard(){
    const [users, setUsers] = useState([]);

    // Load users.
    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const currentusers = await getUsers();

        setUsers(currentusers);
    };

    const handleDelete = async (username) => {
        if(!window.confirm(`Are you sure you want to delete ${username} ?`))
          return;
        
        const isDeleted = await deleteUser(username);
    
        if(isDeleted) {
          // Could remove the user that was deleted or refresh the users.
          // Here the users are refreshed.
          await loadUsers();
    
          alert(username + " has been deleted.");
        }
    };

    return(
        <div>
            <div className = "row">
                <div className = "container">
                    <h1>Users</h1>
                </div>
            </div>

            <div>
                <table className="table table-hover">
                <thead>
                    <tr>
                    <th>Username</th>
                    <th>Name</th>
                    <th>Password</th>
                    <th></th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(userObject =>
                        <User element = {userObject}/>
                    )}
                </tbody>
                </table>
            </div>
        </div>
        
    );
}