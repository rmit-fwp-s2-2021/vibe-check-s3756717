import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { findUser, createUser } from "../data/repository";
import './styles/SignUp.css';
import signUpPic from './addons/signUpPic.png';
import Footer from './Footer';
import imageToBase64 from 'image-to-base64/browser';

export default function Register(props) {
  const history = useHistory();
  const [fields, setFields] = useState({
    username: "", firstname: "", lastname: "",  password: "", confirmPassword: ""
  });
  const [errors, setErrors] = useState({ });
  const [selectedFile, setSelectedFile] = useState();
  var avatar;
  const [preview, setPreview] = useState();

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

  // Generic change handler.
  const handleInputChange = (event) => {
    setFields({ ...fields, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Get blob for profile picture
    const avatarUrl = URL.createObjectURL(selectedFile);
    imageToBase64(avatarUrl) // Get base64 url for profile picture blob
    .then(
        async (response) => {
            avatar = response;
            // Validate form and if invalid do not contact API.
            const { trimmedFields, isValid } = await handleValidation();
            if(!isValid)
              return;

            const userItem = {username: trimmedFields.username, firstname: trimmedFields.firstname, lastname: trimmedFields.lastname,
                              password: trimmedFields.password,  confirmPassword: trimmedFields.confirmPassword, profilePicture: response}

            // Create user.
            const user = await createUser(userItem);

            // Set user state.
            props.loginUser(user);

            // Navigate to the home page.
            history.push("/dashboard");
        }
    )
    .catch(
        (error) => {
            console.log(error); // Logs an error if there was one
        }
    )
  };

  const handleValidation = async () => {
    const trimmedFields = trimFields();
    const currentErrors = { };

    let key = "username";
    let field = trimmedFields[key];
    if(field.length === 0)
      currentErrors[key] = "Username is required.";
    else if(field.length > 32)
      currentErrors[key] = "Username length cannot be greater than 32.";
    else if(await findUser(trimmedFields.username) !== null)
      currentErrors[key] = "Username is already registered.";

    key = "firstname";
    field = trimmedFields[key];
    if(field.length === 0)
      currentErrors[key] = "First name is required.";
    else if(field.length > 40)
      currentErrors[key] = "First name length cannot be greater than 40.";

    key = "lastname";
    field = trimmedFields[key];
    if(field.length === 0)
      currentErrors[key] = "Last name is required.";
    else if(field.length > 40)
      currentErrors[key] = "Last name length cannot be greater than 40.";

    key = "password";
    field = trimmedFields[key];
    if(field.length === 0)
      currentErrors[key] = "Password is required.";
    else if(field.length < 6)
      currentErrors[key] = "Password must contain at least 6 characters.";

    key = "confirmPassword";
    field = trimmedFields[key];
    if(field !== trimmedFields.password)
      currentErrors[key] = "Passwords do not match.";

    setErrors(currentErrors);

    return { trimmedFields, isValid: Object.keys(currentErrors).length === 0 };
  };

  const trimFields = () => {
    const trimmedFields = { };
    Object.keys(fields).map(key => trimmedFields[key] = fields[key].trim());
    setFields(trimmedFields);

    return trimmedFields;
  };

  return(
    <div className = "landingWrapper">
            <div className = "dashTop">
                <Link to = "/" style={{ textDecoration: 'none', color: 'white' }} className = "dashHead">Vibe Check</Link>
                <div className = "landingBtns">
                    <Link to = "/login" style={{ textDecoration: 'none' }} className = "signIn">Sign In</Link>
                </div>
            </div>

            <div className = "signUpContent">
                <div className = "signUpSection">
                    <div className = "signUpQuote">Sign Up to have your vibes lifted!</div>
                    <form className = "signUpForm" onSubmit={handleSubmit}>
                    {selectedFile &&  <img className = "preview" src={preview} alt = "preview"/>}
                        <br></br>
                        <div className = "formElement">
                            <div className = "formLabel">Avatar</div>
                            <input type='file' onChange={onSelectFile} required/>
                        </div>
                        <div className = "formElement">
                            <div className = "formLabel">First Name</div>
                            <input name="firstname" id="firstname" placeholder = " First Name" className="formInput"
                                  value={fields.firstname} onChange={handleInputChange} required/>
                        </div>
                        {errors.firstname &&
                          <div className="errorMessage">{errors.firstname}</div>
                        }
                        <div className = "formElement">
                            <div className = "formLabel">Last Name</div>
                            <input name="lastname" id="lastname" placeholder = " Last Name" className="formInput"
                                  value={fields.lastname} onChange={handleInputChange} required/> 
                        </div>
                        {errors.lastname &&
                          <div className="errorMessage">{errors.lastname}</div>
                        }
                        <div className = "formElement">
                                <div className = "formLabel">Username</div>
                                <input name="username" id="username" placeholder = " Username" className="formInput"
                                    value={fields.username} onChange={handleInputChange} required/>    
                        </div>
                        {errors.username &&
                          <div className="errorMessage">{errors.username}</div>
                        }
                        <div className = "formElement">
                                <div className = "formLabel">Password</div>
                                <input type="password" name="password" id="password" placeholder = " Password" className="formInput"
                                    value={fields.password} onChange={handleInputChange} />
                                  
                        </div>
                        {errors.password &&
                          <div className="errorMessage">{errors.password}</div>
                        }

                        <div className = "formElement">
                                <div className = "formLabel">Confirm Password</div>
                                <input type="password" name="confirmPassword" id="confirmPassword" placeholder = " Confirm Password" className="formInput"
                                    value={fields.confirmPassword} onChange={handleInputChange} />   
                        </div>
                        {errors.confirmPassword &&
                          <div className="errorMessage">{errors.confirmPassword}</div>
                        }
                        <input type="submit" className = "signUpButton signUp signUpHover" value="Sign Me Up!" />
                    </form>
                </div>
                <img className = "signUpImg" src = {signUpPic} alt = "sign up"></img>
            </div>

            <Footer/>  
        </div>
  );

  // return (
  //   <div>
  //     <h1>Register</h1>
  //     <hr />
  //     <div className="row">
  //       <div className="col-md-6">
  //         <form onSubmit={handleSubmit}>
  //           <div className="form-group">
  //             <label htmlFor="username" className="control-label">Username</label>
  //             <input name="username" id="username" className="form-control"
  //               value={fields.username} onChange={handleInputChange} />
  //             {errors.username &&
  //               <div className="text-danger">{errors.username}</div>
  //             }
  //           </div>
  //           <div className="form-group">
  //             <label htmlFor="firstname" className="control-label">First name</label>
  //             <input name="firstname" id="firstname" className="form-control"
  //               value={fields.firstname} onChange={handleInputChange} />
  //             {errors.firstname &&
  //               <div className="text-danger">{errors.firstname}</div>
  //             }
  //           </div>
  //           <div className="form-group">
  //             <label htmlFor="lastname" className="control-label">Last name</label>
  //             <input name="lastname" id="firstname" className="form-control"
  //               value={fields.lastname} onChange={handleInputChange} />
  //             {errors.lastname &&
  //               <div className="text-danger">{errors.lastname}</div>
  //             }
  //           </div>
  //           <div className="form-group">
  //             <label htmlFor="password" className="control-label">
  //               Password <small className="text-muted">must be at least 6 characters</small>
  //             </label>
  //             <input type="password" name="password" id="password" className="form-control"
  //               value={fields.password} onChange={handleInputChange} />
  //             {errors.password &&
  //               <div className="text-danger">{errors.password}</div>
  //             }
  //           </div>
  //           <div className="form-group">
  //             <label htmlFor="confirmPassword" className="control-label">Confirm password</label>
  //             <input type="password" name="confirmPassword" id="confirmPassword" className="form-control"
  //               value={fields.confirmPassword} onChange={handleInputChange} />
  //             {errors.confirmPassword &&
  //               <div className="text-danger">{errors.confirmPassword}</div>
  //             }
  //           </div>
  //           <div className="form-group">
  //             <input type="submit" className="btn btn-primary mr-5" value="Register" />
  //             <Link className="btn btn-outline-dark" to="/">Cancel</Link>
  //           </div>
  //         </form>
  //       </div>
  //     </div>
  //   </div>
  // );
}
