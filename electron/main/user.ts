
import { PrismaClient } from '@prisma/client'
import Result from "./result"
const prisma = new PrismaClient()

export const getUserHandle =async (e,options)=>{
    // console.log('参数', options);
    //验证登录
    const res = await prisma.user.findMany(
        {
            select:{
                username:true,
                nickname:true
            }
        }
    )
    // console.log(res)
   return Result.ok(res)

}

export const registerHandle =async (e,options)=>{
    console.log('参数', options);

    // 先判断是否保存过

    const count = await prisma.user.count({
        where:{
            username:options.username
        }
    })

    if(count>0){
        return Result.error("用户已存在")
    }else{
        await prisma.user.create({
            data:options
        })
        // console.log(res)
       return Result.ok({})
    }

    //验证登录
  

}

