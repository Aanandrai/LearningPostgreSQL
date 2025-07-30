const asyncHandler = (fn)=>async (req,res,next)=>{
    try{
        await fn(req,res,next)
    }catch(error){

          // Example: handle unique constraint violation (like duplicate email)
        if (error.code === '23505') {
            error.statusCode = 409; // Conflict
        }

        // console.error({
        //     message: error.message,
        //     code: error.code,
        //     statusCode: error.statusCode,
        // });

        res.status(error.statusCode || 500).json({
            statusCode:error.statusCode || 500,
            message: error.message || 'Something went wrong',
            success: false,
           
        });


        // console.log(error.statusCodes)
        // res.status(error.statusCode ).json({
        //     statusCode:error.statusCode,
        //     success:false,
        //     message:error.message
        // })

    }
}

export {asyncHandler}