import React from "react";
import Navbar from "./Navbar";
import "../css/landing.css";
import image from "../img/undraw_lost_bqr2.svg";
import '../Components/Lost_item'
export default function Home() {

  const postitem=()=>{
    if(localStorage.getItem('user')!==null){
      console.log("User already logged in !")
    }
    else{
      console.log("Not logged in")
    }
  }

  return (
    <>
      <Navbar />
      <div className="main">
        <div className="intro">
          <div className="part-1">
            <div className="title">
              <h1>Lost and Found</h1>
              <p>Lost it. List it. Find it.</p>
            </div>
          </div>
          <div className="part-2">
            <div className="image">
              <img
                src={image}
                style={{ width: "450px", height: "450px" }}
                alt=""
              />
            </div>
          </div>
        </div>
        <div className="post-item">
          <button class="button" onClick={postitem}>Post Item</button>
        </div>        
      </div>
      <div className="About">
        <div>
          <h1>About the project</h1>
          <p>
            
          </p>
        </div>
      </div>
    </>
  );
}
