import React from "react";
import SideBar from './SideBar';
import LogOut from "./LogOutButton";
import { useState, useEffect, useContext } from "react";
import { Link} from "react-router-dom";
import { useHistory } from "react-router-dom";
import { findUser, updateUser, getUser } from "../data/repository";
import './styles/Profile.css';

export default function MyProfile(props) {
  const [fields, setFields] = useState({
    first_name: "", last_name: "",  password: ""
  });
  const [errors, setErrors] = useState({ });
  const [userPP, setUserPP] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  // Set preview picture when profile picture is uploaded
  useEffect(() => {
    async function loadUserPP(){
      const currentPP = await findUser(props.user.username);

      setUserPP(currentPP.profilePicture);
      setIsLoading(false);
      console.log(currentPP.profilePicture);
    }

    loadUserPP();
  }, [])

  // Ensure null is not used when setting fields.
  const setFieldsNullToEmpty = (currentFields) => {
    // Make a copy of currentFields so the original parameter is not modified.
    currentFields = { ...currentFields };

    for(const [key, value] of Object.entries(currentFields)) {
      currentFields[key] = value !== null ? value : "";
    }

    setFields(currentFields);
  };

  // Generic change handler.
  const handleInputChange = (event) => {
    setFields({ ...fields, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form and if invalid do not contact API.
    const { trimmedFields, isValid } = handleValidation();
    if(!isValid)
      return;
    
    console.log(trimmedFields);

    // set trimmed fields in object to submit to API

    const first_name = trimmedFields.first_name;
    const last_name = trimmedFields.last_name;
    const password = trimmedFields.password;

    const userObject = {username: props.user.username, firstname: first_name, lastname: last_name, password: password}

    console.log(userObject);

    // Update profile.
    const profile = await updateUser(userObject);

    // Show success message.
    alert(profile.first_name, profile.last_name, "Details are updated");

    // Navigate to the profiles page.
    history.push("/dashboard");
  };

  const handleValidation = () => {
    const trimmedFields = trimFieldsEmptyToNull();
    const currentErrors = { };

    // let key = "first_name";
    // let field = trimmedFields[key];
    // if(field.length > 40)
    //   currentErrors[key] = "First name length cannot be greater than 40.";

    // key = "last_name";
    // field = trimmedFields[key];
    // if(field.length > 40)
    //   currentErrors[key] = "Last name length cannot be greater than 40.";

    // key = "password";
    // field = trimmedFields[key];;
    // if(field.length < 6)
    // currentErrors[key] = "Password must contain at least 6 characters.";

    setErrors(currentErrors);

    return { trimmedFields, isValid: Object.keys(currentErrors).length === 0 };
  };

  // Note: Empty fields are converted to null.
  const trimFieldsEmptyToNull = () => {
    const trimmedFields = { };

    for(const [key, value] of Object.entries(fields)) {
      let field = value;

      // If value is not null trim the field.
      if(field !== null) {
        field = field.trim();

        // If the trimmed field is empty make it null.
        if(field.length === 0)
          field = null;
      }

      trimmedFields[key] = field;
    }

    setFieldsNullToEmpty(trimmedFields);

    return trimmedFields;
  };

  // if(fields === null)
  //   return null;
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
                        <br></br>
                        <div className = "formLabel">{props.user.username}</div>
                        <div className = "formLabel">{props.user.first_name} {props.user.last_name}</div>
                    </div>
                    <div className="profileQuote">You can check and change any of your details here!</div>
                    <form className = "profile" onSubmit={handleSubmit}>
                        {/*<div className = "imgChange">
                            <div className = "formLabel">Change Profile Picture</div>
                            <input type='file' onChange={onSelectFile} />
                        </div>*/}
                        <div className = "nameChange">
                            <div className = "formLabel">Change First Name</div>
                            <input name="first_name" id="first_name" placeholder = " Change First Name" className = "formInput"
                                value={fields.firstname} onChange={handleInputChange} />
                            {errors.first_name && <div className="errorMessage">{errors.first_name}</div>}
                        </div>

                        <div className = "nameChange">
                            <div className = "formLabel">Change Last Name</div>
                            <input name="last_name" id="last_name" placeholder = " Change Last Name" className = "formInput"
                                value={fields.lastname} onChange={handleInputChange} />
                            {errors.lastname && <div className="errorMessage">{errors.lastname}</div>}
                        </div>

                        <div className = "passwordChange">
                            <div className = "formLabel">Change Password</div>
                            <input type = "password" name="password" id="password" placeholder = " Change Password" className = "formInput"
                                value={fields.password} onChange={handleInputChange} />
                            {errors.password && <div className="errorMessage">{errors.password}</div>}
                        </div>

                        <button type="submit" className = "submitChange">Submit Changes</button>
                    </form>

                    <div className = "profileQuote">If you would like to terminate your account, click the button below.</div>
                    <div className = "bottomRow">
                        <button 
                            onClick={() => {
                                const confirmBox = window.confirm(
                                "Are you sure you want to Delete your Account? This Action is not reversible."
                                )
                                if (confirmBox === true) {
                                    // deleteAccount();
                                }
                            }}
                        className = "deleteAccount signOutHover">Delete Account</button>
                    </div>
                    <br></br>
                </div>
            </div>
    );
  // return (
  //   <div>
  //     <h1 className="display-4">My Profile</h1>
  //     <h4><strong>Hello {props.user.first_name} {props.user.last_name}!</strong></h4>
  //   </div>
  // );
}
