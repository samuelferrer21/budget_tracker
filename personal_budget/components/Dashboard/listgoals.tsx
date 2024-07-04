'use client'
import useSupabase from '@/hooks/useSupabase'
import React, { useEffect,useState } from 'react'

export default function ListGoals() {
    const [goals, setGoals] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        console.log("Goals fetch Ran")
        async function fetchGoals(){
            const supabase = useSupabase()

            const jwt = (await supabase.auth.getSession()).data.session?.access_token

            const res = await fetch('http://localhost:3001/goal/getgoal',{
                method: "GET",
                headers: {
                  'authorization': 'Bearer ' + jwt,
                  'content-type': 'application/json'
              }
            })
            let data = await res.json();
            console.log(await data['data'])

            let listGoals = null

            listGoals = await data['data'].map(item => (
                <div>
                    <label>{item.goal_title}</label>
                    <progress className="progress progress-success " value={parseInt(item.goal_amount_saved) } max={parseFloat(item.goal_amount)}></progress>
                </div>
            ))
            setGoals(listGoals);
            setLoading(false);
        }
        fetchGoals();
    },[])

  return (
    <div className='contents'>
        { loading ? <span className="loading loading-spinner text-accent"></span> : goals}
    </div>

  )
}
