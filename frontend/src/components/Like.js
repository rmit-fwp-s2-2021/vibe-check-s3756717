/* LIKE - Like a passed on post */

import like from './addons/like.png';
import './styles/PostElement.css';
import './styles/Dashboard.css';
import { useState, useEffect } from "react";
import { likePost } from "../data/repository";

const Like = ({ element }) => {
    const [likes, setLikes] = useState(null);

    // Load likes for passed on post
    useEffect(() => {
        const currentLikes = element.likes;
        setLikes(currentLikes);

    }, []);

    // // Add new entry to likes for post
    const handleSubmit = async (event) => {
        event.preventDefault();

        const newLikes = likes + 1;

        console.log(newLikes);
        console.log(element.post_id);

        const addLike = {likes: newLikes, dislikes: element.dislikes, post_id: element.post_id};

        await likePost(addLike);

        alert("You liked " + element.username +"'s post!");
        setLikes(newLikes);
    }

    return(
        <div>
            <h3 className = "postName">{likes}</h3>
            <input type = "image" className = "userAvatar" id = "like" src = {like} onClick = {handleSubmit} alt = "like"/>
        </div>
    )


}
export default Like;