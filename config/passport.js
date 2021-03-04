require('dotenv').config();
// A passport strategy for authenticating with a JSON Web Token
// This allows to authenticate endpoints using a token
// const JwtStrategy = require('passport-jwt').Strategy
// const ExtractJwt = require('passport-jwt').ExtractJwt
//how would we refractor the above 2 lines with deconstructing? (OTHER WAY)
const {JwtStrategy, ExtractJwt} = require('passport-jwt')
const mongoose = require('mongoose')

//import user model
const {User} = require('../models/user')


const options = {};

options.jwtFromRequest =  ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.JWT_SECRET;

module.exports = (passport) => {
    // Add code here
    passport.use(new Strategy(options, (jwt_payload, done)=>{
        //Have a user that we are  finding by the id inside of the payload
        //when we ge the user back, we'll check to see if the user in DB
        User.findById(jwt_payload.id)
        .then(user => {
            //jwt payload is an object that contains JWT info
            //done is callback that we will be using to return user or false
            if(user){
                // if a user is found. return done with null (for error) and user
                return done(null, user);
            }else{
                return done(null, false)
            }

           
        })
        .catch( error => {
            console.log('=====> Error below (passport.js)')
            console.log(error)
        })
    }))
}

//////////turnery operator for line 28-32
 //const userOrNot = user ? done(null, user) : done (null, false)
 //return userOrNot