// 引入样式
import '../stylesheets/app.scss'

// 引入路由
import router from './router'
//引入登录权限验证
import user from "./util/login"
// 主体结构视图
import body_template from './views/body.html';
import user_controller from "./controllers/user";
// 渲染整体内容结构
$('#wrapper').html(body_template)

//登录验证
user.userSigninAuth ((auth)=>{
        // 启动路由
        router.init()
        user_controller.renderUserInfo();
},()=>{//如果没有登录，就跳转到登录页
    window.location.href="/admin.html";
})




