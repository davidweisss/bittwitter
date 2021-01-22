let jwt = require('jsonwebtoken');
let {secret} = require('./jwtSecret.json')

let createToken = (handle, expiresIn = '1h')=>{
  let token = jwt.sign({ handle: handle}, secret, { expiresIn: expiresIn});
  return(token)
}

let decodeToken = (token) => {
  try {
    var decoded = jwt.verify(token, secret);
    return(decoded)
  } catch(err) {
    return new Error(err)
    // err
  }
}

let isTokenExpired = (payload)=> {
  // TODO: add error handling
   return (Date.now() < payload.exp*1000 ? true : false)
}
 module.exports = {
   createToken: createToken,
   decodeToken: decodeToken,
   isTokenExpired: isTokenExpired
 }
