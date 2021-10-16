import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { getLoginEntries, getUsers, countFollowing } from "../data/repository";
import { Bar } from "react-chartjs-2";


export default function Statistics(){
    const [loginEntries, setLoginEntries] = useState([]);
    const [users, setUsers] = useState([]);
    const last5days = getLast5Dates();
    const [userFollowing, setUserFollowing] = useState([]);
    const [username, setUsername] = useState([]);
    var usersFollowingArray = [];
    var userUsernames = [];
    var day1 = 0;
    var day2 = 0;
    var day3 = 0;
    var day4 = 0;
    var day5 = 0;

    useEffect(() => {
        const loadLoginEntries = async () => {
            const currentLogins = await getLoginEntries();
    
            setLoginEntries(currentLogins);
        };

        const loadUsers = async () => {
            const currentusers = await getUsers();
    
            setUsers(currentusers);
        };

        const loadFollowing = async () => {
            const currentFollowing = await countFollowing();

            setUserFollowing(currentFollowing);
        };

        
        loadFollowing();
        loadUsers();
        loadLoginEntries();
    }, []);

    function getCount(username){
        var count = 0;
        userFollowing.map(user => 
            {
                if(username === user.username){
                    count += 1;
                }
            }
        )

        return count;
    }

    users.map(user => {
        var userCount = getCount(user.username);
        usersFollowingArray.push(userCount);
        userUsernames.push(user.username);
    })

    loginEntries.map(login => 
        {
            var d = login.createdAt
            var dateString = d.toString()
            var dateYear = dateString.substring(0, 10);

            if(dateYear === last5days[0]){
                day1 += 1;
            }
            else if(dateYear === last5days[1]){
                day2 += 1;
            }
            else if(dateYear === last5days[2]){
                day3 += 1;
            }
            else if(dateYear === last5days[3]){
                day4 += 1;
            }
            else if(dateYear === last5days[4]){
                day5 += 1;
            }
        }
    ); 

    function formatDate(date){
        var dd = date.getDate();
        var mm = date.getMonth()+1;
        var yyyy = date.getFullYear();
        if(dd<10) {dd='0'+dd}
        if(mm<10) {mm='0'+mm}
        date = yyyy+'-'+mm+'-'+dd;
        return date
     }
    
    
    
    function getLast5Dates () {
        var result = [];
        for (var i=0; i<5; i++) {
            var d = new Date();
            d.setDate(d.getDate() - i);
            result.push( formatDate(d) )
        }
    
        return result;
     }

     const loginData = {
        labels: [last5days[4], last5days[3], last5days[2], last5days[1], last5days[0]],
        datasets: [
          {
            label: "Number of users using Vibe Check in the last 5 days",
            data: [day5, day4, day3, day2, day1],
            backgroundColor: 'rgba(75,192,192,1)',
            borderWidth: 1,
            borderColor: "rgba(75,192,192,1)",
          }
        ]
      }

      const userFollowingData = {
        labels: userUsernames,
        datasets: [
          {
            label: "Number of users followed",
            data: usersFollowingArray,
            backgroundColor: 'rgba(75,192,192,1)',
            borderWidth: 1,
            borderColor: "rgba(75,192,192,1)",
          }
        ]
      }


    return(
        <div>
            <div className = "row">
                <div className = "container">
                    <h1>Posts</h1>
                </div>
            </div>
            <br></br>
            <div className = "card">
                <h3 class="card-header">Number of Users using Vibe Check in the last 5 days</h3>
                <div class = "card-body">
                    <Bar data={loginData} style={{ maxHeight: '300px'}}/>
                </div>
            </div>
            <br></br>
            <div className = "card">
                <h3 class="card-header">Following Statistics for each user</h3>
                <div class = "card-body">
                    <Bar data={userFollowingData} style={{ maxHeight: '300px'}}/>
                </div>
            </div>



        </div>
    );
}