import React from 'react'
import Modal from '../modal'
import AddGoal from './addgoal'
import ListGoals from './listgoals'

export default function Goals() {
  return (
    <div className="card lg:card-side bg-base-300 shadow-xl mt-4">
        <div className="card-body">
            <h2 className="card-title">Goals</h2>
            <div className='contents'>
                <ListGoals/>
            </div>
            <div className='card-actions'>
              <Modal title='Add Goal' id='addGoal' data={<AddGoal/>}/>
            </div>
        </div>
    </div>
  )
}
