const crypto = require('crypto')

let hashPassword = (password)=>{
  let	hashedPassword   = crypto.createHash('sha1')
    .update(password)
    .digest('hex');
  return hashedPassword
}

module.exports = {
  hashPassword: hashPassword
}
