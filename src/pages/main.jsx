/* 
import { Auth } from "aws-amplify";
import Dashboard from "./dashboard/dashboard"
import Home from "./home/home";
import React, { useState, useEffect } from 'react';

function Main() {
    const [isLog, setState] = useState(0);

    useEffect(() => {
        async function isLogUser() {
            try {
                await Auth.currentAuthenticatedUser();
                setState(true)
            } catch {

                setState(false);
            }
        }
        isLogUser();
    }, [])


    return (

        <div className="home"> {isLog ? <Dashboard /> : <Home />} </div>

    );
} */



export default Main;