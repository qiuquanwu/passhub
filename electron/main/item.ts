
import { PrismaClient } from '@prisma/client'
import Result from "./result"

const prisma = new PrismaClient()

export const addItem = async (e, options) => {
    // console.log('参数', options);
    //验证登录
   const res = await prisma.item.create({
    data:options
   })
   return Result.ok(res)
}
export const delItem = async (e, options) => {
    // console.log('参数', options);
    //验证登录
   const res = await prisma.item.delete({
    where:{
        id:options.id
    }
   })

   return Result.ok(res)

}


export const viewItem = async (e, options) => {
    // console.log('参数', options);
    //验证登录
   const res = await prisma.item.findMany({
    where:{
        groupId:options.groupId
    }
   })

   return Result.ok(res)

}

export const updateItem = async (e, options) => {
    // console.log('参数', options);
    //验证登录
   const res = await prisma.item.update({
    where:{
        id:options.id
    },
    data: options
   })

   return Result.ok(res)

}


// export const delItem = async (e, options) => {
//     // console.log('参数', options);
//     //验证登录
//    const res = await prisma.item.delete({
//     where:{
//         id:options.id
//     }
//    })

//    return Result.ok(res)

// }



