import {Link} from "react-router-dom";
import { deleteUser } from "../data/repository";

export default function User({element}){
    const handleDelete = async (username) => {
        if(!window.confirm(`Are you sure you want to delete ${username} ?`))
          return;
        
        const isDeleted = await deleteUser(username);
    
        if(isDeleted) {
          // Could remove the user that was deleted or refresh the users.
          // Here the users are refreshed.
          window.location.reload();
    
          alert(username + " has been deleted.");
        }
    };

    return(
        <tr key={element.username}>
            <td>{element.username}</td>
            <td>{element.first_name} {element.last_name}</td>
            <td>{element.password_hash}</td>
            <td>
            <Link className="btn btn-primary" to={`/edit/${element.username}`}>Edit</Link>
            </td>
            <td>
            <button className="btn btn-danger" onClick={() => handleDelete(element.username)}>Delete</button>
            </td>
        </tr>
    )
}