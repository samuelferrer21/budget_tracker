'use client'
import React from "react";

export interface props {
    title: string;
    id: string;
    data: React.ReactNode;
  }

export default function Modal( props: props ) { 
    console.log(props.title)

    return (
        <div>
            <button className=" text-white"  onClick={() => (document.getElementById(props.id) as HTMLFormElement).showModal()}>{props.title}</button>
            <dialog id={props.id} className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{props.title}</h3>
                    {props.data}
                    <div className="modal-action">
                    <form method="dialog">
                        <button className="btn">Close</button>
                    </form>
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>

        </div>
        
    );
}

