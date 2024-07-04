'use client'
import useSupabase from '@/hooks/useSupabase';
import React from 'react'
import { useState } from 'react';

export default function AddGoal() {
    const [colorstatus, setColor] = useState("");
  //Trackstate of flash message 
  const [error, setError] = useState<string | null>(null)



  //Adds the goal
  async function addgoal(event: React.FormEvent<HTMLFormElement>) {
    const supabase = useSupabase()
    event.preventDefault();

    setError(null)

    const formEvent = event.currentTarget as HTMLFormElement

    const formData = new FormData(formEvent)

     //Grab our values
     const values = {
      title: formData.get("title") as string,
      amount: formData.get("amount") as unknown as number,
    };

    console.log(values)

    //Post Request
    //Get jwt
    const jwt = (await supabase.auth.getSession()).data.session?.access_token;
    console.log(jwt)

    // //Creates a POST request to create transaction
    const userRequest = fetch('http://localhost:3001/goal/addgoal',{
      method: "POST",
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
        setError("Added Goal")
      }
      else
      {
        throw new Error("Failed to add goal")
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
      <form className="grid gap-2" onSubmit={(e) => addgoal(e)}>
          <label htmlFor='title'>Goal Title:</label>
          <input type="text" id="title" name="title" placeholder="Buy a house" className="input input-bordered w-full max-w-xs" required/>
          <label htmlFor='description'>Goal Amount:</label>
          <input type="number" id="amount" name="amount" placeholder="100" step={0.01} className="input input-bordered w-full max-w-xs" required/>
          <input type="submit" className="btn btn-active btn-primary" value={"Add Goal"}/>
      </form>
    </div>
  )
}
