import { ipcRenderer } from "electron";
import message from "@arco-design/web-vue/es/message";
const request = async (apiName:string,data:any)=>{
    const res = await  ipcRenderer.invoke(apiName, data);
    if(res.code===200){
        return res
    }else{
        message.error(res.msg);
        return res
    }
}

export default request