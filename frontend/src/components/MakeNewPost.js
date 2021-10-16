/* MAKE NEW POST - Page logged in users can make posts to show on their feed */

import './styles/MakeNewPost.css';
import SideBar from "./SideBar";
import LogOut from "./LogOutButton";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { getPosts, createPost, findUser } from "../data/repository";
import imageToBase64 from 'image-to-base64/browser';


export default function MakeNewPost(props){
    const [post, setPost] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const [posts, setPosts] = useState([]);
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();
    const [userPP, setUserPP] = useState("");
    var postImg;
    const history = useHistory();


    // Set preview for selected post image
    useEffect(() => {
        async function loadUser(){
            const getCurrentUser = await findUser(props.user.username);

            setUserPP(getCurrentUser.profilePicture);
        }

        loadUser();

        if (!selectedFile) {
            setPreview(undefined);
            return;
        }

        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);
        console.log(preview);

        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile])

    // Set selected file upon selecting file for post
    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined);
            return;
        }
        setSelectedFile(e.target.files[0]);
        console.log(selectedFile);
    }

    const handleInputChange = (event) => {
        setPost(event.target.value);
    };
    
      const handleSubmit = async (event) => {
          
        event.preventDefault();
        if(preview !== null){
            const imgUrl = URL.createObjectURL(selectedFile);
            imageToBase64(imgUrl) // Convert post image blob to base64 url
            .then(
                async (response) => {
                    // Trim the post text.
                    const trimmedPost = post.trim();
                
                    if(trimmedPost === "") {
                    setErrorMessage("A post cannot be empty.");
                    return;
                    }

                    if(trimmedPost.length > 600){
                        setErrorMessage("Post can have a maximum of 600 characters.");
                        return;
                    }

                
                    // Create post.
                    const newPost = { text: trimmedPost, username: props.user.username, postPicture: response, userProfilePicture: userPP};
                    await createPost(newPost);
                
                    // Add post to locally stored posts.
                    setPosts([...posts, newPost]);
                
                    // Reset post content.
                    setPost("");
                    setErrorMessage("");

                    history.push("/dashboard");

                }
            )
            .catch(
                (error) => {
                    console.log(error); // Logs an error if there was one
                }
            )

            
        }

        // If text post or image empty, notify logged in user
        else{
            alert("Post and Image cannot be empty!")
        }
        
      };

    return(
        <div className = "pageWrapper">
            <SideBar/>
            <div className = "content">
                <div className = "dashTop">
                    <div className = "dashHead">Make New Post</div>
                    <LogOut/>
                </div>
                <div className = "newPostQuote">Let the world know what your vibes are like today!</div>
                <form className = "newPostForm" onSubmit={handleSubmit}>
                    <div className = "newPostDetails">
                        <textarea className = "formInput postText" id="post" value={post} onChange={handleInputChange} required></textarea>
                        <div className = "newPostImgUpload">
                            <div className = "formLabel">Upload Image</div>
                            <br></br>
                            <input type='file' onChange={onSelectFile} required/>
                            <br></br>
                            {selectedFile &&  <img className = "preview" src={preview} alt = "new post"/>}
                        </div>
                    </div>
                    {errorMessage !== null &&
                        <div className="errorMessage">{errorMessage}</div>
                    }
                    <br></br>
                    <input className = "signUpButton signUp signUpHover" type="submit" value="Check my Vibe!" />
                </form>
                
            </div>
        </div>
    );
}