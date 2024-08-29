const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
dotenv.config();
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

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
