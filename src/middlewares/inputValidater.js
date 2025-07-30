import Joi from 'joi'
import {ApiError} from "../utils/ApiError.js"
import { asyncHandler } from '../utils/asyncHandler.js'

const userSchema=Joi.object({
    name:Joi.string().min(3).required(),
    email:Joi.string().email().required()
})

const validateUser=asyncHandler((req,res,next)=>{
    const {error} = userSchema.validate(req.body)
    if(error) throw new ApiError(200, error.details[0].message || "Name or Email validation fails")
    next()
})




const updateUserSchema = Joi.object({
    name: Joi.string().min(3),
    email: Joi.string().email()
}).or('name', 'email')


const validateUserUpdate = asyncHandler((req, res, next) => {
    const { error } = updateUserSchema.validate(req.body)
    if (error) {
        throw new ApiError(400, error.details[0].message || "Invalid update data")
    }
    next()
})



export {validateUser,validateUserUpdate}