import React, { useEffect, useState } from 'react'

//Fetch Categories
async function getData() {
  const res = await fetch('http://localhost:3001/category/getcategories')

 
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
 
  return res.json()
}

export default async function AddTransaction(){
  //Store category data
  const data = await getData()
  //Maps category data
  const categories = await data['body'].map(category => (
    <option key={category.id}>{category.category_name}</option>
));

  //Returns category Data
  return (
    <div className="mt-4">
            <div id="response" className="mb-4">
            </div>
            <form className="grid gap-2">
                <label>Name of Transaction:</label>
                <input type="text" id="email" name="name" placeholder="Taco Bell" className="input input-bordered w-full max-w-xs" required/>
                <label>Description:</label>
                <input type="text" id="password" name="description" placeholder="Password" className="input input-bordered w-full max-w-xs" required/>
                <label>Category:</label>
                <select className="select select-bordered w-full max-w-xs">
                  <option disabled selected>Category</option>
                  {categories}
                </select>
                <label>Cost of Transaction:</label>
                <input type="number" id="password" name="cost" placeholder="23.22" className="input input-bordered w-full max-w-xs" required/>
                <input type="submit" className="btn btn-active btn-primary" value={"Register"}/>
            </form>
        </div>
  )
}