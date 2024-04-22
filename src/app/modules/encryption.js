import CryptoJS from "crypto-js";
import "dotenv/config";
export const secretKey = "csvthekejsonconverter";
const firebaseConfig = {
  apiKey: "AIzaSyDqYYUmrodPxxkCUL4r1mU-ydvDR1MwDFo",
  authDomain: "csvtojson-86bb7.firebaseapp.com",
  projectId: "csvtojson-86bb7",
  storageBucket: "csvtojson-86bb7.appspot.com",
  messagingSenderId: "392969365626",
  appId: "1:392969365626:web:e60ddafbfa46655a78b3c3",
  measurementId: "G-TBVSPW3S99",
};
// const firebaseConfig = {
//   apiKey: process.env.APIKEY,
//   authDomain: process.env.AUTHDOMAIN,
//   projectId: process.env.PROJECTID,
//   storageBucket: process.env.STORAGEBUCKET,
//   messagingSenderId: process.env.MESAGINGSENDERID,
//   appId: process.env.APPID,
//   measurementId: process.env.MEASUREMENTID,
// };
export const encryptObjData = (name, value, minutes) => {
  let encJsonObj = CryptoJS.AES.encrypt(
    JSON.stringify(value),
    secretKey
  ).toString();
  return setCookie(name, encJsonObj, minutes);
};

export const encryptData = (value) => {
  let encJsonObj = CryptoJS.AES.encrypt(
    JSON.stringify(value),
    secretKey
  ).toString();
  return encJsonObj;
};
export const decryptData = (value) => {
  let bytes = CryptoJS.AES.decrypt(value, secretKey);
  let mainObj = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return mainObj;
};
export const decryptObjData = (name) => {
  let cookieObj = getCookie(name);
  let bytes = CryptoJS.AES.decrypt(cookieObj, secretKey);
  let mainObj = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return mainObj;
};
export const decryptText = (name) => {
  let cookieText = getCookie(name);
  let bytes = CryptoJS.AES.decrypt(cookieText, secretKey);
  let mainText = bytes.toString(CryptoJS.enc.Utf8);
  return mainText;
};
export const getCookie = (name) => {
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i].trim();
    if (cookie.startsWith(name + "=")) {
      return cookie.substring(name.length + 1, cookie.length);
    }
  }
  return null;
};

export const setCookie = (name, value, minutes) => {
  const expiryDate = new Date();
  expiryDate.setTime(expiryDate.getTime() + minutes * 60 * 1000); // Convert minutes to milliseconds
  const expires = "expires=" + expiryDate.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
};

// Function to delete a cookie by name
const deleteCookie = (cookieName) => {
  document.cookie =
    cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};

// Function to remove all cookies
export const deleteAllCookies = () => {
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].trim();
    var cookieName = cookie.split("=")[0];
    deleteCookie(cookieName);
  }
};

export const enc = encryptData(firebaseConfig, secretKey);
