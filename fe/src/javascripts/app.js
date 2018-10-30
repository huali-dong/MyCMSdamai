// 引入样式
import '../stylesheets/app.scss'

// 引入路由
import router from './router'
//引入登录权限验证
import userSigninAuth from "./util/login"
// 主体结构视图
import body_template from './views/body.html';
import user_controller from "./controllers/user";
// 渲染整体内容结构
$('#wrapper').html(body_template)
//登录验证
let init = async () => {
    let isSignIn = await userSigninAuth();
    console.log(isSignIn);
    if ( isSignIn ) {
        router.init()
        user_controller.renderUserInfo();       
    }else {//如果没有登录就跳转
        console.log(2);
        window.location.href="/admin.html"
    }
}
init()





