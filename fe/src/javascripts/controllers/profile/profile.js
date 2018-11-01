
import proflie_template from "../../views/profile/profile.html";
import profile_model from "../../models/profile/profile";
import user_model from "../../models/user";
import modal from "../../util/modal";
import { bus} from '../../util';
const list =async (req,res,next)=>{
    let _result =await user_model.info();
    let _html = template.render(proflie_template,{
        data:_result.data
    })
    res.render(_html);
    bindEvent();
}

const bindEvent = ()=>{
    $("#profile-form").on("submit",function(e){
        e.preventDefault();
        update();
    })
     //改变显示image的路径
     $("#changeimage").on("change",function(){
        document.getElementById("profileImg").src = window.URL.createObjectURL(this.files[0]);
    })
}

const update = async ()=>{
    let _result = await profile_model.update();
    // console.log(_result)
    if(_result.status === 200){
        modal(_result,{
            success: "修改成功",
            callback:()=>{
                bus.emit("go","/home");
            }
        })
        let _data = await user_model.info();
        // console.log(_data)
        $(".userimg").attr({src:"http://localhost:3000"+_data.data.personLogo});
        $(".nickname").html(_data.data.nickname)
        // console.log($(".userimg"));
    }else if(_result.status === 205){
        modal(_result,{
            fail:"输入原密码有误",
            callback:()=>{
                bus.emit("go","/profile-list");
            }
        })
    }
}
export default {
    list,
}