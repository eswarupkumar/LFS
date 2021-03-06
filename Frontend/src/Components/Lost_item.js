import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Modal, Form } from "react-bootstrap";
function Lost_item() {
  const [show, setShow] = useState(false);

  const token = window.localStorage.getItem("token");

  const [itemname, setitemname] = useState("");
  const [description, setdescription] = useState("");
  const [itemimage, setitemimage] = useState("");
  const [type, settype] = useState("");


  const handleShow = () => setShow(true);
  const handleClose = () => {
    // const form = new FormData();
    // form.append("name", itemname);
    // form.append("description", description);
    // form.append('itemPictures',itemname)
    const payload = {
      name: itemname,
      description: description,
      type:type,
      itemPictures: itemimage,
    };
    axios({
      url: "http://localhost:5000/postitem",
      method: "POST",
      data: payload,
      headers: {
        Authorization: token ? `Bearer ${token}` : "",
      },
      withCredentials: true,
      credentials: "include",
      // url: "http://localhost:5000/login"
    })
      .then((response) => console.log(response))
      .then(() => {
        setitemname("");
        setdescription("");
        settype("")
        setitemimage("");
        console.log("Executed");
      })
      .catch((err) => console.log(err));

    setShow(false);
  };
  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Post Item
      </Button>

      <Modal
        show={show}
        onHide={() => setShow(false)}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Lost item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Item name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter item"
                value={itemname}
                onChange={(e) => setitemname(e.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setdescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Item type</Form.Label>
              <Form.Control as="select" required={true} defaultValue="Choose..." onChange={(e)=>settype(e.target.value)}>
                <option>Choose..</option>
                <option value={"Lost"}>Lost It</option>
                <option value={"Found"}>Found It</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.File
                type="file"
                id="formimage"
                label="Image input"
                onChange={(e) => setitemimage(e.target.files[0])}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Lost_item;
