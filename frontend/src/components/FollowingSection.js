/* FOLLOWING SECTION - Follow and unfollow functionality for logged in user. */

import { getFollowing, getUsers } from "../data/repository";
import { useState, useEffect } from "react";
import SideBar from './SideBar';
import LogOut from "./LogOutButton";
import FollowObject from "./FollowObject";
import UnfollowObject from "./UnfollowObject";

export default function FollowingSection(props){
    const [users, setUsers] = useState([]);
    const [following, setFollowing] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    var userNames = [];
    var followingUsernames = [];
    var exclusiveUsernameList = [];

    // Load all users and logged in user's following list.
    useEffect(() => {
        async function loadUsers() {
            const currentUsers = await getUsers();

            setUsers(currentUsers);
            setIsLoading(false);
        }

        async function loadFollowing() {
            const currentFollowing = await getFollowing(props.user.username);
    
            setFollowing(currentFollowing);
            setIsLoading(false);
        }

        loadUsers();
        loadFollowing();
    }, []);

    // Make array with all users' usernames
    users.map((x) => userNames.push(x.username));

    // Make array with usernames of following users list
    following.map((x) => followingUsernames.push(x.followingUsername));

    // Make new array with different elements from both arrays to show users that haven't been followed
    exclusiveUsernameList = userNames.filter(function(obj) { return followingUsernames.indexOf(obj) == -1; });

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
                    <div className = "usersSection">
                        <div className = "userList">
                        <h3>All Users</h3>
                        {isLoading ?
                            <div className = "noPosts">Loading users...</div>
                            :
                            exclusiveUsernameList.map((x) => 
                                {
                                    if(x != props.user.username)
                                        return <FollowObject element = {x} />
                                }
                            ) 
                        }
                        </div>

                        <div className = "userList">
                        <h3>Following</h3>
                        {isLoading ?
                            <div className = "noPosts">Loading users...</div>
                            :
                            followingUsernames.map((x) =>
                                <UnfollowObject element = {x} />
                            )
                        }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

