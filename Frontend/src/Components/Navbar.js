import React from "react";
import {LOGGED_IN, setConstraint} from "../constraints";
import "../css/Navbar.css";
import axios from "axios";
// import "bootstrap/dist/css/bootstrap.css";
import Lost_item from "./Lost_item";  
// import Login from './Login'
function Navbar() {
  const token = window.localStorage.getItem("token");
  // console.log(props)
  // console.log("Status :", LOGGED_IN)
  const signout = () => {
    // constraint.LOGGED_IN = false;
    setConstraint(false)

    console.log("Signed out !");
    axios({
      url: "/signout",
      method: "POST",
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
    })
      .then(localStorage.clear())
      .catch((error) => {
        console.log(error);
        console.log("Error occured");
      });
  };
  return (
    <>
      <div className="navbar">
        <a href="/">
          <div className="logo">
            <h2>Lost and Found</h2>
          </div>
        </a>
        <div
          style={LOGGED_IN ? { display: "none" } : {}}
          id="login"
          className="signin"
        >
          <ul>
            <a href="/sign-up">Sign-up</a>
          </ul>
          <ul>
            <a href="/log-in">Log-in</a>
          </ul>
        </div>
        <div
          style={LOGGED_IN ? {} : { display: "none" }}
          className="signin"
        >
          <Lost_item />
          {/* <Found_item /> */}
          <ul>
            {/* {props.name} */}
            <a onClick={signout} href="/log-in">
              Sign-out
            </a>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
