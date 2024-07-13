import React from 'react'
import PropsedBudgetGraph from './propsedBudgetGraph'
import CurrentBudgetGraph from './currentBudgetGraph'

export interface props{
  housing: number,
  food: number,
  savings: number,
  transportation: number,
  entertainment: number,
  other: number,
}

export default function BudgetGraphs(props: props) {
    
  return (
    <div >
        {/* Current Allocation */}
        <div className="card lg:card-side bg-base-300 shadow-xl mb-4 h-[21rem]">
            <div className="card-body">
              <div className="card-title">
                Current Budget
              </div>
              <CurrentBudgetGraph/>
            </div>
        </div>
        {/* Proposed Allocation */}
        <div className="card lg:card-side bg-base-300 shadow-xl h-[21rem]">
            <div className="card-body">
              <div  className="card-title">
                Proposed Budget
              </div>
              <PropsedBudgetGraph housing={props.housing} food={props.food} transportation={props.transportation} savings={props.savings} entertainment={props.entertainment} other={props.other}/>
            </div>
        </div>
    </div>
  )
}
