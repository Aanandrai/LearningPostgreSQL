import express from "express"
import cookieParser from "cookie-parser";
// import pool from "./db/dbConnect.js"
import cors from "cors"

const app=express()


app.use(cors({
  origin:"*",
  credentials:true
    }
))
app.use(express());
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))

// create table before starting server
createUserTable()

// app.get("/",async(req, res)=>{

//     const result=await pool.query("SELECT current_database()")
//     console.log(result?.rows[0])
//     res.send(`The database name is ${result.rows[0]}`)
// })


import userRoutes from "./routes/userRoutes.js"
import createUserTable from "./data/createUserTable.js";

app.use("/user",userRoutes)


export {app}