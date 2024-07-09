'use client'
import React from "react";

export interface props {
    title: string;
    id: string;
    svg: string;
    svg_path: string;
    data: React.ReactNode;

  }

export default function ModalImageButton( props: props ) { 
    return (
        <div>
            <div>
                <svg
                    onClick={() => (document.getElementById(props.id) as HTMLFormElement).showModal()}
                    xmlns= {props.svg}
                    className="h-6 w-6 hover:stroke-neutral-content"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1"
                    d={props.svg_path} />
                </svg>
            </div>
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

