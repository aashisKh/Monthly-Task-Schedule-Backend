const { executeTransaction } = require("../database/DbConnection");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const {generateToken} = require('../utils/generateToken')

const checkUsernameExists = async (username) => {
  let usernameExists = false;
  await executeTransaction(async (connection) => {
    try {
      query = `
              SELECT userid, username, email FROM User WHERE username=?;
              `;
      result = await connection.query(query, [username]);
      if (result[0][0].username) {
        const {userid, username,email} = result[0][0]
        usernameExists = {
          exists: true,
          userid,
          username,
          email

        };
        return;
      }
    } catch (err) {
      console.log(err.sqlMessage);
    }
  });
  return usernameExists;
};

const checkEmailExists = async (email) => {
  let emailExists = false;
  await executeTransaction(async (connection) => {
    try {
      query = `
              SELECT email FROM User WHERE email=?;
              `;
      result = await connection.query(query, [email]);
      if (result[0][0].email) {
        emailExists = true;
        return;
      }
    } catch (err) {
      console.log(err.sqlMessage);
    }
  });
  return emailExists;
};

const userRegistration = async (newUserData) => {
  const { username, email, password } = newUserData;
  let registered,
    query,
    result,
    message,
    token = undefined;

  await executeTransaction(async (connection) => {
    try {
      const salt = 10;
      const hashedPassword = await bcrypt.hash(password, salt);
      query = `
            INSERT INTO User(username,email,password)
            VALUES(?,?,?)  
            `;
      result = await connection.query(query, [username, email, hashedPassword]);

      if (result[0].serverStatus == 3) {
        registered = true;
        const userID = result[0].insertId;
        token = await generateToken({userId: userID,username,email},{expiresIn:'1h'})
      }
    } catch (err) {
      console.log(err);
    }
  });
  if (registered) {
    return {
      status: true,
      message: "User Registered Successfully",
      token
    };
  }

  return {
    status: false,
    message: "Registration failed !!!",
  };
};

const userLogin = async (userData) => {
  const { username, password } = userData;
  let loggedIn,
    query,
    result,
    message = undefined;

  await executeTransaction(async (connection) => {
    try {
      query = `
            INSERT INTO User(username,email,password)
            VALUES(?,?,?)  
        `;
      result = await connection.query(query, [username, email, password]);
      if (result[0].serverStatus == 3) {
        registered = true;
      }
    } catch (err) {
      console.log(err.sqlMessage);
      message = err.sqlMessage;
    }
  });
  if (registered) {
    return {
      status: true,
      message: "User Registered Successfully",
      token: "asdfsfa",
    };
  }

  return {
    status: false,
    message,
  };
};

const getPasswordFromUsername = async (username) => {
  let password = null
  await executeTransaction(async (connection) => {
    try {
      query = `
            SELECT password FROM User WHERE username = ? 
            `;
      result = await connection.query(query, [username]);
      if(result[0][0].password){
        password = result[0][0].password
      }
    } catch (err) {
      console.log(err.sqlMessage);
      message = err.sqlMessage;
    }
  });
  return password
}

module.exports = {
  userRegistration,
  userLogin,
  checkUsernameExists,
  checkEmailExists,
  getPasswordFromUsername
};
