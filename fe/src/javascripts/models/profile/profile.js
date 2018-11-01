

const update = (id)=>{
    return new Promise((resolve) => {
        $('#profile-form').ajaxSubmit({
            url: "api/v1/profile/update",
            type: 'POST',
            data:id,
            success: (results) => {
                resolve(results)
            },
            error:()=>{
                console.log(23);
            }
        })
    })
}
export default {
    update
}