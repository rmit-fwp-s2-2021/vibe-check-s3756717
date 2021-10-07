import { removeFollowing, getUser } from "../data/repository";

const UnfollowObject = ({ element }) => {

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(getUser().username);
        const newFollower = { username: getUser().username, followingUsername: element};

        await removeFollowing(getUser().username, element);

        alert("You've unfollowed "+ element +"!");
        window.location.reload();
    }

    return(
        <div className = "followObject">
            <div>{element}</div>
            <button className = "unFollowBtn" onClick = {handleSubmit}>Unfollow</button>
        </div>
    );
}

export default UnfollowObject;