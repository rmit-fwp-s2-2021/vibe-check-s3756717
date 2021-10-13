import {Link} from "react-router-dom";
import { updatePost } from "../data/repository";
import deleteBase64 from '../addons/deleteImage';

export default function Post({ element }){
    
    const handleDelete = async (username) => {
        if(!window.confirm(`Are you sure you want to mark this post as deleted?`))
          return;
        
        console.log(deleteBase64);
        
        const postDelete = {post_id: element.post_id, postText: "**** This post has been deleted by the admin ***", postPicture: deleteBase64};

        await updatePost(postDelete);

        window.location.reload();
    
        alert("Post with Post ID" + element.post_id +  "has been marked as deleted.");
    };

    return(
        <tr key={element.post_id}>
            <td>{element.post_id}</td>
            <td>{element.text}</td>
            <td>{element.username}</td>
            <td><img src = {"data:image/jpeg;base64," + element.postPicture} class = "img-thumbnail"></img></td>
            <td>{element.likes}</td>
            <td>{element.dislikes}</td>
            <td>
            <button className="btn btn-danger" onClick = {handleDelete}>Delete</button>
            </td>
        </tr>
    );
    
        
    
}