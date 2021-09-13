/* DASHBOARD - Shows Logged in user's posts */

import './styles/Dashboard.css';
import React from "react";
import SideBar from './SideBar';
import LogOut from "./LogOutButton";
import PostElement from './PostElement';

export default function Dashboard(){
    var userPosts = [];

    // Retreieve email of logged in user from session
    const email = sessionStorage.getItem("email");
    // Retrieve the object from storage
    var retrievedObject = localStorage.getItem(email);
    const userDetails = JSON.parse(retrievedObject);

    // Retrieve posts for logged in user
    userPosts = userDetails.posts;


    return(
        <div className = "pageWrapper">
            <SideBar className = "sideBar"/>
            <div className = "content">
                <div className = "dashTop">
                    <div className = "dashHead ">Welcome Back, {sessionStorage.getItem("name")}</div>
                    <LogOut/>
                </div>

                <div className = "postSection">
                    <div className = "feedQuote">Your feed</div>
                     {   // If no posts, show banner if not render posts for logged in user
                         userPosts.length > 0 ?
                         userPosts.map((post) => (
                             <PostElement element={post} />))
                         : <div className='noPosts' >
                                <div>No Posts</div>
                                <br></br>
                                <div>Click on the "Make a New Post" tab on the Navigation Bar
                                    to make your first post!</div>
                         </div>
                    }
                </div>
            </div>
        </div>
    );
}