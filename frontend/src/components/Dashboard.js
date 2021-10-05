/* DASHBOARD - Shows Logged in user's posts */

import './styles/Dashboard.css';
import './styles/PostElement.css';
import React from "react";
import SideBar from './SideBar';
import LogOut from "./LogOutButton";
import { useState, useEffect } from "react";
import { getPosts } from "../data/repository";

export default function Dashboard(props){
    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState([]);

    // Load posts.
    useEffect(() => {
        async function loadPosts() {
        const currentPosts = await getPosts();

        setPosts(currentPosts);
        setIsLoading(false);
        }

        loadPosts();
    }, []);

    function postDetails(blobDetails) {
        var binaryData = [];
        binaryData.push(blobDetails);
        const dataURL = URL.createObjectURL(new Blob(binaryData, {type: "image/png"}));

        return dataURL;
    }


    return(
        <div className = "pageWrapper">
            <SideBar className = "sideBar"/>
            <div className = "content">
                <div className = "dashTop">
                    <div className = "dashHead ">Welcome Back, {props.user.first_name} {props.user.last_name}!</div>
                    <LogOut/>
                </div>

                <div className = "postSection">
                    <div className = "feedQuote">Your feed</div>
                    {isLoading ?
                        <div className = "noPosts">Loading posts...</div>
                        :
                        posts.length === 0 ?
                        <div className='noPosts' >
                        <div>No Posts</div>
                        <br></br>
                        <div>Click on the "Make a New Post" tab on the Navigation Bar
                            to make your first post!</div>
                        </div>
                          :
                          posts.map((x) =>
                            
                            <div className="postElement">
                                <div className = "userText">
                                    <div className = "postName">{x.username}</div>
                                    <div className = "postName">•</div>
                                    {/*<img className = "userAvatar" src = {ppUrl} alt = "avatar"/>*/}
                                </div>
                                <div className = "postView">
                                    <img className = "postImg" src = {"data:image/jpeg;base64," + x.postPicture} alt = "post"/>
                                    <div className = "postDesc"><p>{x.text}</p></div>
                                </div>
                            </div>
                          )
                      }
                </div>
            </div>
        </div>
    );
}