// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useState, useEffect } from 'react';
// import { getUsers, countFollowing } from "../data/repository";
// import { Bar } from "react-chartjs-2";

// export default function FollowingStats(){
//     const [userFollowing, setUserFollowing] = useState([]);
//     var usersFollowingArray = [];
//     var userUsernames = [];
//     const [users, setUsers] = useState([]);
//     useEffect(() => {
//         const loadUsers = async () => {
//             const currentusers = await getUsers();
    
//             setUsers(currentusers);
//         };

//         // async function getFollowingCount(username){
//         //     var followingCount = await countFollowing(username);
//         //     return followingCount;
//         // }

//         // users.map(user => {
//         //     userUsernames.push(user.username);
//         //     var count = getFollowingCount(user.username);
//         //     console.log(count);
//         //     usersFollowingArray.push(count);
//         // })
//         // getFollowingArray();
//         loadUsers();
//         // setUsernames();
//     });

    


    

//     console.log(usersFollowingArray);



//     const userFollowingData = {
//         labels: userUsernames,
//         datasets: [
//           {
//             label: "Following Statistics for each user",
//             data: usersFollowingArray,
//             backgroundColor: 'rgba(75,192,192,1)',
//             borderWidth: 1,
//             borderColor: "rgba(75,192,192,1)",
//           }
//         ]
//       }

//     return(
//         <div className = "card">
//             <h3 class="card-header">Following statistics for all users</h3>
//             <div class = "card-body">
//                 <Bar data={userFollowingData} style={{ maxHeight: '300px'}}/>
//             </div>
//         </div>
//     );
// }