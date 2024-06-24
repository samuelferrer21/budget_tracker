import React from 'react'

export interface props {
    title: string
    allocated: number;

}

export default function BudgetLabel(props: props ) {
  return (
    <div>
        <div className='flex justify-between items-baseline'>
        <label htmlFor={props.title}>{props.title} </label>
        <span className="stat-value text-[1.25rem]">${props.allocated}</span>
        </div>
    </div>
  )
}
