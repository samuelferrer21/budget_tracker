'use client'

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import useSupabase from '@/hooks/useSupabase';


export interface props{
  setLoading: Dispatch<SetStateAction<boolean>>
  loading: boolean
}

/*
Description: Lists all the items of the transactions using props recieved from the transactions component.
*/
export default function ListTransactions(props: props) {
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    //Fetches transactions
    async function fetchTransactions(){
      const supabase = useSupabase()
    
      //Get jwt
      const jwt = (await supabase.auth.getSession()).data.session?.access_token;
      const userId = (await supabase.auth.getSession()).data.session?.user.id;
    
      //Creates a GET request to fetch the user transactions
      const res = await fetch(`http://localhost:3001/transaction/${userId}/transactions`,{
        method: "GET",
        headers: {
          'authorization': 'Bearer ' + jwt,
          'content-type': 'application/json'
      }
      })
      
      let data = await res.json();
      let listItems = null

      listItems = await data['data'].map(item=> (
        <tr key={item.id} className="hover">
          <td>{item.transaction_name}</td>
          <td>{item.transaction_description}</td>
          <td>{item.categories.category_name}</td>
          <td>${item.transaction_price}</td>
          <td>{item.date}</td>
        </tr>
      ))
      setTransactions(listItems);
      
    }
    
    
    if(props.loading)
    {
      console.log("UseEffect Ran")
      props.setLoading(false)
      fetchTransactions();
    }
  },[props.loading])

  //Table of transactions
  let table = (
    (<div className="overflow-x-auto">
      <div className="h-96 overflow-y-auto">
        <table className="table table-md table-pin-rows table-pin-cols">
          <thead>
            <tr>
                <td>Title</td>
                <td>Description</td> 
                <td>Type</td> 
                <td>Price</td> 
                <td>Date</td> 
            </tr>
          </thead> 
          <tbody className=" overflow-scroll h-40 ">
            {transactions}
          </tbody> 
          <tfoot className=''>
            <tr>
                <td>Title</td> 
                <td>Description</td> 
                <td>Type</td> 
                <td>Price</td> 
                <td>Date</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>)
  )

  
  
  return (
    <div>
      {props.loading ? <span className="loading loading-spinner text-accent"></span> : table}
    </div>
    
  )
}
