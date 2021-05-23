import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { setConstraint } from "../constraints";
import Navbar from "../Components/Navbar";
import Axios from "axios";
import { Card, Col, Container, Row } from "react-bootstrap";

export default function Feed() {
  // console.log("Status :", LOGGED_IN)
  // const [user_info,setuser_info]=useState(localStorage.getItem("user"))
  // const [user_info,setuser_info]=useState(localStorage.getItem('user'))
  const [user_info, setuser_info] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  // const [user_info,setuser_info]=useState('')
  // console.log(user_info)

  // const location = useLocation();
  // useEffect(()=>{
  //   if(location.user==null){
  //     console.log("if statement",user_info)
  //     // location.user=''
  //   }
  //   else{
  //     // console.log("Else",user_info)
  //     console.log(location.user)
  //     setuser_info(location.user)
  //     console.log(user_info)
  //     // console.log("Else statement",user_info)
  //   }
  // },[])
  // useEffect(()=>{
  //   console.log(location.user)
  //   localStorage.setItem('user',JSON.stringify(location.user))
  //   setuser_info((localStorage.getItem('user')))
  // },[])
  // console.log("User info is :", location.user);
  setConstraint(true);
  // var user_info
  // if(NEW_USER===false){
  //   user_info=location.user
  //   setUser(true)
  // }
  // console.log(constraint.LOGGED_IN);
  const [item, setitem] = useState("");
  const [Found_item, setFound_item] = useState();
  useEffect(() => {
    // console.log("Test");
    Axios({
      url: `/mylistings/${JSON.parse(localStorage.getItem("user"))._id}`,
      method: "GET",
    })
      .then((response) => {
        // console.log(response.data.postitems);
        // console.log(response);
        let data = response.data.item;
        console.log(response.data);
        let items = [];
        let Found_items = [];
        data.reverse().map((item) => {
          let created_date = new Date(item.createdAt);
          // console.log(date.toString());
          var months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ];
          var year = created_date.getFullYear();
          var month = months[created_date.getMonth()];
          var date = created_date.getDate();
          var hour = created_date.getHours();
          var min = created_date.getMinutes();
          // var sec = created_date.getSeconds();
          var time = date + "," + month + " " + year + " " + hour + ":" + min;

          // category.postitem.findOne({createdBy: item.createdBy}).populate('name')
          // .exec(function (err, story) {
          //   if (err) return err
          //   console.log('The author is %s', story);
          //   // prints "The author is Ian Fleming"
          // });
          // console.log(item.itemPictures[0].img)

          // let user = false;
          // if (item.createdBy === user_info._id) {
          //   user = true;
          // }
          // console.log("Lost item "+user+item.name)
          items.push(
            <a href={`/${item.name}?cid=${item._id}&type=${item.type}/true`}>
              <Col key={item.name} style={{ marginTop: "2%" }} md={3}>
                {/* <li key={item.name}>{item.name}</li>
                <li key={item.description}>{item.description}</li> */}
                <Card style={{ width: "17rem", border: "2px solid black" }}>
                  <Card.Img
                    variant="top"
                    src={`http://localhost:5000/${item.itemPictures[0].img}`}
                  />
                  <Card.Body>
                    <Card.Title>Item :{item.name}</Card.Title>
                    {/* <Card.Text>Type :{item.type}</Card.Text> */}
                    {item.description ? (
                      <Card.Text>Description :{item.description}</Card.Text>
                    ) : (
                      ""
                    )}
                    <Card.Text>Type : {item.type}</Card.Text>
                    <Card.Text>Created at : {time}</Card.Text>
                    {/* <Card.Text>
                      Created by :{item.createdBy}
                    </Card.Text> */}
                  </Card.Body>
                  {/* <ListGroup className="list-group-flush">
                    <ListGroupItem>Cras justo odio</ListGroupItem>
                    <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
                    <ListGroupItem>Vestibulum at eros</ListGroupItem>
                  </ListGroup>
                  <Card.Body>
                    <Card.Link href="#">Card Link</Card.Link>
                    <Card.Link href="#">Another Link</Card.Link>
                  </Card.Body> */}
                </Card>
              </Col>
            </a>
          );

          // var user1 = false;
          // if (item.createdBy === user_info._id) {
          //   user1=true
          // }
          // console.log("Lost item "+user1+item.name)
        });
        setitem(items);
        setFound_item(Found_items);
      })
      .catch((err) => {
        console.log("Error :", err);
      });
  }, []);

  return (
    <div>
      <div>
        <Navbar />

        <h2>My Listings</h2>
      </div>
      <div>
        <Container fluid>
          <Row>{item}</Row>
        </Container>
      </div>
    </div>
  );
}
