/* PROFILE - Profile page for logged in user to view, edit and delete account */

import SideBar from "./SideBar"
import './styles/Profile.css';
import React, {useState} from "react";
import { useHistory } from "react-router";
import LogOut from "./LogOutButton";
import imageToBase64 from 'image-to-base64/browser';

export default function Profile(){
    const [newName, setNewName] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [selectedFile, setSelectedFile] = useState();
    const history = useHistory();
    var userPosts = [];
    var avatar;
    var avatarUrl;

    // Retrieve logged in user's email from session and retrieve user object from localStorage
    const email = sessionStorage.getItem("email");
    var retrievedObject = localStorage.getItem(email);
    const userDetails = JSON.parse(retrievedObject);

    // Retrieve logged in user password
    const userPassword = userDetails.password;

    // Set logged in User's posts
    userPosts = userDetails.posts;

    // Set logged in User's profile picture
    var profilePicture = userDetails.avatar;

    // Set format to show profile picture of logged in user
    var ppUrl = "data:image/jpeg;base64," + profilePicture;

    // Function to set selected file
    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined);
            return;
        }

        setSelectedFile(e.target.files[0]);
    }

    // Function to delete logged in user's account
    const deleteAccount = () => {
        localStorage.removeItem(email);
        // Redirect to Landing Page 
        history.push({
            pathname: '/',
        });
    }

    // Function to change logged in user's details
    const changeDetails = () => {
            
            // Check if new detail fields are empty, and set old information if so
            if(newPassword === ""){
                setNewPassword(userPassword);
            }

            if(newName === ""){
                setNewName(sessionStorage.getItem("name"));
            }

            // Check if selected file for profile picture is not null, if so get blob url for selected image
            if(selectedFile != null){
                avatarUrl = URL.createObjectURL(selectedFile);
            }

            imageToBase64(avatarUrl) // Convert blob to base64 url
            .then(
                (response) => {

                    // If new file is selected, set new base64 url as profile picture
                    if(selectedFile != null){
                        avatar = response;
                    }
                    
                    // Else, set old profile picture as profile picture
                    else{
                        avatar = sessionStorage.getItem("avatar");
                    }
                    
                    // If new password and new name are not empty, upload user object back to localStorage
                    if(newPassword !== "" && newName !== ""){
                        const customer1 = {
                            avatar:avatar,
                            name: newName,
                            email: email,
                            password: newPassword,
                            posts: userPosts,
                            joinDate: sessionStorage.getItem("joinDate")
                        };
                
                        // Put the object into storage
                        localStorage.setItem(email, JSON.stringify(customer1));

                        // Notify customer of changes
                        alert("You have changed your details successfully!");

                        // Set new name and/or profile picture of logged in user as session objects
                        sessionStorage.setItem("name", newName);
                        sessionStorage.setItem("avatar", avatar);
                        
                        // Reload profile page
                        history.push({
                            pathname: '/profile',
                        });
                    }
                }
            )
            .catch(
                (error) => {
                    console.log(error); // Logs an error if there was one
                }
            )    
    }

    return(
        <div className = "pageWrapper">
            <SideBar/>
            <div className = "content">
                <div className = "dashTop">
                    <div className = "dashHead">Profile</div>
                    <LogOut/>
                </div>
                <div className = "profileDetails">
                    <img className = "preview" src = {ppUrl} alt = "profile"/> 
                    <div className = "formLabel">{sessionStorage.getItem("name")}</div>
                    <div className = "formLabel">{sessionStorage.getItem("email")}</div>
                    <div className = "formLabel">Joined Date: {sessionStorage.getItem("joinDate")}</div>
                </div>
                <div className="profileQuote">You can check and change any of your details here!</div>
                <div className = "profile">
                    <div className = "imgChange">
                        <div className = "formLabel">Change Profile Picture</div>
                        <input type='file' onChange={onSelectFile} />
                    </div>

                    <div className = "nameChange">
                        <div className = "formLabel">Change Name</div>
                        <input className = "formInput" type = "text" placeholder = " Change Name" 
                        onChange = {(e) => setNewName(e.target.value)}></input>
                    </div>

                    <div className = "passwordChange">
                        <div className = "formLabel">Change Password</div>
                        <input className = "formInput" type = "password" placeholder = " Change Password" 
                        onChange = {(e) => setNewPassword(e.target.value)}></input>
                    </div>

                    <button className = "submitChange" onClick={() => changeDetails()}>Submit Changes</button>
                </div>

                <div className = "profileQuote">If you would like to terminate your account, click the button below.</div>
                <div className = "bottomRow">
                    <button 
                        onClick={() => {
                            const confirmBox = window.confirm(
                            "Are you sure you want to Delete your Account? This Action is not reversible."
                            )
                            if (confirmBox === true) {
                                deleteAccount();
                            }
                        }}
                    className = "deleteAccount signOutHover">Delete Account</button>
                </div>
                <br></br>
            </div>
        </div>
    );
}