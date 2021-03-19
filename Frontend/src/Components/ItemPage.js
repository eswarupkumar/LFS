import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "./Navbar";
import { LOGGED_IN, setConstraint } from "../constraints";
import Axios from "axios";
import Lost_item from "../Components/Lost_item";
import { Button, Modal,Form } from "react-bootstrap";

function ItemPage(props) {
  const [Itemname, setItemname] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState();
  const [Createdby,setCreatedby]=useState('')
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showNumber, setShowNumber] = useState(false);
  const [itemname, setitemname] = useState("");
  const [description, setdescription] = useState("");
  const [itemimage, setitemimage] = useState("");
  const [type, settype] = useState("");
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);

  const handleCloseNumber = () => setShowNumber(false);
  const handleShowNumber = () => setShowNumber(true);
  const handleShow = () => setShow(true);

  const history = useHistory();
  setConstraint(true);
  console.log(props.location.search.substring(1).split("=")[1].split("&")[0]);
  const item_id = props.location.search
    .substring(1)
    .split("=")[1]
    .split("&")[0];
  console.log(
    "Is this item created by the current user :",
    props.location.search.substring(1).split("/")[1]
  );
  const current_user = props.location.search.substring(1).split("/")[1];
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
        setitemname(data.name)
        setdescription(data.description)
        settype(data.type)
        setCreatedby(data.createdBy)

        temp.push(
          <div style={{ color: "white" }}>
            <h2>Item name : {data.name}</h2>
            <h2>Item description : {data.description}</h2>
            <h2>Item type : {data.type}</h2>
            {/* <h2>{current_user}</h2> */}
            {current_user === "true" ? (
              <div>
                <Button variant="danger" onClick={handleShowDelete}>
                  Delete item
                </Button>
                <Button variant="primary" onClick={handleShow}>
                  Edit item
                </Button>
              </div>
            ) : (
              <Button variant="primary" onClick={handleShowNumber}>
                Claim item
              </Button>
            )}
          </div>
        );
        setItemname(temp);
        return data;
      })
      .catch((err) => {
        console.log("Error :", err);
      });
  }, []);
  const delete_item = () => {
    console.log("deleted");
    Axios({
      url: "/deleteitem",
      method: "POST",
      data: { item_id },
    })
      .then((response) => {
        console.log(response);
        handleCloseDelete();
        history.push("/feed");
      })
      .catch((err) => {
        console.log("Error");
      });
  };
  const handleEdit=()=>{
    Axios({
      url:'/edititem',
      method:'POST',
      data:{'id':item_id,'name':itemname,'description':description,'type':type,'createdBy':Createdby}
    })
    .then((res)=>{
      console.log(res)
    })
    .catch((err)=>{
      console.log(err)
    })
    setShow(false);  
  }
  const show_number = () => {
    console.log("Number Shown");
    const { location } = props;
    Axios({
      url: `/getnumber/${
        location.search.substring(1).split("=")[1].split("&")[0]
      }`,
      method: "GET",
    })
      .then((response) => {
        console.log(response.data.Number);
        setPhoneNumber(response.data.Number);
      })
      .catch((err) => {
        console.log(err);
      });
    // handleCloseNumber()
  };
  
  return (
    <>
      <Navbar />
      <div>{Itemname}</div>
      <Modal show={showDelete} onHide={handleCloseDelete} backdrop="static">
        <Modal.Body>
          <p>Are you sure ? </p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseDelete}>
            No
          </Button>
          <Button variant="danger" onClick={delete_item}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showNumber} onHide={handleCloseNumber} backdrop="static">
        {PhoneNumber ? (
          <div>
            <Modal.Body>
              <p>Here is the number : </p>
              <p>{PhoneNumber}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleCloseNumber}>
                Close
              </Button>
            </Modal.Footer>
          </div>
        ) : (
          <div>
            <Modal.Body>
              <p>Are you sure that it's your item? </p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleCloseNumber}>
                No
              </Button>
              <Button variant="danger" onClick={show_number}>
                Yes
              </Button>
            </Modal.Footer>
          </div>
        )}
      </Modal>
      <div>
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
                <Form.Control
                  as="select"
                  required={true}
                  defaultValue="Choose..."
                  value={type}
                  onChange={(e) => settype(e.target.value)}
                >
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
            <Button variant="primary" onClick={handleEdit}>
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      ;
    </>
  );
}

export default ItemPage;
