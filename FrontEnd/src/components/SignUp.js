/* SIGN UP - Sign up page for user to register for vibe check services. */

import './styles/SignUp.css';
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import {
    Link
} from "react-router-dom";
import signUpPic from './addons/signUpPic.png';
import Footer from './Footer';
import imageToBase64 from 'image-to-base64/browser';

export default function SignUp(){
    const [selectedFile, setSelectedFile] = useState();
    var avatar;
    const [preview, setPreview] = useState();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState(new Map());
    const history = useHistory();

    const joinDate = (new Date()).toString().split(' ').splice(1,3).join(' ');

    // Function that validates input fields for signing up
    const validate = () => {
        let retVal = true
        // Checking for empty form values
        let fieldsName = ['name', 'email', 'password', 'confirmPassword', 'preview']
        let fields = [name, email, password, confirmPassword, preview]
        let minCharacters = 6;
        let error_sections = new Map()

        // Check if all fields are filled in
        for (let k = 0; k < fields.length; k++) {
            if (fields[k] === "" || fields[k] === null) {
                error_sections.set(fieldsName[k], "All Fields must be filled in!")
                retVal = false
            }
        }

        // Check for password format
        var passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
        if(password.length < minCharacters || !passwordRegex.test(password)){
            error_sections.set('password', 'Password should contain at least 6 characters, an Upper case character, a lower case character, number and punctuation!');
            retVal = false
        }

        // Check for Password Mismatch
        if (password !== "" && confirmPassword !== "" && password !== confirmPassword) {
            error_sections.set('formError', "Password Mismatch!")
            retVal = false
        }

        // Check for email format
        const emailRegex = /\S+@\S+\.\S+/;
        if (email !== "" && !emailRegex.test(email)) {
            error_sections.set('email', "Email must be in right format")
            retVal = false
        }

        setErrors(error_sections)
        return retVal
    }

    // Set preview picture when profile picture is uploaded
    useEffect(() => {
        //If file has been selected, don't set preview
        if (!selectedFile) {
            setPreview(undefined);
            return;
        }

        // Get blob url for preview
        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);

        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile])

    // Function to set selected file
    const onSelectFile = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined);
            return;
        }

        setSelectedFile(e.target.files[0]);
    }

    // Upload sign up information to localStorage
    const handleSubmit = () => { 
        // Check for field validation
        if (validate()){
            // Get blob for profile picture
            const avatarUrl = URL.createObjectURL(selectedFile);
            imageToBase64(avatarUrl) // Get base64 url for profile picture blob
            .then(
                (response) => {
                    avatar = response;
                    if(validate()){
                        const customer1 = {
                            avatar: avatar,
                            name: name,
                            email: email,
                            password: password,
                            posts: [],
                            joinDate: joinDate
                        };

                        // Put the object into storage
                        localStorage.setItem(email, JSON.stringify(customer1));
                        alert("You have succesfully registered to Vibe Check!");

                        // Reset data
                        setName("");
                        setEmail("");
                        setPassword("");

                        // Redirect to Login page
                        history.push({
                            pathname: '/signIn',
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
    }

    return(
        <div className = "landingWrapper">
            <div className = "dashTop">
                <Link to = "/" style={{ textDecoration: 'none', color: 'white' }} className = "dashHead">Vibe Check</Link>
                <div className = "landingBtns">
                    <Link to = "/signIn" style={{ textDecoration: 'none' }} className = "signIn">Sign In</Link>
                </div>
            </div>

            <div className = "signUpContent">
                <div className = "signUpSection">
                    <div className = "signUpQuote">Sign Up to have your vibes lifted!</div>
                    <div className = "signUpForm">
                         {selectedFile &&  <img className = "preview" src={preview} alt = "preview"/>}
                        <br></br>
                        <div className = "formElement">
                            <div className = "formLabel">Avatar</div>
                            <input type='file' onChange={onSelectFile} />
                        </div>
                        <span className="errorMessage"> {errors.get("preview")} </span>
                        <div className = "formElement">
                            <div className = "formLabel">Name</div>
                            <input className = "formInput" type = "text" placeholder = " Name" value={name}
                            onChange={(e) => setName(e.target.value)} required></input>
                        </div>
                        <span className="errorMessage"> {errors.get("name")} </span>
                        <div className = "formElement">
                                <div className = "formLabel">Email</div>
                                <input className = "formInput" type = "email" placeholder = " Email" value = {email}
                                onChange = {(e) => setEmail(e.target.value)} required></input>
                        </div>
                        <span className="errorMessage"> {errors.get("email")} </span>

                        <div className = "formElement">
                                <div className = "formLabel">Password</div>
                                <input className = "formInput" type = "password" placeholder = " Password" value = {password}
                                onChange = {(e) => setPassword(e.target.value)} required></input>
                        </div>
                        <span className="errorMessage"> {errors.get("password")} </span>

                        <div className = "formElement">
                                <div className = "formLabel">Confirm Password</div>
                                <input className = "formInput" type = "password" placeholder = " Confirm Password" value = {confirmPassword}
                                onChange = {(e) => setConfirmPassword(e.target.value)} required></input>
                        </div>
                        <span className="errorMessage"> {errors.get("confirmPassword")} </span>

                        <button className = "signUpButton signUp signUpHover" onClick={() => handleSubmit()}>Sign Me Up!</button>
                        <span className="errorMessage"> {errors.get("formError")} </span>
                    </div>
                </div>
                <img className = "signUpImg" src = {signUpPic} alt = "sign up"></img>
            </div>

            <Footer/>  
        </div>
    );
}