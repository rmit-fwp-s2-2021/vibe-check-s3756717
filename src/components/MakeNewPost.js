/* MAKE NEW POST - Page logged in users can make posts to show on their feed */

import './styles/MakeNewPost.css';
import SideBar from "./SideBar";
import LogOut from "./LogOutButton";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import imageToBase64 from 'image-to-base64/browser';


export default function MakeNewPost(){
    var userPosts = [];
    const [selectedFile, setSelectedFile] = useState();
    const [preview, setPreview] = useState();
    const [textPost, setTextPost] = useState("");
    var postImg;
    const history = useHistory();

    // Retreieve logged in user email from session
    const email = sessionStorage.getItem("email");
    // Retrieve the object from storage
    var retrievedObject = localStorage.getItem(email);
    const userDetails = JSON.parse(retrievedObject);

    // Retrieve logged in user's posts
    userPosts = userDetails.posts;

    // Set preview for selected post image
    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined);
            return;
        }

        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);

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

    // Upload post to logged in user's posts
    const uploadPost = () => {

        // Check if text post or image is empty
        if(textPost !== "" && preview !== null){
            const imgUrl = URL.createObjectURL(selectedFile);
            imageToBase64(imgUrl) // Convert post image blob to base64 url
            .then(
                (response) => {
                    postImg = response;
                    userPosts.push({text: textPost, img: postImg});

                    const customer1 = {
                        avatar:userDetails.avatar,
                        name: userDetails.name,
                        email: userDetails.email,
                        password: userDetails.password,
                        posts: userPosts,
                        joinDate: userDetails.joinDate
                    };
                    
                    // Reupload user object
                    localStorage.setItem(email, JSON.stringify(customer1));
                    alert("Post uploaded successfully!");

                    // Redirect to dashboard
                    history.push({
                        pathname: '/dash',
                    });

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

        
    }

    return(
        <div className = "pageWrapper">
            <SideBar/>
            <div className = "content">
                <div className = "dashTop">
                    <div className = "dashHead">Make New Post</div>
                    <LogOut/>
                </div>
                <div className = "newPostQuote">Let the world know what your vibes are like today!</div>
                <div className = "newPostForm">
                    <div className = "newPostDetails">
                        <textarea className = "formInput postText" onChange = {(e) => setTextPost(e.target.value)} required></textarea>
                        <div className = "newPostImgUpload">
                            <div className = "formLabel">Upload Image</div>
                            <br></br>
                            <input type='file' onChange={onSelectFile} required/>
                            <br></br>
                            {selectedFile &&  <img className = "preview" src={preview} alt = "new post"/>}
                        </div>
                    </div>
                    <br></br>
                    <button className = "signUpButton signUp signUpHover" onClick={() => uploadPost()}>Check my Vibe!</button>
                </div>
                
            </div>
        </div>
    );
}