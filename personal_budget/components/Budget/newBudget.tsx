'use client'
import React from 'react'
import { useState } from 'react';
import useSupabase from '@/hooks/useSupabase';

export default function NewBudget() {
    const [colorstatus, setColor] = useState("");
    //Trackstate of flash message 
    const [error, setError] = useState<string | null>(null)

    //Adds the goal
  async function changeBudget(event: React.FormEvent<HTMLFormElement>) {
    const supabase = useSupabase()
    event.preventDefault();

    setError(null)

    const formEvent = event.currentTarget as HTMLFormElement
    

    const formData = new FormData(formEvent)

     //Grab our values
     const values = {
      amount: formData.get("amount") as unknown as number,
    };

    //Post Request
    //Get jwt
    const jwt = (await supabase.auth.getSession()).data.session?.access_token;
    const userId = (await supabase.auth.getSession()).data.session?.user.id;
    console.log(jwt)

    //Creates a POST request to create transaction
    const userRequest = fetch(`http://localhost:3001/budget/${userId}/update/budget`,{
      method: "PUT",
      headers: {
          'authorization': 'Bearer ' + jwt,
          'content-type': 'application/json'
      },
      body: JSON.stringify(values)
    }).then(response => {
      if(response.status == 200)
      {
        console.log("Added Goal")
        setColor("alert alert-success")
        setError("Updated Total Budget")
        window.location.reload()
      }
      else
      {
        throw new Error("Failed to update total Budget")
      }
    })
    .catch(error => {
      setColor("alert alert-error")
      setError(error.message)
    })
    
  }
  return (
    <div className="mt-4">
      <div id="response" className="mb-4">
        {error && 
              <div role="alert" className={colorstatus}>
              <span>{error}</span>
            </div>
          }
      </div>
      <form className="grid gap-2" onSubmit={(e) => changeBudget(e)}>
          <label htmlFor='description'>Budget Amount:</label>
          <input type="number" id="amount" name="amount" placeholder="100" step={0.01} className="input input-bordered w-full max-w-xs" required/>
          <input type="submit" className="btn btn-active btn-primary" value={"Update Budget Total"}/>
      </form>
    </div>
  )
}
