import { addFollowing, getUser, findUser } from "../data/repository";
import { useState, useEffect } from "react";

const FollowObject = ({ element }) => {
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
        console.log(element);
        const newFollower = { username: getUser().username, followingUsername: element,};

        await addFollowing(newFollower);

        alert("You've started following "+ element +"!");
        window.location.reload();
    }

    

    return(
        <div className = "followObject">
            <img className = "userAvatar" src = {"data:image/jpeg;base64," + userPP} />
            <div className = "userFollowText">{element}</div>
            <button className = "followBtn" onClick = {handleSubmit}>Follow</button>
        </div>
    );
}

export default FollowObject;