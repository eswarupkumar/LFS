import React,{useState} from 'react';
import '../css/Signup.css'
import axios from 'axios'
import { Redirect, useHistory } from "react-router-dom"
import Navbar from '../Components/Navbar'

// export default let [user,setUser]=useState(false)

function Login() {
    let [info,setinfo]=useState('')
    
    const history = useHistory()
    function login(){
        // console.log(setinfo)
        var payload={
            username:document.getElementById('username').value,
            password:document.getElementById('password').value
        }
        axios({
            url:'/login',
            method:'POST',
            data:payload,
            withCredentials: true,
            credentials:"include"
            // url: "http://localhost:5000/login"
        })
        .then(response => { 
            // console.log("Response is :",response)
            if(response.data.user){     //Authentication done.
                console.log(response)
                localStorage.setItem("token",response.data.jwt_token)
                history.push('/feed')
            }
            else{
                setinfo(response.data)
            }
            console.log("Response :",response)
        })
        .catch(error => {
            console.log(error)
            console.log("Error occured")
        });
        // .then((response)=>{
        //     console.log('Login Data sent')
        //     this.setState({
        //         info:response.data
        //     })
        //     // this.props.history.push('/feed')
        // })
        // .catch(()=>{
        //     console.log('Error occured')
        // })
    }
    
    // login = () => {
        
    //     axios({
    //       method: "POST",
    //       data: {
    //         username: document.getElementById('username').value,
    //         password: document.getElementById('password').value,
    //       },
    //       withCredentials: true,
    //       url: " http://localhost:5000/login",
    //     })
    //     .then((res) => console.log(res))
    //     .catch((err)=>console.log(err));
    //   };
    
        return (
            <>
                <Navbar/>
                <div>
                <form className="Box" >
                    <h1>Log in</h1>
                    <p style={{color:'white'}}>{info}</p>
                    <input type="text" name="username" id='username' placeholder="User Name" required  />
                    <input type="password" placeholder="Password" id="password" name="password" required  />
                    {/* <input type="submit" placeholder="Submit"></input> */}
                    <button type="button" className='submit' onClick={login}>Submit</button>
                    <p style={{color:"white"}}>Don't have an account? <a style={{color:"black"}} href='/sign-up'>Click here</a></p>
                </form>
                </div>
            </>
        )
    }


export default Login

