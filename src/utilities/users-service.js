// Business logic for the users data resource

import * as usersAPI from './users-api';

export async function signUp(userData) {
// Delegate the network request code to the users-api.js API module(this is an alias)
  // which will ultimately return a JSON Web Token (JWT)
  const token = await usersAPI.signUp(userData);
  localStorage.setItem('token',token); 
  //TODO: return the user object from within the token instead of the token.
  return getUser();
  // When saving, the data will automatically be converted to a string, 
  //however, you will be responsible for using JSON.parse() to convert the string retrieved 
  //from local storage back into a number, boolean, array, object, etc.
  // Baby step by returning whatever is sent back by the server
  // return token;
}

export async function login(userData) {
  const token = await usersAPI.login(userData);
  localStorage.setItem('token', token); 
  return getUser();
}

export function logOut() {
  localStorage.removeItem('token');
}

export function getToken() {
   // getItem returns null if there's no string/key
  const token = localStorage.getItem('token');
  if(!token) return null;
  // Obtain the payload of the token by splitting it and retrievig the "[1]" second segment that has the user object
  const payload = JSON.parse(atob(token.split('.')[1]));
  // A JWT's exp is expressed in seconds, not milliseconds, so convert to make compatible with JS
  if (payload.exp * 1000 < Date.now()) {
    // Token has expired  - remove it from localStorage
    localStorage.removeItem('token');
    return null;
  }
  return token;
}

export function getUser() {
  const token = getToken();
  // if there's a token, return the user in the payload, otherwise return null
  return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}

export function checkToken() {
   // Just so that you don't forget how to use .then  and it always returns a promise
   return usersAPI.checkToken()
   // checkToken returns a string, but let's 
   // make it a Date object for more flexibility
   .then(dateStr => new Date(dateStr));
}