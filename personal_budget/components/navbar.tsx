import Link from "next/link";
import React from "react";
import Modal from "./modal";

export default function Navbar() {
    //List of options not logged in
    const nonLogged = [
        {name: "Login", Value: "#login"},
        {name: "About", Value: "#about"}
    ]
    //Maps the list items for the Navbar
    const list = nonLogged.map(item => (
        <li key={item.Value}><Link href={item.Value}>{item.name}</Link></li>
    ));
    //Items for detected user
    const userSignedIn = [
        {name: "Dashboard", Value: "#dashboard"},
        {name: "Budget", Value: "#bduget"},
        {name: "Networth", Value: "#networth"},
        {name: "Interest Calculator", Value: "#calculator"}
    ]
    //Maps the list items for Navbar when user is detecte
    const userDetected = userSignedIn.map(item => (
        <li key={item.Value}><Link href={item.Value}>{item.name}</Link></li>
    ));

    //Conditional to detect if a user is detected or not
    const testing = false

    return (
        <div className="navbar bg-base-100 shadow-xl">
            <div className="navbar-start">
                <div className="dropdown">
                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                </div>
                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-neutral rounded-box w-52">
                    <li className="sm:blo"><Modal/></li>
                    {testing ? userDetected : list  }
                    
                </ul>
                </div>
            <a className="btn btn-ghost text-xl">daisyUI</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {/* Conditional that detects if the user is detected */}
                    <li><Modal/></li>
                    {testing ? userDetected : list  }
                </ul>
            </div>
        </div>
    )
}
