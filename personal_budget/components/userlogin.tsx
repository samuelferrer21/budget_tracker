'use client'
import React from "react";
import { useState } from "react";
import useSupabase from "@/hooks/useSupabase";
import { use } from "react";


export default function Login() {
    const supabase = useSupabase();
    const [status, setColor] = useState("");
    //Trackstate of flash message 
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)

    //Post user data
    const submitForm = (event: React.FormEvent<HTMLFormElement>) => {
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
        //Sign in
        const { data, error } =  supabase.auth.signInWithPassword({
            email: values['email'],
            password: values['password'],
            }).then(response => {
            if(response.error)
            {
                throw new Error(response.error.message)
            }
            else
            {
                setError("User Successfully Logged In")
                setColor("alert alert-success") 
                //Refresh page
                window.location.reload();
            }
            }).catch(error => {
                //Sets the alert message
                setError(error.message)
                //Sets the alert colour and style
                setColor("alert alert-error")
            });

        
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