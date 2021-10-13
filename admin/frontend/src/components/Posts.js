import 'bootstrap/dist/css/bootstrap.min.css';
import { getPosts } from "../data/repository";
import { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import Post from './Post';
import deleteBase64 from '../addons/deleteImage';

export default function Posts(){

    const [posts, setPosts] = useState([]);

    // Load posts.
    useEffect(() => {
        const loadPosts = async () => {
            const currentPosts = await getPosts();
    
            setPosts(currentPosts);
            console.log(posts);
        };
        
        loadPosts();
    }, []);

    

    return(
        <div>
            <div className = "row">
                <div className = "container">
                    <h1>Posts</h1>
                </div>
            </div>

            <div>
                <table className="table table-hover">
                <thead>
                    <tr>
                    <th>Post ID</th>
                    <th>Post Text</th>
                    <th>Username</th>
                    <th>Post Picture</th>
                    <th>Likes</th>
                    <th>Dislikes</th>
                    <th></th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map(postObject =>
                        {if (postObject.postPicture != deleteBase64)
                        {
                            return(
                                <Post element = {postObject}/>
                            );
                        }
                        }
                    )}
                </tbody>
                </table>
            </div>
        </div>
    );
}