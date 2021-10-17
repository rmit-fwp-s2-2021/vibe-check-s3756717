/* MY PROFILE - Show logged in user's profile details and let user change their details */

import React from "react";
import SideBar from './SideBar';
import LogOut from "./LogOutButton";
import { useState, useEffect, useContext } from "react";
import { Link} from "react-router-dom";
import { useHistory } from "react-router-dom";
import { findUser, updateUser, setUser } from "../data/repository";
import './styles/Profile.css';

export default function MyProfile(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ });
  const [userPP, setUserPP] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  // Load logged in user details
  useEffect(() => {
    async function loadUser(){
      const currentPP = await findUser(props.user.username);

      setFirstName(currentPP.first_name);
      setLastName(currentPP.last_name);
      setPassword(currentPP.password_hash);
      setUserPP(currentPP.profilePicture);
      setIsLoading(false);
    }

    loadUser();
  }, [])

  // Update user details
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form and if invalid do not contact API.
    const { trimmedFields, isValid } = handleValidation();
    if(!isValid)
      return;

    // set trimmed fields in object to submit to API
    const first_name = trimmedFields.first_name;
    const last_name = trimmedFields.last_name;
    const password = trimmedFields.password;

    const userObject = {username: props.user.username, first_name: first_name, last_name: last_name, password: password}

    // Update profile.
    const profile = await updateUser(userObject);


    // Show success message.
    alert(props.user.username + "'s Details have been updated!");
    const newUserDetails = await findUser(props.user.username);
    setUser(newUserDetails);

    // Reload page
    window.location.reload();
  };

  // Validation for update profile fields
  const handleValidation = () => {
    const trimmedFields = {first_name: firstName, last_name: lastName, password: password};
    const currentErrors = { };

    let key = "first_name";
    let field = trimmedFields[key];
    if(field.length === 0)
      currentErrors[key] = "First name is required.";
    else if(field.length > 40)
      currentErrors[key] = "First name length cannot be greater than 40.";

    key = "last_name";
    field = trimmedFields[key];
    if(field.length === 0)
      currentErrors[key] = "Last name is required.";
    else if(field.length > 40)
      currentErrors[key] = "Last name length cannot be greater than 40.";

    key = "password";
    field = trimmedFields[key];
    var passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if(field.length === 0)
      currentErrors[key] = "Password is required."
    if(!passwordRegex.test(field))
      currentErrors[key] = 'Password should contain at least 6 characters, an Upper case character, a lower case character, number and punctuation!';
    
    setErrors(currentErrors);

    return { trimmedFields, isValid: Object.keys(currentErrors).length === 0 };
  };

    return(
        <div className = "pageWrapper">
                <SideBar/>
                <div className = "content">
                    <div className = "dashTop">
                        <div className = "dashHead">Profile</div>
                        <LogOut/>
                    </div>
                    <div className = "profileDetails">
                        {isLoading ?
                          <div className = "noPosts">Loading Profile Picture...</div>
                          :
                          <img className = "preview" src = {"data:image/jpeg;base64," + userPP} alt = "profile"/>}
                        <div className = "formLabel">{props.user.username}</div>
                        <div className = "formLabel">{props.user.first_name} {props.user.last_name}</div>
                    </div>
                    <div className="profileQuote">You can check and change any of your details here!</div>
                    <form className = "profile" onSubmit={handleSubmit}>
                        <div className = "nameChange">
                            <div className = "formLabel">Change First Name</div>
                            <input name="first_name" id="first_name" placeholder = " Change First Name" className = "formInput"
                                value={firstName} onChange={(e) => setFirstName((e.target.value).trim())} />
                            {errors.first_name && <div className="errorMessage">{errors.first_name}</div>}
                        </div>

                        <div className = "nameChange">
                            <div className = "formLabel">Change Last Name</div>
                            <input name="last_name" id="last_name" placeholder = " Change Last Name" className = "formInput"
                                value={lastName} onChange={(e) => setLastName((e.target.value).trim())} />
                            {errors.lastname && <div className="errorMessage">{errors.lastname}</div>}
                        </div>

                        <div className = "passwordChange">
                            <div className = "formLabel">Change Password</div>
                            <input type = "password" name="password" id="password" placeholder = " Change Password" className = "formInput"
                                value={password} onChange={(e) => setPassword((e.target.value).trim())} />
                            {errors.password && <div className="errorMessage">{errors.password}</div>}
                        </div>

                        <button type="submit" className = "submitChange">Submit Changes</button>
                    </form>
                    <br></br>
                </div>
            </div>
    );
}
