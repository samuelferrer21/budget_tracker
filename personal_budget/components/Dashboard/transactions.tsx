import React from 'react';
import Modal from '../modal';
import AddTransaction from './addtransaction';
import ListTransactions from './listtransactions';
import { use } from "react";

async function categoriesData()
{
    const res = await fetch('http://localhost:3001/category/getcategories')
    return await res.json()
}

export default async function Transactions() {
    //Fetch transactions
  return (
    <div>
        <div className="card lg:card-side bg-base-300 shadow-xl w-full mb-4">
            <div className="card-body">
                <div className='flex justify-between'>
                    <h2 className="card-title">Recent Transactions</h2>
                    <Modal id="addTransaction" title ="Add Transaction" data={<AddTransaction categories={await categoriesData()}/>}/>
                </div>
                <ListTransactions/>
            </div>
        </div>
    </div>
  )
}


