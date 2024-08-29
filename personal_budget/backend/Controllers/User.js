const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
dotenv.config();

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

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


