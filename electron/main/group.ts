
import { PrismaClient } from '@prisma/client'
import Result from "./result"

const prisma = new PrismaClient()

export const addGroup = async (e, options) => {
    // console.log('参数', options);
    //验证登录
   const res = await prisma.group.create({
    data:options
   })
   return Result.ok(res)
}
export const delGroup = async (e, options) => {
    // console.log('参数', options);
    //验证登录
   const res = await prisma.group.delete({
    where:{
        id:options.id
    }
   })

   return Result.ok(res)

}


export const viewGroup = async (e, options) => {
    // console.log('参数', options);
    //验证登录
   const res = await prisma.group.findMany({
    where:{
        userId:options.userId
    }
   })

   return Result.ok(res)

}


