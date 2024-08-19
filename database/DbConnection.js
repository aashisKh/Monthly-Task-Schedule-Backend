
require('dotenv').config()
const { createPool } = require('mysql2')
const pool = createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

const connectToDatabase = async () =>{
  try{
    pool.getConnection( (err, connection) => {
      if(err){
        console.log('Cannot Connect To Database !!!')
      }else{
        console.log('Connected To Database Successfully !!!')
        connection.release()
      }
    })
  }catch(err){
    console.log(`Connection Error: ${err}`)
  }
}

const getDatabasePool = () => {
  return pool.promise()
}

const executeTransaction = async (cb) => {
  let connection
  try{
    connection = await getDatabasePool().getConnection()
    await connection.beginTransaction()
    await cb(connection)
    await connection.commit()
    connection.release()
  }catch(err){
    connection.rollback()
  }

}

module.exports = {
  connectToDatabase,
  executeTransaction
}