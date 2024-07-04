const { createClient } = require('@supabase/supabase-js');
const express = require("express");
const env = require('dotenv')
const bcrypt = require('bcrypt');
const { error } = require('console');
const { json } = require('stream/consumers');
const supabase = createClient("https://crxnirucwigphqmidezd.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNyeG5pcnVjd2lncGhxbWlkZXpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgyMjY4MTIsImV4cCI6MjAzMzgwMjgxMn0.rYCpTLqZjqL543f49O6kSwwq1OxMBRGlpVbDUYDMgg8")

exports.addtransaction= async (req, res,) =>{
    try {
        
        const jwt = req.headers.authorization.replace("Bearer ", "")

        const {data, error} = ((await supabase.auth.getUser(jwt)))
        console.log(data.user)
        //Verify validity of user and access token
        if(data.user == null)
        {
            throw new Error(error)
        }
        else
        {
            const user_id = data.user.id
            const title = req.body.title
            const description = req.body.description
            const category = req.body.category
            const cost = req.body.cost
            const date = req.body.date
            
            //Create Transaction
            const {error} = await supabase.from("transactions").insert(
                {
                    transaction_name: title,
                    transaction_description: description,
                    transaction_price: Number.parseInt(cost),
                    user_data_id: user_id,
                    date: date,
                    category: category
                }
            )

            return res.status(200).json({message:"Added To Transactions"})
        }
    }
    catch (error)
    {
       return res.status(400).json({message: 'Error Occured', error})
    }
}

exports.gettransactions= async (req, res,) =>{
    try {
        
        const jwt = req.headers.authorization.replace("Bearer ", "")
   
        const {data, error} = ((await supabase.auth.getUser(jwt)))
        let id = data.user.id
        //Verify validity of user and access token
        if(data.user == null)
        {
            throw new Error(error)
        }
        else
        {
            //Grabs Transactions
            const {data, error} = await supabase.from('transactions').select('*,categories ( category_name)').eq('user_data_id', id)


            return res.status(200).json({message:"Added To Transactions", data})
        }
    }
    catch (error)
    {
        return res.status(400).json({message: 'Invalid Token', error})
    }

}