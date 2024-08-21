'use client'
import React, { useEffect, useState } from 'react'
import useSupabase from '@/hooks/useSupabase'

export default function Stats() {

  const [totalBudget, setTotalBudget] = useState(0)
  const [totalBudgetSubtracted, setTotalBudgetSubtracted] = useState(0)

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    //Fetch Current budget
    async function fetchBudget(){
      const supabase = useSupabase()
      const userId = (await (supabase.auth.getSession())).data.session?.user.id
      //Get jwt
      const jwt = (await supabase.auth.getSession()).data.session?.access_token;
      const res =  await fetch(`http://localhost:3001/budget/${userId}/budget`, {
        method: "GET",
        headers: {
          'authorization': 'Bearer ' + jwt,
          'content-type': 'application/json'
        }
      })
      let value = await res.json()
      console.log(value['body'][0]['total_budget'])
      setTotalBudget(value['body'][0]['total_budget'])
    }
    //Total Used
    async function fetchUsedBudget(){
      const supabase = useSupabase()
      const userId = (await (supabase.auth.getSession())).data.session?.user.id
      //Get jwt
      const jwt = (await supabase.auth.getSession()).data.session?.access_token;
      const transactionsRes =  await fetch(`http://localhost:3001/transaction/${userId}/transactions/total`, {
        method: "GET",
        headers: {
          'authorization': 'Bearer ' + jwt,
          'content-type': 'application/json'
        }
      })
      let transactionData = await transactionsRes.json()
      setTotalBudgetSubtracted(transactionData['data'][0]['total_sum'])
      console.log(transactionData['data'][0]['total_sum'])
    }
    fetchBudget()
    fetchUsedBudget()
    setIsLoading(false)
  },[isLoading])

  function refresh()
  {
    setIsLoading(true)
  }
  return (
    <div className="flex justify-center">
        <div className="stats shadow">
            <div className="stat">
                <div className="stat-figure text-secondary">
                </div>
                <div className="stat-title">Budget Availale</div>
                <div className="stat-value">${totalBudget - totalBudgetSubtracted}</div>
            </div>
            <div className="stat">
                <div className="stat-figure text-secondary">
                </div>
                <div className="stat-title">Money spent this month</div>
                <div className="stat-value">${totalBudgetSubtracted}</div>
                <div className="stat-desc">400 (22%)</div>
            </div>
            <button className="btn btn-neutral" onClick={() => refresh()}>Refresh</button>
        </div>
    </div>
  )
}
