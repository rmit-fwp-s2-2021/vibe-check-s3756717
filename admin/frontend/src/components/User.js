import {Link} from "react-router-dom";
import { deleteUser, blockUser } from "../data/repository";

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

    console.log(element.blocked);

    const handleBlock = async (username) => {
      if(!window.confirm(`Are you sure you want to block ${username} ?`))
          return;

      await blockUser(username);

      window.location.reload();
    
      alert(username + " has been blocked.");
    }

    const handleUnBlock = async (username) => {
      if(!window.confirm(`Are you sure you want to unblock ${username} ?`))
          return;

      await blockUser(username);

      window.location.reload();
    
      alert(username + " has been unblocked.");
    }

    return(
        <tr key={element.username}>
            <td>{element.username}</td>
            <td>{element.first_name} {element.last_name}</td>
            <td>{element.password_hash}</td>
            <td>
            <Link className="btn btn-primary" to={`/edit/${element.username}`}>Edit</Link>
            </td>
            <td>
            {element.blocked === false?
              <button className="btn btn-danger" onClick={() => handleBlock(element.username)}>Block</button>
            :
              <button className="btn btn-success" onClick={() => handleUnBlock(element.username)}>Unblock</button>}
            </td>
            <td><button className="btn btn-danger" onClick={() => handleDelete(element.username)}>Delete</button></td>
        </tr>
    )
}