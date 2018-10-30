

const signup = (data)=>{
    return $.ajax({
        type:"POST",
        data:data,
        url:"api/v1/admin/signup",
        success:(result)=>{
            return result
        }
    })
}
const signin = (data)=>{
    return $.ajax({
        type:"POST",
        data:data,
        url:"api/v1/admin/signin",
        success:(result)=>{
            return result
        }
    })
}

export default{
    signup,
    signin
}