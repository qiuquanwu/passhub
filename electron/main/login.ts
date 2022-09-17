
import { PrismaClient } from '@prisma/client'
import Result from "./result"
const prisma = new PrismaClient()

const loginHandle =async (e,options)=>{
    // console.log('参数', options);
    //验证登录
    const res = await prisma.user.findUnique({
        where:{
            username:options.username
        }
    })
    // console.log(res)
    if(res==null){
        console.log('账号不存在')
        return Result.error('账号不存在')
    }else{
        if(res.password ===options.password){
            return Result.ok(res)
        }else{
            return Result.error('密码错误！')
        }
    }

}

export default loginHandle