const { createClient } = require('@supabase/supabase-js');

const supabase = createClient("https://crxnirucwigphqmidezd.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNyeG5pcnVjd2lncGhxbWlkZXpkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTgyMjY4MTIsImV4cCI6MjAzMzgwMjgxMn0.rYCpTLqZjqL543f49O6kSwwq1OxMBRGlpVbDUYDMgg8")

exports.addtransaction= async (req, res,) =>{
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
            //Verify that the userid from jwt matches with the paramter  
            if(id != req.params.id)
            {
                throw new Error("Failed Authorization")
            }

            console.log(req.body.cost)

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
                    transaction_price: Number.parseFloat(cost),
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
            //Verify that the userid from jwt matches with the paramter  
            if(id != req.params.id)
            {
                throw new Error("Failed Authorization")
            }

            //Grabs Transactions with the same user_id
            const {data, error} = await supabase.from('transactions').select('*,categories ( category_name)').eq('user_data_id', id)

            return res.status(200).json({message:"Retrieved User Transactions", data})
        }
    }
    catch (error)
    {
        return res.status(400).json({message: 'Invalid Token', error})
    }

}

exports.gettotaltransactions = async (req, res) => {
    try
    {
        const jwt = req.headers.authorization.replace("Bearer ", "")

        const {data, error} = ((await supabase.auth.getUser(jwt)))
        let id = data.user.id
        // Verify validity of user and access token
        if(data.user == null)
        {
            throw new Error(error)
        }
        else
        {
            // Verify that the userid from jwt matches with the paramter  
            if(id != req.params.id)
            {
                throw new Error("Failed Authorization")
            }
            // Grabs Transactions with the same user_id
            const {data, error} = await supabase.rpc('calculate_transaction_totals', {user_id_param: id})
            console.log(data)

            return res.status(200).json({message:"Retrieved Totals of Transactions", data})
        }

    }
    catch (error)
    {
        return res.status(404).json({message:"Error Occured", error})
    }

}