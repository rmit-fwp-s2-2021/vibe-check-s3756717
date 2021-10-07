/* SIDEBAR - Sidebar for logged in users for navgiation between user pages */

import './styles/SideBar.css';
import React from 'react';
import {
    Link
} from "react-router-dom";
import home from './addons/home.svg';
import profile from './addons/profile.svg';
import newPost from './addons/newPost.svg';
import following from './addons/follow.png';


export default function SideBar(props){
    return(
        <div className = "sideBarWrapper">
            <div className = "slogan">
                <div className = "sloganTitle">Vibe Check</div>
            </div>
            <div className = "navigation">
                <Link to = "/dashboard" style={{ textDecoration: 'none', color: '#5fa8a1'}} className = "nav nav-hover"><div className = "navItem"><img src = {home} className = "navLogo" alt = "home"></img>Home</div></Link>
                <Link to = "/profile" style={{ textDecoration: 'none', color: '#5fa8a1' }} className = "nav nav-hover"><div className = "navItem"><img src = {profile} className = "navLogo" alt = "profile"></img>Profile</div></Link>
                <Link to = "/make" style={{ textDecoration: 'none', color: '#5fa8a1' }} className = "nav nav-hover"><div className = "navItem"><img src = {newPost} className = "navLogo" alt = "new post"></img>Make New Post</div></Link>
                <Link to = "/following" style={{ textDecoration: 'none', color: '#5fa8a1' }} className = "nav nav-hover"><div className = "navItem"><img src = {following} className = "navLogo" alt = "following"></img>Following</div></Link>
            </div>
        </div>
    );
}