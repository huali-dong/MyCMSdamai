const user_model = require("../models/user");

const isSignIn = (req,res,next)=>{//因为在中间件已经判断过用户是否登录
        res.render("user",{
            code:"200",
            data:JSON.stringify("用户已登录")
        })
}
const info =async (req,res,next)=>{
   let _result = await user_model.getuserById(req.token.userid);
   res.render("user",{
       code:200,
       data:JSON.stringify({
           userid:_result.id,
           username:_result.username,
           nickname:_result.nickname,
           personLogo :_result.personLogo
       })
   })
}

module.exports = {
    isSignIn,
    info
}