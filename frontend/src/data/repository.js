import axios from "axios";

// --- Constants ----------------------------------------------------------------------------------
const API_HOST = "http://localhost:4000";
const USER_KEY = "user";

// --- User ---------------------------------------------------------------------------------------
async function verifyUser(username, password) {
  const response = await axios.get(API_HOST + "/api/users/login", { params: { username, password } });
  const user = response.data;
  
  // NOTE: In this example the login is also persistent as it is stored in local storage.
  if(user !== null)
    setUser(user);

  return user;
}

async function findUser(id) {
  const response = await axios.get(API_HOST + `/api/users/select/${id}`);

  return response.data;
}

async function createUser(user) {
  const response = await axios.post(API_HOST + "/api/users", user);

  return response.data;
}

async function updateUser(user) {
  const response = await axios.put(API_HOST + "/api/users", user);

  return response.data;
}

async function getUsers(){
  const response = await axios.get(API_HOST + "/api/users");

  return response.data;
}

// --- Post ---------------------------------------------------------------------------------------
async function getPosts() {
  const response = await axios.get(API_HOST + "/api/posts");

  return response.data;
}

async function createPost(post) {
  const response = await axios.post(API_HOST + "/api/posts", post);

  return response.data;
}

async function likePost(post) {
  const response = await axios.put(API_HOST + "/api/posts", post);

  return response.data;
}

async function disLikePost(post) {
  const response = await axios.put(API_HOST + "/api/posts", post);

  return response.data;
}


// --- Comment ---------------------------------------------------------------------------------------
async function getComments() {
  const response = await axios.get(API_HOST + "/api/comments");

  return response.data;
}

async function createComment(comment) {
  const response = await axios.post(API_HOST + "/api/comments", comment);

  return response.data;
}

// --- Following ---------------------------------------------------------------------------------------
async function getFollowing(id) {
  const response = await axios.get(API_HOST + `/api/follow/select/${id}`);

  return response.data;
}

async function addFollowing(follow) {
  const response = await axios.post(API_HOST + "/api/follow", follow);

  return response.data;
}

async function removeFollowing(username, followingUsername) {
  const response = await axios.delete(API_HOST + "/api/follow", { params: { username, followingUsername } });

  return response.data;
}

// --- LoginEntries ---------------------------------------------------------------------------------------

async function addLoginEntry(login){
  const response = await axios.post(API_HOST + "/api/loginEntries", login);

  return response.data;
}

// --- Helper functions to interact with local storage --------------------------------------------
function setUser(user) {
  const userItem = {username: user.username, first_name: user.first_name, last_name: user.last_name, password_hash: user.password_hash }
  localStorage.setItem(USER_KEY, JSON.stringify(userItem));
}

function getUser() {
  return JSON.parse(localStorage.getItem(USER_KEY));
}

function removeUser() {
  localStorage.removeItem(USER_KEY);
}

export {
  verifyUser, findUser, createUser, updateUser, getUsers,
  getPosts, createPost, likePost, disLikePost,
  getComments, createComment,
  addLoginEntry,
  getUser, removeUser, setUser,
  getFollowing, addFollowing, removeFollowing
}
