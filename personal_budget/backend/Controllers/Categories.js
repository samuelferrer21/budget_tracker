const { createClient } = require('@supabase/supabase-js');
const express = require("express");
const env = require('dotenv')
const bcrypt = require('bcrypt')
const supabase = createClient("https://crxnirucwigphqmidezd.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNyeG5pcnVjd2lncGhxbWlkZXpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgyMjY4MTIsImV4cCI6MjAzMzgwMjgxMn0.rYCpTLqZjqL543f49O6kSwwq1OxMBRGlpVbDUYDMgg8")

exports.getcategories = async (req, res,) =>{
    try {
        const {data, error} = await supabase.from('categories').select('*')
        
        if(error)
        {
            throw error
        }
        console.log('Ran')

        return res.status(200).json({message:"Successfully Retrieved Categories", body: data})
    }
    catch (error)
    {
       return res.status(400).json({message: 'Error Occured'}, error)

    }

    }
