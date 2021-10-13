import { request, gql } from "graphql-request";

// --- Constants ----------------------------------------------------------------------------------
const GRAPH_QL_URL = "http://localhost:4001/graphql";

// --- User ---------------------------------------------------------------------------------------
async function getUsers() {
    // Simply query with no parameters.
    const query = gql`
      {
        all_users {
          username,
          password_hash,
          first_name,
          last_name,
          profilePicture
        }
      }
    `;
  
    const data = await request(GRAPH_QL_URL, query);
  
    return data.all_users;
}

async function getUser(username) {
    // Query with parameters (variables).
    const query = gql`
      query ($username: String) {
        user(username: $username) {
          username,
          first_name,
          last_name,
          password_hash,
          profilePicture
        }
      }
    `;
  
    const variables = { username };
  
    const data = await request(GRAPH_QL_URL, query, variables);
  
    return data.user;
}

async function updateUser(user) {
    const query = gql`
      mutation ($username: String, $first_name: String, $last_name: String, $password: String) {
        update_user(input: {
          username: $username, 
          first_name: $first_name,
          last_name: $last_name,
          password: $password
        }) {
          first_name,
          last_name,
          password_hash
        }
      }
    `;
  
    const variables = user;
  
    const data = await request(GRAPH_QL_URL, query, variables);
  
    return data.update_user;
}

async function deleteUser(username) {
    const query = gql`
      mutation ($username: String) {
        delete_user(username: $username)
      }
    `;
  
    const variables = { username };
  
    const data = await request(GRAPH_QL_URL, query, variables);
  
    return data.delete_user;
}

// --- Post ---------------------------------------------------------------------------------------

async function getPosts() {
    // Simply query with no parameters.
    const query = gql`
      {
        all_posts {
          post_id,
          text,
          username,
          postPicture,
          likes,
          dislikes
        }
      }
    `;
  
    const data = await request(GRAPH_QL_URL, query);
  
    return data.all_posts;
}

async function updatePost(post) {
    const query = gql`
      mutation ($post_id: Int, $postText: String, $postPicture: String) {
        update_post(input: {
          post_id: $post_id, 
          text: $postText,
          postPicture: $postPicture
        }) {
          text,
          postPicture
        }
      }
    `;
  
    const variables = post;
  
    const data = await request(GRAPH_QL_URL, query, variables);
  
    return data.update_post;
}

export {
    getUsers, getUser, updateUser,deleteUser,
    getPosts, updatePost
}




