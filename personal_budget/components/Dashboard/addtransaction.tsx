'use client'
import React, { useEffect, useState } from 'react'

export interface props {
  categories: any;
}

export default function AddTransaction(props: props){
  const selectionOptions = props.categories

  //Store category data
  //Maps category data
  let categories = null
  try
  {
    categories = selectionOptions['bodsy'].map(category => (
      <option key={category.id}>{category.category_name}</option>
    ));
  }
  catch
  {
    <p>Failed to grab categories</p>
  }

    
  

  const addTransaction = (event: React.FormEvent<HTMLFormElement>) => {
    console.log("test")
  }

  //Returns category Data
  return (
    <div className="mt-4">
            <div id="response" className="mb-4">
            </div>
            <form className="grid gap-2" onSubmit={addTransaction}>
                <label>Name of Transaction:</label>
                <input type="text" id="title" name="title" placeholder="Taco Bell" className="input input-bordered w-full max-w-xs" required/>
                <label>Description:</label>
                <input type="text" id="description" name="description" placeholder="Password" className="input input-bordered w-full max-w-xs" required/>
                <label>Category:</label>
                <select id="category" name="category" className="select select-bordered w-full max-w-xs" defaultValue={"Category"} required>
                  <option id='default' disabled>Category</option>
                  {categories}
                </select>
                <label>Cost of Transaction:</label>
                <input type="number" id="cost" name="cost" placeholder="23.22" className="input input-bordered w-full max-w-xs" required/>
                <input type="submit" className="btn btn-active btn-primary" value={"Register"}/>
            </form>
        </div>
  )
}