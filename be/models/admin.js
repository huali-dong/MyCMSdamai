const mongoose = require("../util/mongoose");
const crypto = require("crypto");

var UserModel = mongoose.model("users",new mongoose.Schema({
    username :String,
    password :String,
    nickname :String,
    signupTime :String
}));


//存数据
const signup = ({username,password,nickname})=>{
    //调用node.js自带模块对密码进行加密
    let pwd = "123456";
    // 如下方法使用指定的算法与密码来创建cipher对象
    const cipher = crypto.createCipher('aes192', pwd);
     // 使用该对象的update方法来指定需要被加密的数据
    let crypted = cipher.update(password, 'utf-8', 'hex');
    crypted += cipher.final('hex');
    // console.log(crypted)
    return new UserModel({
        username,
        nickname,
        password:crypted,
        signupTime:Date.now()
    }).save()
    .then((result)=>{
       let {username,_id,nickname} = result;
        return {username,_id,nickname};
    })
    .catch(()=>{
        return false;
    })
}

//登录用户比对密码
const signin = (_password,{password})=>{
    let pwd = "123456";
    const decipher = crypto.createDecipher('aes192', pwd);
    /*
    第一个参数为一个Buffer对象或一个字符串，用于指定需要被解密的数据
    第二个参数用于指定被解密数据所使用的编码格式，可指定的参数值为 'hex', 'binary', 'base64'等，
    第三个参数用于指定输出解密数据时使用的编码格式，可选参数值为 'utf-8', 'ascii' 或 'binary';
    */
  let decrypted = decipher.update(password, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');
  let _pwd = _password;
   return (decrypted===_pwd);
}

//注册用户之前，应该先判断用户名是否存在
const judgeUser = (username)=>{
    return UserModel.find({username})
    .then((result)=>{
        //返回的是一个数组
        return result;
    })
    .catch(()=>{
        return false;
    })
}
module.exports = {
    signup,
    judgeUser,
    signin
}