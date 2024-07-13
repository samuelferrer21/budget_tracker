import useSupabase from '@/hooks/useSupabase'
import React, { Dispatch, SetStateAction } from 'react'
import { useState } from 'react'

export interface props{
  currentGoal: number,
  goal_id: string,
  currentAmount: number,
  setLoading: Dispatch<SetStateAction<boolean>>
}

export default function AddMoney(props: props) {
    const [colorstatus, setColor] = useState("")
    const [error, setError] = useState<String | null>(null)

    //Handles form submission
    async function submitForm(event: React.FormEvent<HTMLFormElement>) {
      const supabase = useSupabase();
      event.preventDefault();

      setError(null)

      const formEvent = event.currentTarget as HTMLFormElement
      const formData = new FormData(formEvent)

       //Grab our values
     const values = {
        goal_id: props.goal_id,
        amount: formData.get("amount") as unknown as number,
      };

      console.log(values)

      //Post Request
      //Get jwt
      const jwt = (await supabase.auth.getSession()).data.session?.access_token;
      console.log(jwt)

      //Creates a POST request to create transaction
      const userRequest = fetch('http://localhost:3001/goal/contributegoal',{
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
          throw new Error(response.statusText)
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
      <form className="grid gap-2" onSubmit={(e) => submitForm(e)}>
          <label htmlFor='progress'>Current Progress: ${(props.currentAmount.toFixed(2))}/${parseFloat((props.currentGoal.toString())).toFixed(2)}</label>
          <label htmlFor='description'>New Amount:</label>
          <input type="number" id="amount" name="amount" placeholder="100" step={0.01} className="input input-bordered w-full max-w-xs" min={0} max={props.currentGoal} required/>
          <input type="submit" className="btn btn-active btn-primary" value={"Update Progress Goal"}/>
      </form>
    </div>
  )
}
