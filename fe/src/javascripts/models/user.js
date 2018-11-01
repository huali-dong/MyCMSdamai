// 判断是否登录
const isSignIn = () => {
    return $.ajax({
        url: '/api/v1/user/isSignIn',
        data:{
            token:localStorage.getItem("token")
        },
        success: (results)=>{
            return results;
        }
    })
}

const info = () => {
    return $.ajax({
        url: '/api/v1/user/info',
        data:{
            token:localStorage.getItem("token")
        },
        success: (results)=>{
            return results;
        }
    })
}

const exit = () => {
    return $.ajax({
        url: '/api/v1/user/exit',
        success: results => results
    })
}

const allow = (auth) => {
    return $.ajax({
        url: '/api/v1/user/check',
        data: { auth },
        success: results => results
    })
}

export default {
    isSignIn,
    info,
    exit,
    allow
}