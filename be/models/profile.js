
const mongoose = require("mongoose");
const UserModel = mongoose.model("users");
const crypto = require("crypto");
const update = (body,list)=>{
    if( !body.personLogo)  body.personLogo = list.personLogo;
    //对新密码进行加密
     //调用node.js自带模块对密码进行加密
     let pwd = "123456";
     // 如下方法使用指定的算法与密码来创建cipher对象
     const cipher = crypto.createCipher('aes192', pwd);
      // 使用该对象的update方法来指定需要被加密的数据
     let crypted = cipher.update(body.passwordnew, 'utf-8', 'hex');
     crypted += cipher.final('hex');
     // console.log(crypted)
    return UserModel.updateOne({_id:body.id},{
        nickname : body.nickname,
        password : crypted,
        personLogo : body.personLogo
    })
    .then((result)=>{
        return result;
    })
    .catch(()=>{
        return false;
    })
}
module.exports = {
    update
}