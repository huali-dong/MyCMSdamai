import user_model from '../models/user'
const renderUserInfo = async () => {
    // 获取用户信息，再去渲染
    let _result = await user_model.info();
    if ( _result.status === 304 ) { // 用户没有登录信息
        alert('请重新登录')
        window.location.href = '/admin.html'
        
    } else {
        console.log(_result.data)
        $('.nickname').html(_result.data.nickname)
    }

    
    $('.exit-btn').click( async function () {
        let _result = await user_model.exit()
        if ( _result.status === 200 ) {
            $.cookie('connect.sid', { expires: -1 })
            window.location.href = '/admin.html'
        }
    })
}

export default {
    renderUserInfo
}