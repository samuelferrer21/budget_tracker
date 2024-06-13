'use client'
import React from "react";
export default function Modal() {
    return (
        <div>
            <button className=" text-white"  onClick={() => (document.getElementById('myModal') as HTMLFormElement).showModal()}>Sign up</button>
            <dialog id="myModal" className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Hello!</h3>
                    <p className="py-4">Press ESC key or click the button below to close</p>
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
        
    )
}