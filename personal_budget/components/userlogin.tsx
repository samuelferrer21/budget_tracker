'use client'
import React from "react";
import { useState } from "react";
import { getCookie, setCookie, deleteCookie, hasCookie, getCookies } from "cookies-next"
import Router from "next/router";

export default function Login() {
    const [status, setColor] = useState("");
    //Trackstate of flash message 
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    //Post user data
    const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {

        //Reset states for each call
        setIsLoading(true)
        setError(null)

        event.preventDefault();

        const form = event.currentTarget as HTMLFormElement;

        const formData = new FormData(form)

        //Grab the data from form
        const values = {
            email: formData.get('email') as string,
            password: formData.get('password') as string
        };

        //Activate post
        try
        {
            const userRequest = await fetch('http://localhost:3001/user/signin',{
                
                method: "POST",
                credentials: "include",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(values),    
            })
             //userRequest
            
             //Checks request status throws error message when needed.
            if(userRequest.status == 401)
            {
                throw new Error("Invalid Credentials, Please Try Again")
            }
            else if (userRequest.status == 200)
            {
                const data = await userRequest.json()
                
                setColor("alert alert-success")
                setError("User Logged In")

                //Set a session cookie
                setCookie("access_token", data["user"]["access_token"], {maxAge: 60 * 60 * 24 })
                setCookie("refresh_token", data["user"]["refresh_token"], {maxAge: 60 * 60 * 24 })
                setCookie("email", data["user"]["email"], {maxAge: 60 * 60 * 24 })
                window.location.reload();
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
    return (
        <div>
            <div id="response" className="mb-4">
                    {error && 
                        <div role="alert" className={status}>
                        <span>{error}</span>
                    </div>
                    }
            </div>
            <form className="grid gap-2" onSubmit={submitForm}>
                <label>Email:</label>
                <input type="text" name="email" placeholder="email@gmail.com" className="input input-bordered w-full max-w-xs" required />
                <label>Password:</label>
                <input type="text" name="password" placeholder="Password" className="input input-bordered w-full max-w-xs" required />
                <input type="submit" className="btn btn-active btn-neutral" value={"Login"}/>
            </form>
        </div>
    )
}