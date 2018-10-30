
import admin_tempalte from "../views/login/sign.html";
import admin_model from "../models/admin";
import qs from "querystring";
import toast from '../util/toast';
//初始化登录页面
const init = ()=>{
    render("signin");
    bindEvent();
}


//绑定事件，点击的时候渲染不同的登录或者注册页面
const bindEvent = ()=>{
    $("#sign-contanier").on("click",".switch-btn",function(){
        let _type=$(this).data("type");
        render(_type);
    })


    //注册事件
    $("#sign-contanier").on("submit","#signup-form", async function(e){
        e.preventDefault();
        let _params = $(this).serialize();
        $.cookie("connect.sid",{expires:-1});
        let _data = await admin_model.signup(qs.parse(_params));//后端返回的数据
        switch(_data.status){
            case 500: toast("失败，服务器发生了问题");break;
            case 201: toast("该用户已存在");break;
            default: {
                toast("注册成功");
                render("signin");
                break;
            }
        }
    });
    //登录事件
    $("#sign-contanier").on("submit","#signin-form", async function(e){
        e.preventDefault();
        let _params = $(this).serialize()
        let _data = await admin_model.signin(qs.parse(_params));
        switch(_data.status){
            case 203: toast("密码错误");break;
            case 201: toast("该用户不存在");break;
            default: 
            // console.log(_data)
                localStorage.setItem("token",_data.data);
                window.location.href = ("/");
                break;
            
        }
    });
}

const render = (_type)=>{
    var _html = template.render(admin_tempalte,{
        data:_type
    })
    $("#sign-contanier").html(_html);
}
export default {
    init,
}