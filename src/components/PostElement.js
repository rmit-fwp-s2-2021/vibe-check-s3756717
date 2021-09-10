/* POST ELEMENT - Card to show logged in user details and post description and post image */

import './styles/PostElement.css';
import React, {useState} from "react";
import { useHistory } from "react-router";

const PostElement = ({ element }) => {
    var userPosts = [];
    const [showEdit, setShowEdit] = useState(false)
    const [textEdit, setEditText] = useState("");
    const history = useHistory();

    // Retrieve profile elements from session
    const email = sessionStorage.getItem("email");
    const avatar = sessionStorage.getItem("avatar");
    const name = sessionStorage.getItem("name");

    // Retrieve the object from storage
    var retrievedObject = localStorage.getItem(email);
    const userDetails = JSON.parse(retrievedObject);

    // Retrieve logged in user's posts
    userPosts = userDetails.posts;

    // Retrieve text post from passed in element
    const textPost = Object.values(element)[0];

    // Retrieve image url for post from passed in element
    const imgPost = Object.values(element)[1];

    // Set format to show profile picture of logged in user
    var ppUrl = "data:image/jpeg;base64," + avatar;

    // Function to find index of viewed post
    function findWithAttr(array, attr, value) {
        for(var i = 0; i < array.length; i += 1) {
            if(array[i][attr] === value) {
                return i;
            }
        }
        return -1;
    }

    // Set index of current post
    var index = findWithAttr(userPosts, "text", textPost);

    // Set format to show image of current post
    var imgUrl = "data:image/jpeg;base64," + imgPost;

    // Open and close edit sections
    const openEdit = () => (setShowEdit(true));
    const closeEdit = () => (setShowEdit(false));
    
    // Edit post function
    const editPost = () => {
        //Check if edit section is empty
        if(textEdit !== ""){
            userPosts[index].text = textEdit;

            const customer1 = {
                avatar:userDetails.avatar,
                name: userDetails.name,
                email: userDetails.email,
                password: userDetails.password,
                posts: userPosts,
                joinDate: userDetails.joinDate
            };

            localStorage.setItem(email, JSON.stringify(customer1));
            alert("Post edited successfully!");
            history.push({
                pathname: '/dash',
            });
        }
        // Notify customer if post is empty
        else{
            alert("Post Cannot be Empty!");
        }
        
        
    };

    // Delete post function
    const deletePost = () => {
        if (index > -1) {
            userPosts.splice(index, 1);
            const customer1 = {
                avatar:userDetails.avatar,
                name: userDetails.name,
                email: userDetails.email,
                password: userDetails.password,
                posts: userPosts,
                joinDate: userDetails.joinDate
            };

            localStorage.setItem(email, JSON.stringify(customer1));
            history.push({
                pathname: '/dash',
            });

        }
    }

    return(
        <div className = "postElement">
                <div className = "userText">
                    <div className = "postName">{name}</div>
                    <div className = "postName">•</div>
                    <img className = "userAvatar" src = {ppUrl} alt = "avatar"/>
                </div>
                <div className = "postView">
                    <img className = "postImg" src = {imgUrl} alt = "post"/>
                    <div className = "postDesc"><p>{textPost}</p></div>
                </div>
                <div className = "postButtons">
                    <div className = "editControls">
                        <button className = "editPost" onClick={() => openEdit()}>Edit Post</button>
                        <button className = "deletePost"
                        onClick={() => {
                            const confirmBox = window.confirm(
                            "Are you sure you want to Delete this Post?"
                            )
                            if (confirmBox === true) {
                                deletePost();
                            }
                        }}
                        >Delete Post</button>
                    </div>
                    <br></br>
                    {showEdit ? 
                        <div className = "editArea">
                            <textarea className = "formInput postText" onChange = {(e) => setEditText(e.target.value)}></textarea>
                            <div className = "editControls">
                                <button className = "submitEdit" onClick = {() => editPost()} >Submit Changes</button>
                                <button className = "submitEdit" onClick = {() => closeEdit()}>Close</button>
                            </div>
                        </div> : null }
                </div>
        </div>
    );
}

export default PostElement;