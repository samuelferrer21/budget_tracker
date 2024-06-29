'use client'
import React from "react";
import { useState, FormEvent } from "react";
import { use } from "react";

export default function SignUp() {
    const [status, setColor] = useState("");

    //Trackstate of flash message 
    const [error, setError] = useState<string | null>(null)

    //Post user data
    const submitForm = (event: React.FormEvent<HTMLFormElement>) => {

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

        //Creates a user
        const userRequest = fetch('http://localhost:3001/user/signup',{
        
            method: "POST",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(values)
        }).then(response => {
            if(response.status == 422)
            {
                throw new Error("User is already Created")
            }
            else if (response.status == 201)
            {
                setColor("alert alert-success")
                setError("User successfully created")
            }
            else
            {
                throw new Error("Failed to create user try again")
            }
        })
        .catch(error => {
            //Sets the alert message
            setError(error.message)
            //Sets the alert colour and style
            setColor("alert alert-error")
        })
             
    }

    return (
        <div className="mt-4">
            <div id="response" className="mb-4">
                {error && 
                    <div role="alert" className={status}>
                    <span>{error}</span>
                  </div>
                }
            </div>
            <form className="grid gap-2" onSubmit={submitForm}>
                <label>Email:</label>
                <input type="text" id="email" name="email" placeholder="email@gmail.com" className="input input-bordered w-full max-w-xs" required/>
                <label>Password:</label>
                <input type="password" id="password" name="password" placeholder="Password" className="input input-bordered w-full max-w-xs" required/>
                <input type="submit" className="btn btn-active btn-primary" value={"Register"}/>
            </form>
        </div>
    )
}