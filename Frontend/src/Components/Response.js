import React, { useState,useEffect } from 'react';
import Navbar from "./Navbar";
import Axios from "axios";

function Response(){
    useEffect(()=>{
        Axios({
            url:`/myresponses/${JSON.parse(localStorage.getItem('user'))._id}`,
            method:'GET'
        }).then((res)=>{
            console.log(res)
        })
        .catch((err)=>{
            console.log(err)
        })
    },[])

    return(
        <>
            <Navbar/>
            <h1>Your response</h1>
        </>
    )
}

export default Response;