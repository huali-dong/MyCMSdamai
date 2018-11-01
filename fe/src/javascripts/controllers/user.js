import user_model from '../models/user'
const renderUserInfo = async () => {
    // 获取用户信息，再去渲染
    let _result = await user_model.info();
    if ( _result.status === 304 ) { // 用户没有登录信息
        alert('请重新登录')
        window.location.href = '/admin.html'
    } else {
        $('.nickname').html(_result.data.nickname);
        $(".userimg").attr({src:"http://localhost:3000"+_result.data.personLogo});
    }    
    $('.exit-btn').click( async function () {
        localStorage.removeItem("token");
        window.location.href = "/admin.html";
    })
    $("#profile-setting").on("click",()=>{
        window.location.href = "/#/profile-list";
    })
}
export default {
    renderUserInfo
}