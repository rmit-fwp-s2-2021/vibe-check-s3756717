/* SIGN IN - Sign in page for registered users to enjoy vibe check services */

import {
    Link
} from "react-router-dom";
import React, {useState} from "react";
import {useHistory} from "react-router";
import Footer from "./Footer";

export default function SignIn(){
    const history = useHistory(new Map());
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState(new Map());
    const [loginFailed, setLoginFailed] = useState(false);
    const [nullUser, setNullUser] = useState(false);
    
    // Validate input fields for logging in
    const validate = () => {
        let retVal = true

        // Checking for empty form values
        let fieldsName = ['email', 'password']
        let fields = [email, password]
        let error_sections = new Map()
        for (let k = 0; k < fields.length; k++) {
            if (fields[k] === "") {
                error_sections.set(fieldsName[k], "All Fields are Required")
                retVal = false
            }
        }

        setErrors(error_sections)
        return retVal
    }

    const handleLogin = async () => {
        // Retrieve the email of logged in user from session and the logged in user object from storage
        var retrievedObject = localStorage.getItem(email);
        const userDetails = JSON.parse(retrievedObject);
        
        if(validate() && userDetails != null){
            // Retrieve user password
            const userPassword = userDetails.password;
            let found = false;

            if(password === userPassword && userPassword !== null){
                //Login successful
                found = true;
                // Reset fields
                setEmail("")
                setPassword("")

                // Set Session Variables of logged in user
                sessionStorage.setItem("name", userDetails.name)
                sessionStorage.setItem("email", userDetails.email);
                sessionStorage.setItem("avatar", userDetails.avatar);
                sessionStorage.setItem("joinDate", userDetails.joinDate)
                sessionStorage.setItem("isLoggedIn", true)

                // Redirect to user page 
                history.push({
                    pathname: '/dash',
                });
            }

            // If password is incorrect to corresponding email
            if(!found){
                // Set error message
                console.log('Login failed');
                setLoginFailed(true);
            }

        }

        // If user does not exist
        if(userDetails == null){
            // Set error message
            console.log('User doesnt exist');
            setNullUser(true);
        }

    }
    return(
        <div className = "landingWrapper">
            <div className = "dashTop">
                <Link to = "/" style={{ textDecoration: 'none', color: 'white' }} className = "dashHead">Vibe Check</Link>
                <div className = "landingBtns">
                    <Link to = "/signUp" style={{ textDecoration: 'none' }} className = "signIn">Sign Up</Link>
                </div>
            </div>

            <div className = "signUpContent">
                <div className = "signUpSection">
                    <div className = "signUpQuote">Login to Enjoy the Serotonin!</div>
                    <div className = "signUpForm">
                        <span className="errorMessage"> {errors.get("email")} </span>    
                        <div className = "formElement">
                                <div className = "formLabel">Email</div>
                                <input className = "formInput" type = "email" placeholder = " Email" 
                                value={email} onChange={(e) => setEmail(e.target.value)} required></input>
                        </div>

                        <div className = "formElement">
                                <div className = "formLabel">Password</div>
                                <input className = "formInput" type = "password" placeholder = " Password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} required></input>
                        </div>
                        <span className="errorMessage"> {errors.get("password")} </span>
                        {loginFailed && <div className="errorMessage" > Login failed, Please try again. </div>}
                        {nullUser && <div className="errorMessage" > User does not exist, please sign up. </div>}

                        <button className = "signUpButton signUp signUpHover" onClick={() => handleLogin()}>Let's Goooo!</button>
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    );
}