import React from 'react'

export default function AddTransaction() {
  return (
    <div className="mt-4">
            <div id="response" className="mb-4">

            </div>
            <form className="grid gap-2">
                <label>Name of Transaction:</label>
                <input type="text" id="email" name="name" placeholder="Taco Bell" className="input input-bordered w-full max-w-xs" required/>
                <label>Description:</label>
                <input type="text" id="password" name="description" placeholder="Password" className="input input-bordered w-full max-w-xs" required/>
                <label>Cost of Transaction:</label>
                <input type="number" id="password" name="cost" placeholder="23.22" className="input input-bordered w-full max-w-xs" required/>
                <input type="submit" className="btn btn-active btn-primary" value={"Register"}/>
            </form>
        </div>
  )
}
