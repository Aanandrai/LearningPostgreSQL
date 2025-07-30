import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { createUserService, deleteUserService, getAllUserByEmailService, getAllUsersService, getUserByIdService, updateUserService } from "../models/userModel.js"


// Tested 
const createUser =asyncHandler(async(req,res)=>{

    const {name,email}=req.body

    if(!name || !email){
        throw new ApiError(401 , "Name or Email missing")
    }


    if(await getAllUserByEmailService(email)){
        throw new ApiError (400 , "User Already exist with this email")
    }


    const newUser=await createUserService(name,email)
    res.status(200).json(new ApiResponse(200,"User created successfully",newUser))


})



// Tested
const getAllUsers=asyncHandler(async(req,res)=>{
    const allUser=await getAllUsersService()
    res.status(200).json(new ApiResponse(200,"User retrieve successful",allUser))
})

// Tested 
const getUserById=asyncHandler(async(req,res)=>{

    const id=req.params.id

    const user=await getUserByIdService(id)

    if(!user){
        throw new ApiError(404, "User not found")
    }


    res.status(200).json(new ApiResponse(200,"User fetched successfully",user))
})


const updateUser=asyncHandler(async(req,res)=>{

    const userId=req.params.id
    const {name ,email}=req.body

    const user=await getUserByIdService(userId)

    if(!user){
        throw new ApiError(404 , "User Not exist")
    }


    const UserWithEmail =await getAllUserByEmailService(email)
    if(UserWithEmail){
        throw new ApiError(401,"User with email already exist Use different email")
    }

    const newUser =await updateUserService(userId , name,email)

    res.status(200).json(new ApiResponse(200,"User Updated successfull" , newUser))

})



const deleteUser=asyncHandler(async(req,res)=>{
    const id=req.params.id

    const user=await getUserByIdService(id)

    if(!user){
        throw ApiError(404,"User not found")
    }

    const oldUser=await deleteUserService(id)

    res.status(200).json(new ApiResponse(200, "User deleted successful",oldUser))

})





export {createUser , getAllUsers, getUserById, updateUser,deleteUser}