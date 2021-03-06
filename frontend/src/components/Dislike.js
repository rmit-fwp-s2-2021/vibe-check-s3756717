/* DISLIKE - Dislike a passed on post */

import dislike from './addons/dislike.png';
import './styles/PostElement.css';
import './styles/Dashboard.css';
import { useState, useEffect } from "react";
import { likePost } from "../data/repository";

const DisLike = ({ element }) => {
    const [dislikes, setDislikes] = useState(null);

    // Load dislikes for passed on post
    useEffect(() => {
        const currentDislikes = element.dislikes;
        setDislikes(currentDislikes);

    }, []);

    // Add new entry to dislikes for post
    const disLikeThisPost = async (event) => {
        event.preventDefault();

        const newDisLikes = dislikes + 1;


        const addDislike = {likes:element.likes, dislikes: newDisLikes, post_id: element.post_id};

        await likePost(addDislike);

        alert("You disliked " + element.username +"'s post.");
        setDislikes(newDisLikes);
    }

    return(
        <div>
            <h3 className = "postName">{dislikes}</h3>
            <input type = "image" className = "userAvatar" id = "dislike" src = {dislike} onClick = {disLikeThisPost} alt = "dislike"/>
        </div>
    )


}
export default DisLike;