import pool from "../db/dbConnect.js"

export const getAllUsersService =async()=>{
    const result=await pool.query("select * from users")
    return result.rows

}

// not writing id directly beacuse of issue in security of sql injection
export const getUserByIdService = async(id)=>{
    const result =await pool.query("select * from users where id=$1",[id])
    return result.rows[0]

}

export const getAllUserByEmailService =async(email)=>{
    const result = await pool.query("select * from users where email=$1",[email])
    return result.rows[0]

}



export const createUserService= async(name,email)=>{
    const result =await pool.query("insert into users(name ,email) values($1 ,$2) returning *",[name,email])
    return result.rows[0]
}


export const updateUserService =async(id,name,email)=>{

  const fields = [];
  const values = [];
  let query = 'UPDATE users SET ';

  // Build query dynamically
  if (name) {
    fields.push(`name = $${fields.length + 1}`);
    values.push(name);
  }

  if (email) {
    fields.push(`email = $${fields.length + 1}`);
    values.push(email);
  }

  if (fields.length === 0) {
    throw new Error("No fields provided for update");
  }

  query += fields.join(', ') + ` WHERE id = $${fields.length + 1} RETURNING *`;
  values.push(id); // Add id at the end

  const result = await pool.query(query, values);
  return result.rows[0];



    // const result =await pool.query("update users set name=$1 ,email=$2 WHERE id=$3 returning *",[name,email,id])
    // return result.rows[0]
}


export const deleteUserService =async(id)=>{
    const result=await pool.query("delete from users where id=$1 returning *",[id])
    return result.rows[0]
}