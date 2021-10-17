/* POST ELEMENT - Post element to show individual post's details on logged in user's field */

import './styles/Dashboard.css';
import React from "react";
import { useState, useEffect } from "react";
import { createComment, getComments, getUser} from "../data/repository";
import Like from './Like';
import DisLike from './Dislike';

const PostElement = ({ element }) => {
    const[comments, setComments] = useState([]);
    const[commentText, setCommentText] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    
    
    // Load comments for post
    useEffect(() => {
        async function loadComments() {
            const currentComments = await getComments();
            setComments(currentComments);
        }

        loadComments();

    }, []);

    // Generic input handler
    const handleInputChange = (event) => {
        setCommentText(event.target.value);
    };

    // Submit comment
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

        // Submit comment details to database
        const newComment = { commentText: trimmedComment, username: getUser().username,  post_id: element.post_id};
        await createComment(newComment);

        // Notify User
        alert("Comment submitted!");

        setErrorMessage("");
        window.location.reload();
    }

    return(
        <div className="postElement">
            <div className = "postHeader">
                <div className = "userText">
                    <img className = "userAvatar" id = "userAvatar" src = {"data:image/jpeg;base64," + element.userProfilePicture} alt = "userPP"/>
                    <h2 className = "postName" id = "postUsername">{element.username}</h2>
                </div>

                {
                 element.text === "**** This post has been deleted by the admin ***"?
                 <div className = "userText">
                 </div>
                :
                <div className = "userText">
                    <Like element = {element}/>
                    <DisLike element = {element} />
                </div>

                }
            </div>


            <div className = "postInfo">
                <div className = "postView">
                    <img className = "postImg" src = {"data:image/jpeg;base64," + element.postPicture} alt = "post"/>
                    <div className = "postDesc">{element.text}</div>
                </div>

                {element.text === "**** This post has been deleted by the admin ***"?
                <div></div>
                :
                <div className = "comments">
                    <h2 className = "postName">Comments</h2>
                    <div className = "commentsSection">
                        {comments.map((c) => {
                            if(element.post_id == c.post_id){
                                return(
                                    <div className = "comment">
                                        <div className = "commentText">
                                            <div className = "postName commentsTitle">{c.username}    •</div>
                                            <div class = "postName">{c.commentText}</div>
                                        </div>
                                    </div>
                                )
                            }
                        }   
                        )}
                    </div>
                </div>}
            </div>
            
            {element.text === "**** This post has been deleted by the admin ***"?
            <div></div>
            :
            <form className = "postView" onSubmit = {handleSubmit}>
                        <div className = "commentForm">
                            <textarea className = "formInput commentPost" name = "commentText" id="post" value={commentText} onChange={handleInputChange} required></textarea>
                            <input className = "signUpButton signUp signUpHover postComment" type="submit" value="Submit Comment" />
                        </div>
                        {errorMessage !== null &&
                            <div className="errorMessage">{errorMessage}</div>
                        }
            </form>
            }
        </div>
        );
}

export default PostElement;