const { client } = require("./bitcoin-utils.js")
const { dbExists, dbRead, dbWrite, dbRemove, dbIDs } = require('./db.js')
const { createToken, decodeToken, isTokenExpired} = require('./jwt.js')
const { hashPassword } = require('./passwordHash.js')
const rootPath = "/home/davidweisss/bittwitter/"

var isAuth = async (req) => {
  // TODO: handle error
  payload= decodeToken(req.token)
  valid = !isTokenExpired(payload)
  return valid? payload.handle : new Error('not authorized')
}

class User {
  constructor(address) {
    this.address = address 
    this.balanceSats= null 
    this.handle= null 
    this.following= null
    this.followers= null  
    this.posts= null 
    this.mutuals= null
    this.bio= null
  }
  write(){
    dbWrite(this, 'users/', rootPath)
    return this
  }

  read() {
    var user= dbRead(this.address, 'users/', rootPath)
    this.address = user.address 
    this.balanceSats= user.balanceSats
    this.handle= user.handle
    this.following= user.following
    this.followers= user.followers
    this.posts= user.posts 
    this.mutuals= user.mutuals
    this.bio= user.bio
  }

}

class Credentials {
  constructor(handle){
    this.handle = handle
    this.passwordHash= null
  }
  read(){
    var credentials = dbRead(this.handle, 'auth/', rootPath)
    this.handle= credentials.handle
    this.passwordHash= credentials.passwordHash
  }
  write(){}
}

class Post {
  read(){}
  write(){}
}
class Thread {
  read(){}
  write(){}
}

let root = {
  getUser: ({address}) => {
    var u = new User(address)
    u.read()
    console.log(u)
    return u
  },
  getAuthToken: (req)=> {
    console.log('in getAuthToken')
    console.log(req)
    let {handle, password} = req.input
    console.log(handle, password)
    let passwordHash = hashPassword(password)
    let credentials = new Credentials(handle)
    credentials.read()
    console.log(passwordHash, credentials.passwordHash)
    if (passwordHash === credentials.passwordHash){
      let token = createToken(handle)
      console.log({token: token})
      return {token:token}
    }else{
      throw new Error('Wrong password') 
    }
  }
}

module.exports = {
  client: client,
  root:root
}
