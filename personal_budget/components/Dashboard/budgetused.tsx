import React from 'react'

export default function Budgetused() {
  return (
    <div className="card lg:card-side bg-base-300 shadow-xl ">
        <div className="card-body">
            <h2 className="card-title">Budget Used</h2>
            <div className='contents'>

                <label>housing</label>
                <progress className="progress progress-success " value="0" max="100"></progress>
                <label>Food</label>
                <progress className="progress progress-success" value="50" max="100"></progress>
                <label>Savings</label>
                <progress className="progress progress-success" value="0" max="100"></progress>
                <label>Transportation</label>
                <progress className="progress progress-success" value="0" max="100"></progress>
                <label>Entertainment</label>
                <progress className="progress progress-success" value="0" max="100"></progress>
                
            </div>
            <div className="card-actions justify-end">
            </div>
        </div>
    </div>
  )
}
