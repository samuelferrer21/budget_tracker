
import BudgetAllocation from '@/components/Budget/BudgetAllocation'
import BudgetGraphs from '@/components/Budget/budgetGraphs'
import BudgetStat from '@/components/Budget/budgetStat'
import useSupabase from '@/hooks/useSupabase'
import React from 'react'

export default function page() {
  return (
    <main className='bg-base-100'>
      <BudgetAllocation/>
    </main>
  )
}
