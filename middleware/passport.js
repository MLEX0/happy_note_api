const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const keys = require('../config/keys')
const db = require('../db')

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('jwt'),
    secretOrKey: keys.jwt
}

module.exports = passport => {
    passport.use(
        new JwtStrategy(options, async (payload, done) => {
            try {
                const user = await db.query('SELECT "ID", "Login" FROM "User" WHERE "ID" = $1', [payload.ID])
                if(user.rows[0]){
                    done(null, user)
                } else {
                    done(null, false)
                }
            } catch (ex){
                console.log(ex)
            }
        })
    )
}