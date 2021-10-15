import { deleteUser, blockUser, getUser, updateUser } from "../data/repository";
import { useState, useEffect } from "react";

export default function User({element}){
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({ });
    const [openEdit, setOpenEdit] = useState(false);

    useEffect(() => {
      async function loadUser() {
        const user = await getUser(element.username);
  
        setFirstName(user.first_name);
        setLastName(user.last_name);
        setPassword(user.password_hash);
      }
      loadUser();
    }, []);

    const handleEdit = () => {
      if(openEdit === false)
        setOpenEdit(true);

      else if(openEdit === true)
        setOpenEdit(false);
    }

    const handleSubmit = async (event) => {
      event.preventDefault();
  
      // Validate form and if invalid do not contact API.
      const { trimmedFields, isValid } = handleValidation();
      if(!isValid)
        return;

      const userUpdate = {username: element.username, first_name: trimmedFields.first_name, last_name: trimmedFields.last_name, password: trimmedFields.password};
      
      console.log(userUpdate);
      // Update user.
      await updateUser(userUpdate);
  
      // Show success message.
      alert(element.username + "'s details have been updated.")
      
      window.location.reload();
      
    };

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

    const handleDelete = async (username) => {
        if(!window.confirm(`Are you sure you want to delete ${username} ?`))
          return;
        
        const isDeleted = await deleteUser(username);
    
        if(isDeleted) {
          // Could remove the user that was deleted or refresh the users.
          // Here the users are refreshed.
          window.location.reload();
    
          alert(username + " has been deleted.");
        }
    };

    const handleBlock = async (username) => {
      if(!window.confirm(`Are you sure you want to block ${username} ?`))
          return;

      await blockUser(username);

      window.location.reload();
    
      alert(username + " has been blocked.");
    }

    const handleUnBlock = async (username) => {
      if(!window.confirm(`Are you sure you want to unblock ${username} ?`))
          return;

      await blockUser(username);

      window.location.reload();
    
      alert(username + " has been unblocked.");
    }



    return(
        <tr key={element.username}>
            <td>{element.username}</td>
            <td>{element.first_name} {element.last_name}</td>

            <td>
            <tr>{element.password_hash}</tr>
            <tr>{
              openEdit === true?
                <div>
                  <br></br>
                  <form onSubmit={handleSubmit}>
                    <h4 className="mb-3 text-primary">Change {element.username}'s Details</h4>
            
                    <div className="row">
                      <div className="col-12 col-md-6">
                        <div className="form-group">
                          <label htmlFor="first_name" className="control-label">First Name</label>
                          <input name="first_name" id="first_name" className="form-control"
                            value={firstName} onChange={(e) => setFirstName((e.target.value).trim())} />
                          {errors.first_name && <div className="text-danger">{errors.first_name}</div>}
                        </div>
                      </div>
                    </div>
                    <br></br>

                    <div className = "row">
                      <div className="col-12 col-md-6">
                        <div className="form-group">
                          <label htmlFor="last_name" className="control-label">Last Name</label>
                          <input name="last_name" id="last_name" className="form-control"
                            value={lastName} onChange={(e) => setLastName((e.target.value).trim())} />
                          {errors.last_name && <div className="text-danger">{errors.last_name}</div>}
                        </div>
                      </div>
                    </div>
                    <br></br>

                    <div className = "row">
                      <div className="col-12 col-md-6">
                        <div className="form-group">
                          <label htmlFor="password" className="control-label">Password</label>
                          <input type = "password" name="password_hash" id="password_hash" className="form-control"
                            value={password} onChange={(e) => setPassword((e.target.value))} />
                          {errors.password && <div className="text-danger">{errors.password}</div>}
                        </div>
                      </div>
                    </div>
                    <br></br>
                    
                    <div className = "row">
                      <div className="col-12">
                        <div className="form-group text-md-right">
                          <button type="submit" className="btn btn-primary">Update</button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              :
              <div></div>
            }</tr>
            </td>
            <td>
            <button className="btn btn-primary" onClick={() => handleEdit()} data-toggle="modal" data-target="#exampleModalCenter">Edit</button>
            </td>
            <td>
            {element.blocked === false?
              <button className="btn btn-danger" onClick={() => handleBlock(element.username)}>Block</button>
            :
              <button className="btn btn-success" onClick={() => handleUnBlock(element.username)}>Unblock</button>}
            </td>
            <td><button className="btn btn-danger" onClick={() => handleDelete(element.username)}>Delete</button></td>
            <div colSpan = "6">
          </div>
        </tr>
    )
}

