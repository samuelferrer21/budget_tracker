
import Image from "next/image";
import Navbar from "@/components/navbar";
import  React, { useEffect, useState } from "react";
import HomepageSignup from "@/components/homepage/signup";
import Content from "@/components/homepage/content";





export default async function Home() {
  // useEffect(() => {
  //   fetch("http://localhost:3001/").then( 
  //     response => response.json()
  //   ).then(
  //     serverdata => {
  //       console.log(serverdata)
  //     }
  //   )
  // },
  // //Prevents useEffect running multiple times.
  // [])

  
  return (
    <main className="">
      <section>
        <Navbar/>
        <HomepageSignup/>
        <section id="details">
          <Content/>

        </section>

      </section>
      
    </main>
  );
}
