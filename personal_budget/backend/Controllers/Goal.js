const { createClient } = require('@supabase/supabase-js');
const express = require("express");
const env = require('dotenv')
const bcrypt = require('bcrypt')
const supabase = createClient("https://crxnirucwigphqmidezd.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNyeG5pcnVjd2lncGhxbWlkZXpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgyMjY4MTIsImV4cCI6MjAzMzgwMjgxMn0.rYCpTLqZjqL543f49O6kSwwq1OxMBRGlpVbDUYDMgg8")


exports.getgoal = async (req, res) => {
    try{
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
            const {data, error} = await supabase.from('goals').select('*').eq('user_id', id)
            console.log(data)

            return res.status(200).json({message:"Retrieved goals", data})
        }
    }
    catch (error)
    {
        return res.status(400).json({message: error})
    }
}

//Adding a goal
exports.addgoal = async (req, res,) =>{
    try {

        const jwt = req.headers.authorization.replace("Bearer ", "")
        console.log(jwt)
        const {data, error} = ((await supabase.auth.getUser(jwt)))
        console.log(data.user.id)
        //Verify validity of user and access token
        if(data.user == null)
        {
            throw new Error(error)
        }
        else
        {
            const user_id = data.user.id
            const title = req.body.title
            const amount = req.body.amount
            console.log(user_id)
            console.log(title)
            console.log(amount)

            //Create Transaction
            const {error} = await supabase.from("goals").insert(
                {
                    goal_title: title,
                    goal_amount: Number.parseFloat(amount),
                    user_id: user_id,
                }
            )

            if(error != null)
            {
                console.log(error.message)
                throw new Error(error.message)
            }
            else
            {
                return res.status(200).json({message:"Successfully Added A Goal"})
            }
            
        }
    }
    catch (error)
    {
       return res.status(400).json({message: error})

    }

}
