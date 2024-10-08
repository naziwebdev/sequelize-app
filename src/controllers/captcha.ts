import { Request,Response,NextFunction } from "express"
import svgCaptcha from 'svg-captcha'
import redis from "../redis"
import {v4 as uuidv4} from 'uuid';


export const get = async (req:Request,res:Response,next:NextFunction) => {
    try {

        const captcha:any = svgCaptcha.create({size:4,noise:5})

        const uuid = uuidv4()

        await redis.set(`captcha:${uuid}`,captcha.text.toLowerCase(),'EX',60*2)

        return res.json({uuid,captcha:captcha.data})

        
    } catch (error) {
        throw error
    }
}