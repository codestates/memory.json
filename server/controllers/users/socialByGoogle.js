const axios = require("axios");
const dotenv = require("dotenv");
const express = require('express');
const http = require('http');
dotenv.config();

module.exports = (req, res) => {
try{  
  const googleClientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const googleSecret = process.env.GOOGLE_OAUTH_SECRET;
  const googleRedirectUri = process.env.GOOGLE_REDIRECT_URI;
console.log(req)
  axios({
    method: 'post',
    url: `https://accounts.google.com/o/oauth2/auth?client_id=${googleClientId}&redirect_uri=${googleRedirectUri}`,
    headers: {
        accept: 'application/json',
    },
  })
  .then(data => {
    console.log('이거 되나?',data)
    return res.send(data)
  })
} catch (err) {
    console.error(err)
    return null
}  
//   const googleClientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
//   const googleSecret = process.env.GOOGLE_OAUTH_SECRET;
//   const googleRedirectUri = process.env.GOOGLE_REDIRECT_URI;
// res.redirect(`https://accounts.google.com/o/oauth2/auth?client_id=${googleClientId}&redirect_uri=${googleRedirectUri}`)
};
