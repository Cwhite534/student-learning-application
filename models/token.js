const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

let TokenSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  token: {
    type: String,
    required: true
  },
  access: {
    type: String,
    required: true,
    trim: true
  },
  userType: {
    type: String,
    required: true,
    trim: true
  },
  salt: {
    type: String,
    required: true
  }
})

TokenSchema.statics.generateAuthToken = function (access, userType) {
  let Token = this

  return new Promise((resolve, reject) => {
    bcrypt.genSalt(12, (err, salt) => {
      if (err) {
        reject(err)
      }

      let tokenId = mongoose.Types.ObjectId()

      let tokenVal = jwt.sign({ _id: tokenId, userType, access }, salt, { expiresIn: '4h' }).toString()

      let token = new Token({
        _id: tokenId,
        token: tokenVal,
        access,
        userType,
        salt
      })

      resolve(token)
    })
  })
}

TokenSchema.statics.validateToken = function (rawToken, unvalidatedUserType, unvalidatedTokenId) {
  return new Promise((resolve, reject) => {
    mongoose.model(unvalidatedUserType).findOne({
      'token._id': unvalidatedTokenId
    }).then((doc) => {
      if (!doc) {
        reject(new TypeError())
      }

      let realToken = doc.token
      let realSalt = realToken.salt

      jwt.verify(rawToken, realSalt, (err) => {
        if (err) {
          reject(new TypeError())
        }

        resolve(doc)
      })
    })
  })
}

let Token = mongoose.model('Token', TokenSchema)

module.exports = { Token, TokenSchema }