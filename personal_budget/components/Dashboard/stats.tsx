import React from 'react'

export default function Stats() {
  return (
    <div className="flex justify-center">
        <div className="stats shadow">
  
            <div className="stat">
                <div className="stat-figure text-secondary">
    
                </div>
                <div className="stat-title">Budget Availale</div>
                <div className="stat-value">31K</div>
                <div className="stat-desc">Jan 1st - Feb 1st</div>
            </div>
            
            <div className="stat">
                <div className="stat-figure text-secondary">
                
                </div>
                <div className="stat-title">Money spent this month</div>
                <div className="stat-value">4,200</div>
                <div className="stat-desc">↗︎ 400 (22%)</div>
            </div>
        </div>
    </div>
  )
}
