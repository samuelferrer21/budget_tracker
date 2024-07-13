const { createClient } = require('@supabase/supabase-js');
const express = require("express");
const supabase = createClient("https://crxnirucwigphqmidezd.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNyeG5pcnVjd2lncGhxbWlkZXpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgyMjY4MTIsImV4cCI6MjAzMzgwMjgxMn0.rYCpTLqZjqL543f49O6kSwwq1OxMBRGlpVbDUYDMgg8")

exports.getBudget = async (req, res) => {
    try{
        const jwt = req.headers.authorization.replace("Bearer ", "")
        const user = ((await supabase.auth.getUser(jwt)))

        const userId = user.data.user.id
        console.log("User: " + userId)

        if(user.error != null)
        {
            throw new Error(user.error)
        }
        
        const {data, error} = (await (supabase.from("budget").select("*").eq("user_id", userId).limit(1)))
        console.log(data)
        
        if(error != null)
        {
            throw new Error(error)
        }
        
    
       return res.status(200).json({message:"Retrieved budget", body: data})
    }
    catch (error)
    {
        return res.status(400).json({message: 'Error Occured', error})
    }
}

exports.changeBudget = async (req, res) => {
    try {

        const jwt = req.headers.authorization.replace("Bearer ", "")
        const {data, userError} = ((await supabase.auth.getUser(jwt)))

        if(data.user == null)
        {
            throw new Error(userError)
        }
        //Values
        const userid = data.user.id
        const housingValues = parseInt(req.body.housing)
        const foodValues = parseInt(req.body.food)
        const savingsValues = parseInt(req.body.savings)      
        const transportationValues = parseInt(req.body.transportation)
        const entertainmentValues = parseInt(req.body.entertainment)
        const otherValues = parseInt(req.body.other)

        const totalValue = parseInt(housingValues + foodValues + savingsValues + transportationValues + entertainmentValues + otherValues)

 
        if(userid != req.params.id)
        {
            throw new Error("Failed Authorization")
        }
        //Update Budget
        const {response, error} = await supabase.from('budget').update(
            {
                housing_allocation: housingValues,
                food_allocation: foodValues,
                savings_allocation: savingsValues,
                transportation_allocation: transportationValues,
                entertainment_allocation: entertainmentValues,
                other_allocation: otherValues
            }
        ).eq('user_id', userid)
        if(error)
        {
            console.log(error)
            throw new Error(error)
        }
        return res.status(200).json({message:"Updated Budget"})
    }
    catch (error)
    {
       return res.status(400).json({message: 'Error Occured'}, error)

    }
}

exports.changeTotalBudget = async (req, res) => {
    try {

        const jwt = req.headers.authorization.replace("Bearer ", "")
        const {data, userError} = ((await supabase.auth.getUser(jwt)))

        if(data.user == null)
        {
            throw new Error(userError)
        }
        //Values
        const userid = data.user.id

        const totalValue = parseInt(req.body.amount)

 
        if(userid != req.params.id)
        {
            throw new Error("Failed Authorization")
        }
        //Update Budget
        const {response, error} = await supabase.from('budget').update(
            {

                housing_allocation: 0,
                food_allocation: 0,
                savings_allocation: 0,
                transportation_allocation: 0,
                entertainment_allocation: 0,
                other_allocation: 0,
                total_budget: totalValue
            }
        ).eq('user_id', userid)
        if(error)
        {
            console.log(error)
            throw new Error(error)
        }
        return res.status(200).json({message:"Updated Budget"})
    }
    catch (error)
    {
       return res.status(400).json({message: 'Error Occured'}, error)

    }
}