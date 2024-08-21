'use client'
import React from 'react'
import useSupabase from '@/hooks/useSupabase'

export interface props{
  budget: number
}
export default function BudgetStat(props: props) {
  return (
    <div className="flex justify-center">
        <div className="stats shadow">
            <div className="stat">
                <div className="stat-title">Current Budget</div>
                <div className="stat-value">${props.budget}</div>
                <div className="stat-desc">Per Month</div>
            </div>
        </div>
    </div>
  )
}
