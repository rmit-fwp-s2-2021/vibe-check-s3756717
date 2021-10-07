import './styles/Dashboard.css';
import './styles/PostElement.css';
import React from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { createComment, getComments, getUser } from "../data/repository";

const PostElement = ({ element }) => {
    const[comments, setComments] = useState([]);
    const[commentText, setCommentText] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);

    useEffect(() => {
        async function loadComments() {
            const currentComments = await getComments();
            setComments(currentComments);
        }

        loadComments();

    }, []);

    const handleInputChange = (event) => {
        setCommentText(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const trimmedComment = commentText.trim();
        if(trimmedComment === "") {
            setErrorMessage("A comment cannot be empty.");
            return;
        }

        if(trimmedComment.length > 600){
            setErrorMessage("Comment can have a maximum of 600 characters.");
            return;
        }

        console.log(trimmedComment);
        console.log(element.post_id);
        console.log(getUser().username);

        const newComment = { commentText: trimmedComment, username: getUser().username,  post_id: element.post_id};
        await createComment(newComment);

        alert("Comment submitted!");

        setErrorMessage("");
        window.location.reload();
    }

    return(
        <div className="postElement">
            <div className = "userText">
                <img className = "userAvatar" id = "userAvatar" src = {"data:image/jpeg;base64," + element.userProfilePicture} alt = "post"/>
                <h2 className = "postName">{element.username}</h2>
            </div>
            <div className = "postView">
                <img className = "postImg" src = {"data:image/jpeg;base64," + element.postPicture} alt = "post"/>
                <h3 className = "postDesc">{element.text}</h3>
            </div>
            <form className = "postView" onSubmit = {handleSubmit}>
                <div className = "postName">Submit Comment</div>
                <textarea className = "formInput commentPost" name = "commentText" id="post" value={commentText} onChange={handleInputChange} required></textarea>
                {errorMessage !== null &&
                    <div className="errorMessage">{errorMessage}</div>
                }
                <input className = "signUpButton signUp signUpHover" type="submit" value="Submit Comment" />
            </form>
            <div className = "commentsSection">
                <h2 className = "postName">Comments</h2>
                {comments.map((c) => {
                    if(element.post_id == c.post_id){
                        return(
                            <div className = "comment">
                                <div className = "commentText">
                                    <h3 className = "postName">{c.username}    •</h3>
                                    <div class = "postName">{c.commentText}</div>
                                </div>
                            </div>
                        )
                    }
                }   
                )}
            </div>
        </div>
        );
}

export default PostElement;