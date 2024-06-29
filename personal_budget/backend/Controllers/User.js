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
      if(error.status == 422)
      {
        return res.status(422).json({message:"Failed to create user", error})
      }
      else
      {
        return res.status(400).json({message:"An error occured", error})
      }
        
        
    }
}


