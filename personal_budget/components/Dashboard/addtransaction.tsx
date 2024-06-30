'use client'
import React, { useEffect, useState } from 'react'
import useSupabase from '@/hooks/useSupabase';

export interface props {
  categories: any;
}

export default function AddTransaction(props: props){
  const selectionOptions = props.categories
  console.log(props.categories)

  const [status, setColor] = useState("");
  //Trackstate of flash message 
  const [error, setError] = useState<string | null>(null)

  //Store category data
  let categories = null
  
  try
  {
     //Maps category data
    categories = selectionOptions['body'].map(category => (
      <option key={category.id} value={category.id}>{category.category_name}</option>
    ));
  }
  catch
  {
    <p>Failed to grab categories</p>
  }
  

  const addTransaction = async (event: React.FormEvent<HTMLFormElement>) => {
    const supabase = useSupabase()
   
    
    setError(null)

    event.preventDefault()
    const form = event.currentTarget as HTMLFormElement

    const formData = new FormData(form)

    //Grab our values
    const values = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      category: formData.get("category") as string,
      cost: formData.get("cost") as string
    };
    //Get jwt
    const jwt = (await supabase.auth.getSession()).data.session?.access_token;

    //Creates a POST request to create transaction
    const userRequest = fetch('http://localhost:3001/transaction/addtransaction',{
        
      method: "POST",
      headers: {
          'authorization': 'Bearer ' + jwt,
          'content-type': 'application/json'
      },
      body: JSON.stringify(values)
    })
  }

  //Returns category Data
  return (
    <div className="mt-4">
            <div id="response" className="mb-4">
              {error && 
                    <div role="alert" className={status}>
                    <span>{error}</span>
                  </div>
                }
            </div>
            <form className="grid gap-2" onSubmit={addTransaction}>
                <label htmlFor='title'>Name of Transaction:</label>
                <input type="text" id="title" name="title" placeholder="Taco Bell" className="input input-bordered w-full max-w-xs" required/>
                <label htmlFor='description'>Description:</label>
                <input type="text" id="description" name="description" placeholder="Password" className="input input-bordered w-full max-w-xs" required/>
                <label htmlFor='category'>Category:</label>
                <select id="category" name="category" className="select select-bordered w-full max-w-xs" defaultValue={"Category"} required>
                  <option id='default' disabled>Category</option>
                  {categories}
                </select>
                <label htmlFor='cost'>Cost of Transaction:</label>
                <input type="number" id="cost" name="cost" placeholder="23.22" className="input input-bordered w-full max-w-xs" required/>
                <input type="submit" className="btn btn-active btn-primary" value={"Add Transaction"}/>
            </form>
        </div>
  )
}