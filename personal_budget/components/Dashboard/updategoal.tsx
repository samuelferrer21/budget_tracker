import useSupabase from '@/hooks/useSupabase'
import React, { Dispatch, SetStateAction } from 'react'
import { useState } from 'react'

export interface props{
  currentGoal: number,
  goal_id: string,
  setLoading: Dispatch<SetStateAction<boolean>>
}

export default function UpdateGoal(props: props) {
    const [colorstatus, setColor] = useState("")
    const [error, setError] = useState<String | null>(null)

    async function submitForm(event: React.FormEvent<HTMLFormElement>){
      const supabase = useSupabase();

      setError(null)

      event.preventDefault();

      const formEvent= event.currentTarget as HTMLFormElement
      const form  = new FormData(formEvent)

      const values = {
        new_name: form.get('newName'),
        new_amount: form.get('newAmount'),
        goal_id: props.goal_id
      }

      //POST Request
      //Get JWT token
      const jwt = (await supabase.auth.getSession()).data.session?.access_token;

      //Creates a POST request to create transaction
      const userRequest = fetch('http://localhost:3001/goal/modifygoal',{
        method: "POST",
        headers: {
            'authorization': 'Bearer ' + jwt,
            'content-type': 'application/json'
        },
        body: JSON.stringify(values)
      }).then(response => {
        if(response.status == 200)
        {
          setColor("alert alert-success");
          setError("Updated Goal");
          props.setLoading(true);
        }
        else
        {
          throw new Error("Failed to Modify Goal")
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
      <form className="grid gap-2" onSubmit={(e) => submitForm(e)} >
          <label htmlFor='progress'>Current Amount ${parseFloat((props.currentGoal.toString())).toFixed(2)}</label>
          <label htmlFor='description'>New Amount:</label>
          <input type="number" id="newAmount" name="newAmount" placeholder={parseFloat((props.currentGoal.toString())).toFixed(2)} step={0.01} className="input input-bordered w-full max-w-xs" required/>
          <label htmlFor='newName'>New Name:</label>
          <input type="text" id="newName" name="newName" placeholder="Buy a house" className="input input-bordered w-full max-w-xs" required/>
          <input type="submit" className="btn btn-active btn-primary" value={"Modify Goal"}/>
      </form>
    </div>
  )
}
