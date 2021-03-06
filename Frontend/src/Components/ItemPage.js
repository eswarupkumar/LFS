import React, {useState, useEffect} from 'react'
import Navbar from './Navbar'
import {LOGGED_IN, setConstraint} from '../constraints'
import Axios from 'axios'
function ItemPage(props) {
    const [Itemname,setItemname]=useState('')
    setConstraint(true)
    console.log(props.location.search.substring(1).split('=')[1].split('&')[0])
    // const dispatch = useDispatch()
    useEffect(()=>{
        const {location}=props
        Axios({
            url:`/item/${location.search.substring(1).split('=')[1].split('&')[0]}`,
            method:'GET'
        })
        .then((response)=>{
            console.log(response.data.Item[0])
            const data=response.data.Item[0]
            setItemname(data.name)
        })
        .catch((err) => {
            console.log("Error :", err);
          });
    },[])
    return (
        <>
            <Navbar/>
            <h2>{Itemname}</h2>
        </>
    )
}

export default ItemPage
