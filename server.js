require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const passport = require('passport')
const session = require('express-session')
const axios = require('axios')
//const cookieSession = require('cookie-session')
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const authRoute = require("./routes/auth")
const catRoute = require("./routes/catapi")
const app = express()

const buildPath = path.join(__dirname, 'build')

app.use(express.static(buildPath))
app.use(cors({
    origin:process.env.CORS_URL,
    methods:'GET,POST,DELETE,PUT',
    credentials:true,
}))

app.use(express.json())

// app.use(cookieSession({
//     name:'session',
//     keys:["upturn"],
//     maxAge:24*60*60*100,
// }))

app.use(session({

    secret:"345763859647hjdgnt67nskfh",
    resave:false,
    saveUninitialized:true
}))

app.use(passport.initialize())
app.use(passport.session())

passport.use(
    new GoogleStrategy(
        {
            clientID:process.env.CLIENT_ID,
            clientSecret:process.env.CLIENT_SECRET,
            callbackURL:"/auth/google/callback",
            scope:["profile","email"],
        },
        async (accessToken,refreshToken,profile,done) => {
            console.log(profile);
            try{

                return done(null,profile)
            }
            catch(error){
                return done(error,null)
            }
        }
    )
)

passport.serializeUser((user,done) => {
    done(null,user)
})

passport.deserializeUser((user,done) => {
    done(null,user)
})


app.use("/auth",authRoute)
app.use("/catquote",catRoute)

app.get('/',(req,res) => {
    res.status(200).json("server start")
})

const port = process.env.SERVER_PORT || 8080

app.listen(port,(req,res) => {
    console.log(`Server is up and running at ${port}`)
})