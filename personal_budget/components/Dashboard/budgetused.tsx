'use client'

import useSupabase from '@/hooks/useSupabase'
import React, { useEffect, useState } from 'react'

export default function Budgetused() {
  const [usedBudget, setBudget] = useState<React.JSX.Element>()
  const [isLoading, setIsLoading] = useState(true)

  //States to manage 
  useEffect(() => {
    const supabase = useSupabase()
    async function calculateBudgetUsed()
    {
      //Fetch the budget 
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
      let data = await res.json();

      const transactionsRes =  await fetch(`http://localhost:3001/transaction/${userId}/transactions/total`, {
        method: "GET",
        headers: {
          'authorization': 'Bearer ' + jwt,
          'content-type': 'application/json'
        }
      })
      //Get the total transactions and calculate the current budget
      let transactionData = await transactionsRes.json()
      
      const currentHousingProgress = transactionData.data[0]['housing_sum'] == null ? 0 : Math.round(transactionData.data[0]['housing_sum'])
      const currentFoodProgress = transactionData.data[0]['food_sum'] == null ? 0 : Math.round(transactionData.data[0]['food_sum'])
      const currentSavingsProgress = transactionData.data[0]['savings_sum'] == null ? 0 : Math.round(transactionData.data[0]['savings_sum'])
      const currentTransportationProgress = transactionData.data[0]['transportation_sum'] == null ? 0 : Math.round(transactionData.data[0]['transportation_sum'])
      const currentEntertainmentProgress = transactionData.data[0]['entertainment_sum'] == null ? 0 : Math.round(transactionData.data[0]['entertainment_sum'])
      const currentOtherProgress = transactionData.data[0]['other_sum'] == null ? 0 : Math.round(transactionData.data[0]['other_sum'])

      //Progress HTML
      let currentProgress = ( 
        <div className='contents'>  
          <label>Housing {Math.round(currentHousingProgress/data.body[0]['housing_allocation']*100)}%</label>
          <progress className="progress progress-success " value={currentHousingProgress} max={data.body[0]['housing_allocation']}></progress>
          <label>Food/Groccery {Math.round(currentFoodProgress/data.body[0]['food_allocation']*100)}%</label>
          <progress className="progress progress-success" value={currentFoodProgress} max={data.body[0]['food_allocation']}></progress>
          <label>Savings {Math.round(currentSavingsProgress/data.body[0]['savings_allocation']*100)}%</label>
          <progress className="progress progress-success" value={currentSavingsProgress} max={data.body[0]['savings_allocation']}></progress>
          <label>Transportation {Math.round(currentTransportationProgress/data.body[0]['transportation_allocation']*100)}%</label>
          <progress className="progress progress-success" value={currentTransportationProgress} max={data.body[0]['transportation_allocation']}></progress>
          <label>Entertainment {Math.round(currentEntertainmentProgress/data.body[0]['entertainment_allocation']*100)}%</label>
          <progress className="progress progress-success" value={currentEntertainmentProgress} max={data.body[0]['entertainment_allocation']}></progress>
          <label>Other {Math.round(currentOtherProgress/data.body[0]['other_allocation']*100)}%</label>
          <progress className="progress progress-success" value={currentOtherProgress} max={data.body[0]['other_allocation']}></progress>
        </div>
      )
      setIsLoading(false)
      setBudget(currentProgress)
    }
    calculateBudgetUsed()

    
  },[isLoading])

  function refresh()
  {
    setIsLoading(true)
  }
  return (
    <div className="card lg:card-side bg-base-300 shadow-xl">
        <div className="card-body">
            <h2 className="card-title">Budget Used</h2>
            {isLoading ? <span className="loading loading-spinner text-secondary"></span> : usedBudget}
            <div className="card-actions justify-end">
              <button className="btn btn-neutral" onClick={() => refresh()}>Refresh</button>
            </div>
        </div>
    </div>
  )
}
