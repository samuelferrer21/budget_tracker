import React from "react";

export default function Login() {
    return (
        <div>
            <form>
                <label>Emaildsfdsf:</label>
                <input type="text" placeholder="email@gmail.com" className="input input-bordered w-full max-w-xs" required />
                <label>Password:</label>
                <input type="text" placeholder="Password" className="input input-bordered w-full max-w-xs" required />
                <input type="submit" className="btn btn-active btn-neutral" value={"Login"}/>
            </form>
        </div>
    )
}