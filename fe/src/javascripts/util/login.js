
import user_model from '../models/user'

// 验证用户登录状态
const userSigninAuth = async () => {
    let _token = localStorage.getItem("token")
    let isSignIn = await user_model.isSignIn(_token);//返回的是用户是否登录，200登录,201未登录
    return  !!(isSignIn.status === 200);//记录用户是否登录
}

export default userSigninAuth;
