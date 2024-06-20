'use client'
import React from "react";
import { useState, FormEvent } from "react";
export default function HomepageSignup() {
    const [status, setColor] = useState("");

    //Trackstate of flash message 
    const [error, setError] = useState<string | null>(null)

    //Post user data
    const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {

        //Reset states for each call
        setError(null)

        event.preventDefault();

        const form = event.currentTarget as HTMLFormElement;

        const formData = new FormData(form)
        console.log(formData)

        //Grab the data from form
        const values = {
            email: formData.get('email') as string,
            password: formData.get('password') as string
        };

        console.log(values)

        //Activate post
        try
        {
            const userRequest = await fetch('http://localhost:3001/user/signup',{
            
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(values)
            })
             //userRequest
            
             //Checks request status throws error message when needed.
            if(userRequest.status == 422)
            {
                throw new Error("User is already Created")
            }
            else if (userRequest.status == 201)
            {
                setColor("alert alert-success")
                setError("User successfully created")
            }
            else
            {
                throw new Error("Failed to create user try again")
            }
        }
        catch (error)
        {
            //Sets the alert message
            setError(error.message)
            //Sets the alert colour and style
            setColor("alert alert-error")
        }

    }
    return(
        <div className="hero bg-base-200 bg-opacity-80">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <div className="text-center lg:text-left">
                <h1 className="text-5xl font-bold">Sign up!</h1>
                <p className="py-6 font-primary-content text-xl">Take control of your finances and unlock a clearer financial future by logging in to your personalized budget tracker. With instant access to your spending habits and savings goals, you'll be making informed money decisions in no time!.</p>
                </div>
                
                <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                <form className="card-body" onSubmit={submitForm}>
                    <div id="response" className="mb-4">
                        {error && 
                            <div role="alert" className={status}>
                            <span>{error}</span>
                        </div>
                        }
                    </div>
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" id="email" name="email" placeholder="email" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" id="password" name="password" placeholder="password" className="input input-bordered" required />
                    </div>
                    <div className="form-control mt-6">
                    <button className="btn btn-primary">Sign up</button>
                    </div>
                </form>
                </div>
            </div>
        </div>
    )
}