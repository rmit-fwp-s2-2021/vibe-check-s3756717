import { addFollowing, getUser } from "../data/repository";

const FollowObject = ({ element }) => {

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
            <div>{element}</div>
            <button className = "followBtn" onClick = {handleSubmit}>Follow</button>
        </div>
    );
}

export default FollowObject;