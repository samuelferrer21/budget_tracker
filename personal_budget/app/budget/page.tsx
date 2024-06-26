
import BudgetAllocation from '@/components/Budget/BudgetAllocation'
import BudgetGraphs from '@/components/Budget/budgetGraphs'
import React from 'react'



export default function page() {
  return (
    <main className='bg-base-100'>
      <section>
        {/* Stats */}
        <div className="flex justify-center">
          <div className="stats shadow">
              <div className="stat">
                  <div className="stat-title">Current Budget</div>
                  <div className="stat-value">31K</div>
                  <div className="stat-desc">Jan 1st - Feb 1st</div>
              </div>
          </div>
        </div>
      </section>
      <section id="Budget" className=''>
        <BudgetAllocation/>
        
        

      </section>
      


      


    </main>
  )
}
