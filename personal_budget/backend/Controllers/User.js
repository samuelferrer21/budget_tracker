const { createClient } = require('@supabase/supabase-js');
const express = require("express");
const env = require('dotenv')
const bcrypt = require('bcrypt')

const supabase = createClient("https://crxnirucwigphqmidezd.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNyeG5pcnVjd2lncGhxbWlkZXpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgyMjY4MTIsImV4cCI6MjAzMzgwMjgxMn0.rYCpTLqZjqL543f49O6kSwwq1OxMBRGlpVbDUYDMgg8")

exports.user_signup = async (req, res) => {
    //Params
    const email = req.body.email
    const password =  req.body.password
    console.log(email)

    //console.log(data)
    try
    {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password
          })

          if (error) {
            throw error
          }
          return res.status(201).json({message: "User Created"})
    }
    catch (error)
    {
        console.log(error)
        return res.status(422).json({message:"Failed to create user", error})
    }
}

//Signin method
exports.user_signin = async (req, res) => {
  //params
  const email = req.body.email
  const password = req.body.password
  try
  {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
    console.log(data)
      //Retrieve data
      const access_token = data["session"]["access_token"]
      const refresh_token = data["session"]['refresh_token']
      const email_data = data["user"]['email']
    
      //Encrypt
      const encrypted_access_token = bcrypt.hashSync(access_token, parseInt(process.env.SALT_ROUNDS))
      const encrypted_refresh_token = bcrypt.hashSync(refresh_token, parseInt(process.env.SALT_ROUNDS))
      const encrypted_email = bcrypt.hashSync(email_data, parseInt(process.env.SALT_ROUNDS))
      return await res.status(200).json({message: "User Logged in", 
        user: {
          access_token: encrypted_access_token,
          refresh_token: encrypted_refresh_token,
          email: encrypted_email
        }
    })
  }
  catch (error)
  {
    console.log(error)
    res.setHeader('Content-Type', 'application/json');
    return res.status(401).json({message:"Failed to login", error})
  }
  
}

