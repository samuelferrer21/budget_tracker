import React from "react";

export default function Nabar() {
    return (
        <div className="navbar bg-neutral">
            <div className="navbar-start">
                <a className="btn btn-ghost text-xl">daisyUI</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                <li><a>Item 1</a></li>
                <li><a>Item 3</a></li>
                <li><a>Item 3</a></li>
                <li><a>Item 3</a></li>
                <li><a>Item 3</a></li>
                <li><a>Item 3</a></li>
                </ul>
            </div>
            <div className="navbar-end">
                <a className="btn">Button</a>
            </div>
        </div>
    )
}
