
import proflie_template from "../../views/profile/profile.html"
const list = (req,res,next)=>{
    res.render(proflie_template);
}

const bindEvent = ()=>{
    
}
export default {
    list
}