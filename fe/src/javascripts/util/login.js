const URL = require('url')
const _none = () => {}

import user_model from '../models/user'

// 验证用户登录状态
const userSigninAuth = async (success = _none, fail = _none) => {
    let isSignIn = await user_model.isSignIn();//返回的是用户是否登录，200登录,201未登录
    let auth = !!(isSignIn.status === 200);//记录用户是否登录
    if ( auth ) {
        success(auth)
        return true;
    } else {
        fail()
        return false
    }
}

export default {
    userSigninAuth
}