'use client'
import React from "react";
import Modal from "./modal";
import SignIn from "./usersignup";
import Login from "./userlogin";

export interface props {
    id: string;
  }

export default function NavBarItems(props: props){

    const signupModalTitle = "Sign up"
    const loginModalTitle = "Login"

    return (
        <div className="lg:flex">
            <li ><Modal id={props.id + "signup"} title ={signupModalTitle} data={<SignIn/>}/></li>
            <li ><Modal id={props.id + "login"} title ={loginModalTitle} data={<Login/>}/></li>
        </div>
        
    )
}