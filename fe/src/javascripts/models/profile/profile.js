
const list = (data)=>{
    return $.ajax({
        url : "api/v1/profile/list",
        type:"POST",
        data: data,
        success:(result)=>{
            return result;
        }
    })
}

export default {
    list
}