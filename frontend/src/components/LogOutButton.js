/* LOG OUT BUTTON - Log out button once user is logged in */

import logOut from './addons/logout.svg';
import { removeUser } from "../data/repository";
import {
    Link
} from "react-router-dom";

export default function LogOut(){
    //Clear session of logged in user details
    return(
        <div>
        <Link to = "/" style={{ textDecoration: 'none'}} className = "signOut signOutHover"  onClick={removeUser}><img className = "navLogo" src = {logOut} alt = "log out"></img>Sign Out</Link>
        </div>
    );
}