import React, { useEffect, useState } from "react";
import {LOGGED_IN, setConstraint} from "../constraints";
import Navbar from "../Components/Navbar";
import Axios from "axios";
import {
  Card,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";

export default function Feed() {
  // console.log("Status :", LOGGED_IN)
  setConstraint(true)
  // console.log(constraint.LOGGED_IN);
  const [item, setitem] = useState("");
  useEffect(()=>{
    console.log('Test')
    Axios({
      url: "/getitem",
      method: "GET",
    })
      .then((response) => {
        // console.log(response.data.postitems);
        // console.log(response);
        let data = response.data.postitems;
        let items = [];
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
          var time =
            date + "," + month + " " + year + " " + hour + ":" + min
  
            // category.postitem.findOne({createdBy: item.createdBy}).populate('name')
            // .exec(function (err, story) {
            //   if (err) return err
            //   console.log('The author is %s', story);
            //   // prints "The author is Ian Fleming"
            // });
  
          items.push(
            <a href={`/${item.name}?cid=${item._id}&type=${item.type}`}><Col key={item.name} style={{ marginTop: "2%" }} md={3} >
              {/* <li key={item.name}>{item.name}</li>
              <li key={item.description}>{item.description}</li> */}
              <Card style={{ width: "18rem" }}>
                {/* <Card.Img variant="top" src="holder.js/100px180?text=Image cap" /> */}
                <Card.Body>
                  <Card.Title>Item :{item.name}</Card.Title>
                  <Card.Text>Type :{item.type}</Card.Text>
                  {item.description ? (
                    <Card.Text>Description :{item.description}</Card.Text>
                  ) : (
                    ""
                  )}
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
            </Col></a>
          );
        });
        setitem(items);
      })
      .catch((err) => {
        console.log("Error :", err);
      });
  },[])

  return (
    <div>
      <div>
        <Navbar />
        <h1 style={{ color: "white" }}>Welcome !</h1>
      </div>
      <Container fluid>
        <Row>{item}</Row>
      </Container>
    </div>
  );
}
