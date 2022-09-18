
import { PrismaClient } from '@prisma/client'
import Result from "./result"
import random from "string-random"
const prisma = new PrismaClient()

export const getUserHandle = async (e, options) => {
    // console.log('参数', options);
    //验证登录
    const res = await prisma.user.findMany(
        {
            select: {
                username: true,
                nickname: true
            }
        }
    )
    // console.log(res)
    return Result.ok(res)

}

export const registerHandle = async (e, options) => {
    console.log('参数', options);

    // 先判断是否保存过

    const count = await prisma.user.count({
        where: {
            username: options.username
        }
    })

    if (count > 0) {
        return Result.error("用户已存在")
    } else {
        const slat = random(32)
        console.log("slat",slat)
        const user =  { ...options, slat:slat }
        await prisma.user.create({
            data:user
        })
        // console.log(res)
        return Result.ok({})
    }

    //验证登录


}

