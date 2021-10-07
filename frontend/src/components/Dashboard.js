/* DASHBOARD - Shows Logged in user's posts */

import './styles/Dashboard.css';
import './styles/PostElement.css';
import React from "react";
import SideBar from './SideBar';
import LogOut from "./LogOutButton";
import { useState, useEffect } from "react";
import { getPosts} from "../data/repository";
import PostElement from './PostElement';

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
                          posts.map((x) =>(
                            <PostElement element = {x} />
                          )
                          )
                      }
                </div>
            </div>
        </div>
    );
}