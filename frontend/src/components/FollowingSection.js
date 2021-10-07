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

    // Load posts.
    useEffect(() => {
        async function loadUsers() {
            const currentUsers = await getUsers();

            setUsers(currentUsers);
            setIsLoading(false);
        }

        async function loadFollowing() {
            const currentFollowing = await getFollowing(props.user.username);
    
            setFollowing(currentFollowing);
        }

        loadUsers();
        loadFollowing();
    }, []);

    users.map((x) => userNames.push(x.username));
    following.map((x) => followingUsernames.push(x.followingUsername));

    console.log(userNames);
    console.log(followingUsernames);
    
    exclusiveUsernameList = userNames.filter(function(obj) { return followingUsernames.indexOf(obj) == -1; });

    console.log(exclusiveUsernameList);

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
                        {
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

