'use client'
import React from "react";

export default function SignIn() {

    const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
        console.log('test')
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
            userRequest
        }
        catch (error)
        {
            //sends an alert when error occurs
            console.log(error)
        }

    }

    return (
        <div className="mt-4">
            <div id="response" className="mb-4">
                <div role="alert" className="alert alert-error">
                    <span>Error! Task failed successfully.</span>
                </div>
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