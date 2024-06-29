'use client'
import Link from "next/link";
import NavBarItems from "./navbaritems";
import useSupabase from "@/hooks/useSupabase";
import { useEffect, useState } from "react";



export default function Navbar() {
    //Chech if user is logged in
    const [status, setStatus] = useState(false)
    useEffect(() => {
    async function checkSession() {
        const supabase = useSupabase()
        let exists = null
         const jwt = ((await supabase.auth.getSession()).data.session?.access_token);
         const {data, error} = await supabase.auth.getUser(jwt)
    
        if (error != null) {
        
        exists = false;
        } else {
        exists = true;
        }
    
        await setStatus(exists)
      }
      checkSession()
    })

    //Items for detected user
    const userSignedIn = [
        {name: "Dashboard", Value: "/dashboard"},
        {name: "Budget", Value: "/budget"},
        {name: "Networth", Value: "#networth"},
        {name: "Interest Calculator", Value: "#calculator"},
        {name: "Signout", Value: "#signout"}
    ]
    //Maps the list items for Navbar when user is detecte
    const userDetected = userSignedIn.map(item => (
        <li key={item.Value}><Link href={item.Value}>{item.name}</Link></li>
    ));

    return (
        <div className="navbar bg-base-100 shadow-xl">
            <div className="navbar-start">
                <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </div>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-neutral rounded-box w-52">
                    { 
                        status ? (userDetected) : (<NavBarItems id="mobileModal"/>)
                    }
                </ul>
                </div>
            <a className="btn btn-ghost text-xl">daisyUI</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {/* Conditional that detects if the user is detected */}

                    {status ? (userDetected) : (<NavBarItems id="desktopModal"/>) }
                </ul>
            </div>
        </div>
    )
}
