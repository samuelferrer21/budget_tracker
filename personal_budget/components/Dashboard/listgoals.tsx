'use client'
import useSupabase from '@/hooks/useSupabase'
import React, { createContext, useContext, useEffect,useState } from 'react'
import ModalImageButton from '../modalimagebutton'
import AddMoney from './addmoney'
import UpdateGoal from './updategoal'

export default function ListGoals() {

    const [goals, setGoals] = useState([])
    const [loading, setLoading] = useState(true)
    
    //SVG paths
    const pencil = "M18.311 2.828l2.862 2.861-15.033 15.032-3.583.722.723-3.584 15.031-15.031zm0-2.828l-16.873 16.872-1.438 7.127 7.127-1.437 16.874-16.873-5.69-5.689z";
    const money = "M4.82 19.407c-2.966-1.857-4.94-5.153-4.94-8.907 0-5.795 4.705-10.5 10.5-10.5 3.605 0 6.789 1.821 8.68 4.593 2.966 1.857 4.94 5.153 4.94 8.907 0 5.795-4.705 10.5-10.5 10.5-3.599 0-6.778-1.815-8.67-4.579l-.01-.014zm8.68-15.407c5.243 0 9.5 4.257 9.5 9.5s-4.257 9.5-9.5 9.5-9.5-4.257-9.5-9.5 4.257-9.5 9.5-9.5zm.5 15h-1.021v-.871c-2.343-.302-2.599-2.179-2.599-2.744h1.091c.025.405.157 1.774 2.182 1.774.599 0 1.088-.141 1.453-.419.361-.276.536-.612.536-1.029 0-.793-.513-1.367-2.07-1.718-2.368-.536-2.923-1.398-2.923-2.533 0-1.509 1.223-2.216 2.33-2.406v-1.054h1.021v1.015c2.491.195 2.695 2.215 2.695 2.771h-1.098c0-1.161-.918-1.766-1.996-1.766-1.077 0-1.854.532-1.854 1.408 0 .781.439 1.165 1.994 1.554 1.879.473 2.999 1.101 2.999 2.681 0 1.744-1.509 2.393-2.74 2.493v.844zm2.85-15.453c-1.696-1.58-3.971-2.547-6.47-2.547-5.243 0-9.5 4.257-9.5 9.5 0 2.633 1.073 5.017 2.806 6.739l-.004-.01c-.44-1.159-.682-2.416-.682-3.729 0-5.795 4.705-10.5 10.5-10.5 1.171 0 2.298.192 3.35.547z"
    const trashcan = "m4.015 5.494h-.253c-.413 0-.747-.335-.747-.747s.334-.747.747-.747h5.253v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-.254v15.435c0 .591-.448 1.071-1 1.071-2.873 0-11.127 0-14 0-.552 0-1-.48-1-1.071zm14.5 0h-13v15.006h13zm-4.25 2.506c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm-4.5 0c-.414 0-.75.336-.75.75v8.5c0 .414.336.75.75.75s.75-.336.75-.75v-8.5c0-.414-.336-.75-.75-.75zm3.75-4v-.5h-3v.5z"

    useEffect(() => {
        
        async function fetchGoals(){
            const supabase = useSupabase()

            const jwt = (await supabase.auth.getSession()).data.session?.access_token

            const res = await fetch('http://localhost:3001/goal/getgoal',{
                method: "GET",
                headers: {
                  'authorization': 'Bearer ' + jwt,
                  'content-type': 'application/json'
              }
            })
            let data = await res.json();
            console.log(await data['data'])

            let listGoals = null

            listGoals = await data['data'].map(item => (
                <div>
                    <div className='flex'>
                        <label>{item.goal_title} </label>
                        <p>&nbsp;{Math.round((Math.round(item.goal_amount_saved) / Math.round(item.goal_amount)) * 100)}%</p>
                        <div className='flex w-[7rem] justify-around'>
                            {/* Add Money */}
                            <ModalImageButton id={item.goal_title} title={item.goal_title} data={<AddMoney goal_id={item.id} currentAmount={item.goal_amount_saved} currentGoal={item.goal_amount} setLoading={setLoading}/>} svg='http://www.w3.org/2000/svg' svg_path={money}/>
                            {/* Edit goal */}
                            <ModalImageButton id={item.goal_title + "_edit"} title={item.goal_title} data={<UpdateGoal goal_id={item.id} currentGoal={item.goal_amount}/>} svg='http://www.w3.org/2000/svg'svg_path={pencil}/>
                            
                            {/* <ModalImageButton id={item.goal_title} title={item.goal_title} data={<UpdateGoal goal_id={item.id} currentGoal={item.goal_amount} />} svg="http://www.w3.org/2000/svg" svg_path={trashcan}/>  */} 
                        </div>
                        
                    </div>
                    
                    <progress className="progress progress-success " value={parseInt(item.goal_amount_saved) } max={parseFloat(item.goal_amount)}></progress>
                </div>
            ))
            setGoals(listGoals);
            setLoading(false);
            
        }
        if(loading == true)
        {
            console.log("Goals fetch Ran")
            fetchGoals();
            
        }
        
    },[loading])

  return (
    <div className='contents'>

        { loading ? <span className="loading loading-spinner text-accent"></span> : goals}
    </div>

  )
}
