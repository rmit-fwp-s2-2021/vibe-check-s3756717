/* LOG OUT BUTTON - Log out button once user is logged in */

import logOut from './addons/logout.svg';
import {
    Link
} from "react-router-dom";

export default function LogOut(){
    //Clear session of logged in user details
    const logOutFunction = () => {
        sessionStorage.clear();
    }
    return(
        <div>
        <Link to = "/" style={{ textDecoration: 'none'}} className = "signOut signOutHover"  onClick = {() => logOutFunction()}><img className = "navLogo" src = {logOut} alt = "log out"></img>Sign Out</Link>
        </div>
    );
}