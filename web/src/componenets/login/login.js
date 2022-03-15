import React, { useState } from "react";
import './login.css'
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Login() { 

    const navigate = useNavigate();

    const [user, setUser] = useState({
        username: '',
        password: ''
    });

    const submitForm = async (event) => {
        event.preventDefault();
        // if(user.username === '' || user.password === '') return;
        const userData = await fetch("http://localhost:4000/login", {
            method: "POST", 
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });

    
        const { jwt: token } = await userData.json();

        if(!token) {
            toast.error("Invalid credentials");
            return;   
        }

        localStorage.setItem('auth-token', token);

        navigate('/app/home');
        // <Navigate to='/app/home'/>
    }

    const onUserChange = (e) => {
        setUser({
            ...user,
            username: e.target.value
        })
    }

    const onPasswordChange = (e) => {
        setUser({
            ...user,
            password: e.target.value
        });
    }

    return (
        <div className="wrapper">
            <div className="login-box">
                <div className="portfolio-info">
                    <form onSubmit={submitForm}>
                        <div className="mb-4">
                            <div className="mb-3">
                                <label className="form-label">Username</label>
                                <input autoComplete="current-password" onChange={onUserChange} value={user.username || ""} type="text" className="form-control" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Password</label>
                                <input autoComplete="current-password" onChange={onPasswordChange} value={user.password || ""} type="password" className="form-control" />
                            </div>
                        </div>

                        {/* <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                        </div> */}
                        <button type="submit" className="login-button mt-2">Submit</button>
                    </form>
                </div>
                <ToastContainer draggable={false} autoClose={5000} />
            </div>
        </div>
    );
}