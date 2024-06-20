import React from 'react'

export default function Goals() {
  return (
    <div className="card lg:card-side bg-base-300 shadow-xl mt-4">
        <div className="card-body">
            <h2 className="card-title">Goals</h2>
            <div className='contents'>
                <label>TFSA</label>
                <progress className="progress progress-success " value="0" max="100"></progress>
                <label>FHSA</label>
                <progress className="progress progress-success" value="50" max="100"></progress>
                <label>Savings</label>
                <progress className="progress progress-success" value="0" max="100"></progress>
                <label>Trip</label>
                <progress className="progress progress-success" value="0" max="100"></progress>
            </div>
        </div>
    </div>
  )
}
