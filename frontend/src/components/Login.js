import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { verifyUser, addLoginEntry } from "../data/repository";
import {
  Link
} from "react-router-dom";
import Footer from "./Footer";
import './styles/SignUp.css';

export default function Login(props) {
  const history = useHistory();
  const [fields, setFields] = useState({ username: "", password: "" });
  const [errorMessage, setErrorMessage] = useState(null);

  // Generic change handler.
  const handleInputChange = (event) => {
    setFields({ ...fields, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = await verifyUser(fields.username, fields.password);

    if(user === null) {
      // Login failed, reset password field to blank and set error message.
      setFields({ ...fields, password: "" });
      setErrorMessage("Username and / or password invalid, please try again.");
      return;
    }

    if(user.blocked === true){
      // Login failed because of admin has blocked account
      setFields({ ...fields, password: "" });
      setErrorMessage("You have been blocked by an admin.");
      return;
    }

    // Set user state.
    props.loginUser(user);
    const loginEntry = {username: fields.username};
    addLoginEntry(loginEntry);


    // Navigate to the home page.
    history.push("/dashboard");
  };

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
                    <form className = "signUpForm" onSubmit={handleSubmit}>   
                        <div className = "formElement">
                                <div className = "formLabel">Username</div>
                                <input name="username" id="username" placeholder = " Username" className="formInput"
                                    value={fields.username} onChange={handleInputChange} />
                        </div>

                        <div className = "formElement">
                                <div className = "formLabel">Password</div>
                                <input type="password" name="password" id="password" placeholder = " Password" className="formInput"
                                    value={fields.password} onChange={handleInputChange} />
                        </div>
                        {errorMessage !== null &&
                            <span className="errorMessage">{errorMessage}</span>
                        }

                        <input type="submit" className="signUpButton signUp signUpHover" value="Let's Goooo!" />
                    </form>
                </div>
            </div>

            <Footer/>
        </div>
  );

  // return (
  //   <div>
  //     <h1>Login</h1>
  //     <hr />
  //     <div className="row">
  //       <div className="col-md-6">
  //         <form onSubmit={handleSubmit}>
  //           <div className="form-group">
  //             <label htmlFor="username" className="control-label">Username</label>
  //             <input name="username" id="username" className="form-control"
  //               value={fields.username} onChange={handleInputChange} />
  //           </div>
  //           <div className="form-group">
  //             <label htmlFor="password" className="control-label">Password</label>
  //             <input type="password" name="password" id="password" className="form-control"
  //               value={fields.password} onChange={handleInputChange} />
  //           </div>
  //           <div className="form-group">
  //             <input type="submit" className="btn btn-primary" value="Login" />
  //           </div>
  //           {errorMessage !== null &&
  //             <div className="form-group">
  //               <span className="text-danger">{errorMessage}</span>
  //             </div>
  //           }
  //         </form>
  //       </div>
  //     </div>
  //   </div>
  // );
}
