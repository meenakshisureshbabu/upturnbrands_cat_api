const router = require('express').Router();
const passport = require("passport")

router.get("/login/success",(req,res) => {
    if(req.user){
        res.status(200).json({
            error:false,
            message:"Successfully Logged In",
            user:req.user
        })
    }
})

router.get("/login/failed",(req,res) => {
    res.status(401).json({
        error:true,
        message:"Log In Failed"
    })
})

router.get("/google/callback",passport.authenticate("google",{
    successRedirect:process.env.CLIENT_URL,
    failureRedirect:process.env.CLIENT_URL+"login/"
}))

router.get("/google",passport.authenticate("google",{scope:["profile","email"]}))

router.get("/logout",(req,res,next) => {
    req.logOut(function(err){
        if(err){return next(err)}
        // const cookies = req.cookies;
        // for(const cookieName in cookies){
        //     res.clearCookie(cookieName)
        // }

        res.clearCookie('connect.sid',{path:'/'})
        req.session.destroy(function (err) {
            res.redirect(process.env.CLIENT_URL)
        })
    });

    // req.session.destroy((err) => {
    //     res.redirect(process.env.CLIENT_URL)
    // })
    //req.session.destroy();
})

module.exports = router
