const { createClient } = require('@supabase/supabase-js');
const express = require("express");
const env = require('dotenv')


const supabase = createClient("https://crxnirucwigphqmidezd.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNyeG5pcnVjd2lncGhxbWlkZXpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgyMjY4MTIsImV4cCI6MjAzMzgwMjgxMn0.rYCpTLqZjqL543f49O6kSwwq1OxMBRGlpVbDUYDMgg8")

exports.user_signin = async (req, res) => {
    //Params
    const email = req.query.email
    const password = req.query.password
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
          return res.status(200).json({message: "User Created"})
    }
    catch (error)
    {
        console.log(error)
        return res.status(500).json({message:"Failed to create use", error})
    }
}

