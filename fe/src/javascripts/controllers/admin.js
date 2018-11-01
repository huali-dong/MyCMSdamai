
import admin_tempalte from "../views/login/sign.html";
import admin_model from "../models/admin";
import qs from "querystring";
import modal from "../util/modal";
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
        if(_data.status == 200){//注册成功
            modal(_data,{
                success : "注册成功",
                callback :()=>{
                    render("signin");
                }
            })
        }else if(_data.status == 201){//注册失败
            modal(_data,{
                fail :"用户名已存在",
                callback:()=>{
                    render("signup");
                }
            })
        }else{
            modal(_data,{
                fail : "服务器发生开小差啦",
                callback:()=>{
                    render("signup");
                }
            })
        }
    });
    //登录事件
    $("#sign-contanier").on("submit","#signin-form", async function(e){
        e.preventDefault();
        let _params = $(this).serialize()
        let _data = await admin_model.signin(qs.parse(_params));
        if(_data.status == 200){
            modal(_data,{
                success : "登录成功",
                callback :()=>{
                    localStorage.setItem("token",_data.data);
                    window.location.href = ("/");
                }
            })
        }else if(_data.status == 202){
            modal(_data,{
                fail :"用户名不存在",
                callback:()=>{
                    render("signin");
                }
            })
        }else if(_data.status == 203){
            modal(_data,{
                fail : "密码错误",
                callback:()=>{
                    render("signin");
                }
            })
        }else{
            modal(_data,{
                fail : "服务器开小差啦",
                callback:()=>{
                    render("signin");
                }
            })
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