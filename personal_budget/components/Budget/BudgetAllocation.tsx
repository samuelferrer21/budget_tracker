'use client'

import React from 'react'
import { useState, FormEvent } from 'react'
import BudgetLabel from './budgetLabel'
import BudgetGraphs from './budgetGraphs'


export default function BudgetAllocation() {
  const budget = 1000
  const [budgetAllocated, setBudgetAllocated] = useState(1000)
  const [housingAllocated, setHousingAllocated] = useState(0)
  const [foodAllocated, setFoodAllocated] = useState(0)
  const [savingsAllocated, setSavingsAllocated] = useState(0)
  const [transportationAllocated, setTransportationAllocated] = useState(0)
  const [entertainmentAllocated, setEntertainmentAllocated] = useState(0)
  const [otherAllocated, setOtherAllocated] = useState(0)

  const [buttonDisabled, setButtonDisabled] = useState(false)

  var budgetSubtracted = 0

  const [error, setError] = useState<string | null>(null)

  //allocation variables

  function setBudgetAllocation(e: any)
  {
    console.log("Current: " + e.target.id)
    //Checks form id and changes variable accordingly
    switch (e.target.id.toString()) {
      case 'Housing':
        setHousingAllocated(e.target.value)
        break
        
      case 'Food':
        
        setFoodAllocated(e.target.value)
        break
      case 'Savings':
        setSavingsAllocated(e.target.value)
        break
      case 'Transportation':
        setTransportationAllocated(e.target.value)
        break
      case 'Entertainment':
        setEntertainmentAllocated(e.target.value)
        break
      case 'Other':
        setOtherAllocated(e.target.value)
        break
    }
    budgetSubtracted = (+foodAllocated + +housingAllocated + +savingsAllocated + +transportationAllocated + +entertainmentAllocated + +otherAllocated)
    setBudgetAllocated(budget-budgetSubtracted)
    //Error Flash
    if (budgetSubtracted > 1000)
    {
      //Sets the alert message
      setError("Cant go over budget!")
      setButtonDisabled(true)
    }
    else
    {
      setError(null)
      setButtonDisabled(false)
    }
  }

  // const submitNewAllocation = async (event: React.FormEvent<HTMLFormElement>) =>
  // {
  //   event.preventDefault();

  //   try 
  //   {
  //     console.log("housing: " + housing)
  //     console.log("food: " +food)
  //     console.log("savings: " +savings)
  //     console.log("transportation: " +transportation)
  //     console.log("entertainment: " +entertainment)
  //     console.log("other: " +other)
  //   }
  //   catch
  //   {
  //     console.log("test")
  //   }
  // }

  return (
    <div className='sm:grid-cols-2 gap-4 grid grid-cols-1'>
      {/* Budget Slider */}
      <div className="card lg:card-side bg-base-300 shadow-xl">
          <div className="card-body">
              <h2 className="card-title">Budget Allocation</h2>
              <div>
                <p>Current Budget: ${budget}</p>
                <p>Budget Allocated %: {budgetAllocated}</p>
                <button className="btn btn-neutral">Change Budget</button>
              </div>
              <div id="response" className="mb-4">
                      {error && 
                          <div role="alert" className="alert alert-error">
                          <span>{error}</span>
                      </div>
                      }
              </div>
              <div className='contents'>
                <form  >
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
                    <input type="range" min="0" max={budget} id='Savings' name='Savings' step="1" className="range" defaultValue={'0'} onClick={e => setBudgetAllocation(e)} onChange={e => setBudgetAllocation(e)}/>
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
  )
}
