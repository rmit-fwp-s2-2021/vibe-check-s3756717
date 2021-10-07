import { removeFollowing, getUser, findUser } from "../data/repository";
import { useState, useEffect } from "react";

const UnfollowObject = ({ element }) => {

    const [userPP, setUserPP] = useState("");

    useEffect(() => {
        async function loadUser() {
            const user = await findUser(element);
            const currentUserPP = user.profilePicture;
            setUserPP(currentUserPP);
            console.log(userPP);
        }
        loadUser();

    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        await removeFollowing(getUser().username, element);

        alert("You've unfollowed "+ element +"!");
        window.location.reload();
    }

    return(
        <div className = "followObject">
            <img className = "userAvatar" src = {"data:image/jpeg;base64," + userPP} />
            <div className = "userFollowText">{element}</div>
            <button className = "unFollowBtn" onClick = {handleSubmit}>Unfollow</button>
        </div>
    );
}

export default UnfollowObject;