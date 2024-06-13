import Link from "next/link";
import React from "react";

export default function Navbar() {
    //List of options not logged in
    const nonLogged = [
        {name: "Sign Up", Value: "#signup"},
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

    const testing = false

    return (
        <div className="navbar bg-neutral">
            <div className="navbar-start">
                <a className="btn btn-ghost text-xl">daisyUI</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {/* Conditional that detects if the user is detected */}
                    {testing ? userDetected : list  }
                </ul>
            </div>
            <div className="navbar-end">
                <a className="btn">Button</a>
            </div>
        </div>
    )
}
