'use client'

import React, { useEffect } from 'react'
import { useState, FormEvent } from 'react'
import BudgetLabel from './budgetLabel'
import BudgetGraphs from './budgetGraphs'
import useSupabase from '@/hooks/useSupabase'
import BudgetStat from './budgetStat'

//Variables to calculate the subtracted total
let newHousingAllocated = 0;
let newFoodAllocated = 0;
let newSavingsAllocated = 0;
let newTransportationAllocated = 0;
let newEntertainmentAllocated = 0;
let newOtherAllocated = 0;

export default function BudgetAllocation() {
  const [currentBudget, setCurrentBudget] = useState<number>(0)
  useEffect(() => {
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
      setCurrentBudget(value.body[0]['total_budget'])
      
    }
    fetchBudget()
  },[])
  
  


  const budget = 3500
  const [budgetAllocated, setBudgetAllocated] = useState<number>(budget)
  const [housingAllocated, setHousingAllocated] = useState<number>(0)
  const [foodAllocated, setFoodAllocated] = useState<number>(0)
  const [savingsAllocated, setSavingsAllocated] = useState<number>(0)
  const [transportationAllocated, setTransportationAllocated] = useState<number>(0)
  const [entertainmentAllocated, setEntertainmentAllocated] = useState<number>(0)
  const [otherAllocated, setOtherAllocated] = useState<number>(0)
  //Submit Button State
  const [buttonDisabled, setButtonDisabled] = useState(false)
  //Response States
  const [error, setError] = useState<string>()
  const [color, setColor] = useState<string>()


  
  //Calculates the total to be subtracted
  function totalSubtracted()
  {
    return (newHousingAllocated + newFoodAllocated  + newSavingsAllocated + newTransportationAllocated + newEntertainmentAllocated + newOtherAllocated)
  }

  function setBudgetAllocation(e: any)
  {
  
    const value = parseInt(e.target.value)
    console.log("Current: " + e.target.id)
    console.log("Value: " + e.target.value)
    //Checks form id and changes useState accordingly
    switch (e.target.id) {
      case 'Housing':
        setHousingAllocated(value)
        newHousingAllocated = value
        break
      case 'Food':
        setFoodAllocated(value)
        newFoodAllocated = value
        
        break
      case 'Savings':
        setSavingsAllocated(value)
        newSavingsAllocated = value
        
        break
      case 'Transportation':
        setTransportationAllocated(value)
        newTransportationAllocated = value
        
        break
      case 'Entertainment':
        setEntertainmentAllocated(value)
        newEntertainmentAllocated = value
        break
      case 'Other':
        setOtherAllocated(value)
        newOtherAllocated = value
        break
    }
    
    setBudgetAllocated(budget - totalSubtracted())
    //Error Flash
    if (totalSubtracted() > budget)
    {
      //Sets the alert message
      setError("Cant go over budget!")
      setColor("alert alert-error")
      setButtonDisabled(true)
    }
    else
    {
      setError("")
      setButtonDisabled(false)
    }
  }

  async function submitForm(event: React.FormEvent)
  {
    
    const supabase = useSupabase()
    event.preventDefault()

    const values = {
      housing: housingAllocated,
      food: foodAllocated,
      savings: savingsAllocated,
      transportation: transportationAllocated,
      entertainment: entertainmentAllocated,
      other: otherAllocated,
      total: budgetAllocated
    }

    //Post Request
    const userId = (await supabase.auth.getSession()).data.session?.user.id;
    //Get jwt
    const jwt = (await supabase.auth.getSession()).data.session?.access_token;
    console.log(jwt)
    console.log(userId)
    

    //Creates a POST request to create transaction
    const userRequest = fetch(`http://localhost:3001/budget/${userId}/update`,{
      method: "PUT",
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
    <div>
    <BudgetStat budget={currentBudget}/>
    <div className='sm:grid-cols-2 gap-4 grid grid-cols-1'>
      {/* Budget Slider */}
      <div className="card lg:card-side bg-base-300 shadow-xl">
          <div className="card-body">
              <h2 className="card-title">Budget Allocation</h2>
              <div>
                <p>Current Budget: ${budget}</p>
                <p>Budget Allocated $: {budgetAllocated}</p>
                <button className="btn btn-neutral">Reset Budget</button>
              </div>
              <div id="response" className="mb-4">
                      {error && 
                          <div role="alert" className={color}>
                          <span>{error}</span>
                      </div>
                      }
              </div>
              <div className='contents'>
                <form  onSubmit={submitForm}>
                  <div>
                    <BudgetLabel title="Housing" allocated={housingAllocated}/>
                    <input type="range" min="0" max={budget} id='Housing' step="1" name='Housing' className="range" defaultValue={'0'} onClick={e => setBudgetAllocation(e)} onChange={e => setBudgetAllocation(e)}/>
                  </div>
                  <div>
                    <BudgetLabel title="Food" allocated={foodAllocated}/>
                    <input type="range" min="0" max={budget} id='Food' name='Food' step="1" className="range"  defaultValue={'0'} onClick={e => setBudgetAllocation(e)} onChange={e => setBudgetAllocation(e)}/>
                  </div>
                  <div>
                    <BudgetLabel title="Savings" allocated={savingsAllocated}/>
                    <input type="range" min="0" max={budget} id='Savings' name='Savings' step="1" className="range" defaultValue={'0'} onClick={e => setBudgetAllocation(e)} onChange={e => setBudgetAllocation(e) }/>
                  </div>
                  <div>
                    <BudgetLabel title="Transportation" allocated={transportationAllocated}/>
                    <input type="range" min="0" max={budget} id='Transportation' step="1" name='transportation' className="range" defaultValue={'0'} onClick={e => setBudgetAllocation(e)} onChange={e => setBudgetAllocation(e)}/>
                  </div>
                  <div>
                    <BudgetLabel title="Entertainment" allocated={entertainmentAllocated}/>
                    <input type="range" min="0" max={budget} id='Entertainment'step="1" name='Entertainment' className="range" defaultValue={'0'} onClick={e => setBudgetAllocation(e)} onChange={e => setBudgetAllocation(e)}/>
                  </div>
                  <div>
                    <BudgetLabel title="Other" allocated={otherAllocated}/>
                    <input type="range" min="0" max={budget} id='Other' name='Other' className="range" defaultValue={'0'} step="1" onClick={e => setBudgetAllocation(e)} onChange={e => setBudgetAllocation(e)}/>
                  </div>
                  <input type="submit" disabled={buttonDisabled} className="btn btn-active btn-primary" value={"Set Allocation"}/>
                </form>
              </div>
          </div>
      </div>
      {/* Graphs */}
      <div>
          <BudgetGraphs housing={housingAllocated} food={foodAllocated} transportation={transportationAllocated} savings={savingsAllocated} entertainment={entertainmentAllocated} other={otherAllocated}/>
        </div>
    </div>
  </div>
  )
}
