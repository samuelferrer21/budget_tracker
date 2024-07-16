'use client'
import React, { useEffect, useState } from 'react';
import Modal from '../modal';
import AddTransaction from './addtransaction';
import ListTransactions from './listtransactions';
import { use } from 'react';




export default function Transactions() {
    const [categoryData, setCategoryData] = useState(null)
    const [loading, setLoading] = useState(true)
    useEffect(() =>{
        async function categoriesData()
        {
            const res = await fetch('http://localhost:3001/categories')
            setCategoryData(await res.json())
        }
        categoriesData()
        

    },[loading])
    
    
  return (
    <div>
        <div className="card lg:card-side bg-base-300 shadow-xl w-full mb-4">
            <div className="card-body">
                <div className='flex justify-between'>
                    <h2 className="card-title">Recent Transactions</h2>
                    <Modal id="addTransaction" title ="Add Transaction" data={<AddTransaction loading={setLoading} categories={categoryData}/>}/>
                </div>
                <ListTransactions setLoading={setLoading} loading={loading}/>
            </div>
        </div>
    </div>
  )
}


