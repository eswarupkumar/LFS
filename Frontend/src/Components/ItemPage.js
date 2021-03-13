import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { LOGGED_IN, setConstraint } from "../constraints";
import Axios from "axios";
function ItemPage(props) {
  const [Itemname, setItemname] = useState("");
  setConstraint(true);
  console.log(props.location.search.substring(1).split("=")[1].split("&")[0]);
  // const dispatch = useDispatch()
  const temp = [];
  useEffect(() => {
    const { location } = props;
    Axios({
      url: `/item/${location.search.substring(1).split("=")[1].split("&")[0]}`,
      method: "GET",
    })
      .then((response) => {
        console.log(response.data.Item[0]);
        const data = response.data.Item[0];
        temp.push(
          <div style={{color:"white"}}>
            <h2>Item name : {data.name}</h2>
            <h2>Item description : {data.description}</h2>
            <h2>Item type : {data.type}</h2>
          </div>
        );
        setItemname(temp);
      })
      .catch((err) => {
        console.log("Error :", err);
      });
  }, []);
  return (
    <>
      <Navbar />
      <div>{Itemname}</div>
    </>
  );
}

export default ItemPage;
