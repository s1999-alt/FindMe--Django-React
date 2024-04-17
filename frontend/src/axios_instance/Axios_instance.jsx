import axios from "axios";
import { BASE_URL } from "../constant/api";

// Check if user data exists in localStorage
const userData = localStorage.getItem('user');
let accessToken = null;

if (userData) {
  // Parse user data
  const userObject = JSON.parse(userData);

  // Access the access token property if user data exists
  if (userObject && userObject.access) {
    accessToken = userObject.access;
  } else {
    console.error("Access token is missing in user data.");
  }
} else {
  console.error("User data is missing in localStorage.");
}

// Create Axios instance with access token if available
export const AdminAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Authorization': accessToken ? `Bearer ${accessToken}` : null,
    Accept: 'application/json',
  },
});

export const UserAxios = axios.create({
  baseURL: BASE_URL,
  headers: {
    Accept: 'application/json',
    // 'Content-Type': 'application/json',
  },
});
























// import axios from "axios";
// import { BASE_URL } from "../constant/api";



// const userData = localStorage.getItem('user');
// const userObject = JSON.parse(userData);

// // Access the access token property
// const accessToken = userObject.access;


// export const AdminAxios = axios.create({
//   baseURL: `${ BASE_URL }`,
//   // timeout: 3000,
//   headers: {
//     'Authorization': `Bearer ${accessToken}`,
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//   },
// });

// export const UserAxios = axios.create({
//   baseURL: `${ BASE_URL }`,
//   // timeout: 3000,
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//   },
// });