const user_model = require("../models/user");

const isSignIn = (req,res,next)=>{
    if(req.session.userinfo){
        res.render("user",{
            code:"200",
            data:JSON.stringify("用户已登录")
        })
    }else{
        res.render("user",{
            code:"201",
            data:JSON.stringify("用户未登录")
        })
    }
}
const info =async (req,res,next)=>{
   let _result = await user_model.getuserById(req.session.userinfo.useid);
   res.render("user",{
       code:200,
       data:JSON.stringify({
           userid:_result.id,
           username:_result.username,
           nickname:_result.nickname
       })
   })
}

module.exports = {
    isSignIn,
    info
}