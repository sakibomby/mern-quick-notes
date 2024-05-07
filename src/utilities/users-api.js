// API modules handle network/AJAX calls
import sendRequest from "./send-request";
// This is the base path of the Express route we'll define
const BASE_URL = '/api/users';
// const LOGIN_URL = '/api/users/login';

export async function signUp(userData) {
// Fetch uses an options object as a second arg to make requests
  // other than basic GET requests, include data, set headers, etc. 
  // const res = await fetch(BASE_URL, {
  //   method: 'POST',
  //   // Must specify content type as shown!
  //   headers: { 'Content-Type': 'application/json' },
  //   // Fetch requires data payloads to be stringified
  //   // and assigned to a body property on the options object
  //   body: JSON.stringify(userData)
  // });
  //  // Check if request was successful/'ok'
  //  if (res.ok) {
  //   // res.json() will resolve to the JWT
  //   return res.json();
  // } else {
  //   // Probably failed due to duplicate email
  //   // throw is called to create the "new" "Error"
  //   throw new Error('Invalid Sign Up');
  // }
  // refactored code
  return sendRequest(BASE_URL, 'POST', userData);
}

export async function login(credentials) {
  // const res = await fetch(LOGIN_URL, {
  //   method: 'POST',
  //   headers: {'Content-Type': 'application/json'},
  //   body: JSON.stringify(credentials)
  // });
  // if (res.ok) {
  //   return res.json();
  // } else {
  //   throw new Error('Invalid Sign Up');
  // }
  return sendRequest(`${BASE_URL}/login`, 'POST', credentials);
}

export async function checkToken() {
  return sendRequest(`${BASE_URL}/check-token`);
}