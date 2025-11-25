const connectDB = require('../database/dbConfig')
const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const auth = require('../auth/auth')
const app = express()
const setupGooglePassport = require('../googleoauth/passport.js')
const notes = require('../notes/routes.js');
const passport = require('passport')
const cors = require('cors')
require('dotenv').config()

app.use(cookieParser())

app.use(express.json())
app.use(cors({
    origin : [`${process.env.FRONTEND_URL}`],
    credentials: true,
}))
app.use('/notes', notes)
app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: true,
        sameSite: 'lax'
    }
}));


app.use('/health', (req, res) => {
    res.status(200).send('NOTEPAD BACKEND IS RUNNING WITH STATUS 200 OK');
});


app.use(passport.initialize())
app.use(passport.session())
app.use('/auth' , auth)
const PORT = process.env.PORT || 7777;
app.listen(PORT, () => {
    console.log(`Server running on port "http://localhost:${PORT}"`);
});

connectDB()
.then(() => {
    console.log(`connected to database successfully`)
}).catch((err) => {
    console.log(err.message)
})


setupGooglePassport({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
});

