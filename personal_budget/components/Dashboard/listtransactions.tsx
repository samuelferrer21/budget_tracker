'use client'

import React, { useEffect, useState } from 'react'
import useSupabase from '@/hooks/useSupabase';

/*
Description: Lists all the items of the transactions using props recieved from the transactions component.
*/
export default function ListTransactions() {
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    //Fetches transactions
    async function fetchTransactions(){
      const supabase = useSupabase()
    
      //Get jwt
      const jwt = (await supabase.auth.getSession()).data.session?.access_token;
    
      //Creates a POST request to create transaction
      const res = await fetch('http://localhost:3001/transaction/gettransactions',{
        method: "get"
      })
      let data = await res.json();
    
      let listItems = null
      listItems = await data['data'].map(item=> (
        <tr key={item.id}>
          <td>{item.transaction_name}</td>
          <td>{item.transaction_description}</td>
          <td>{item.category}</td>
          <td>{item.transaction_price}</td>
          <td>{item.date}</td>
        </tr>
      ))
      setTransactions(listItems);
    }

    fetchTransactions();
  },[])

  
  
  return (
  <div className="overflow-x-auto">
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
  </div>
  )
}
