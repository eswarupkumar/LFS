import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Navbar from "./Navbar";
// import { Carousel } from "react-bootstrap";
import { LOGGED_IN, setConstraint } from "../constraints";
import Axios from "axios";
import { Button, Modal, Form } from "react-bootstrap";

function ItemPage(props) {
  const [Itemname, setItemname] = useState("");
  // const [PhoneNumber, setPhoneNumber] = useState();
  const [Createdby, setCreatedby] = useState("");
  const [show, setShow] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  // const [showNumber, setShowNumber] = useState(false);
  const [validateUser,setvalidateUser]=useState(false)
  const [Question, setQuestion] = useState(false);
  const [alreadyAnswered, setalreadyAnswered] = useState(false);
  const [showQuestion, setshowQuestion] = useState(false);
  const [answer, setAnswer] = useState("");
  const [itemname, setitemname] = useState("");
  const [description, setdescription] = useState("");
  const [itemquestion, setitemquestion] = useState("");
  const [itemimage, setitemimage] = useState("");
  const [type, settype] = useState("");
  const [messageId, setmessageId] = useState("");
  const [response, setResponse] = useState("");
  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);
  const handleCloseprompt = () => setvalidateUser(false);
  const handleShowprompt = (id,answer) => {
    console.log("Selected message ID is :",id)
    console.log("Answer is :",answer)
    setmessageId(id)
    setResponse(answer)
    setvalidateUser(true)
  };
  const handleCloseQuestion = () => setQuestion(false);
  const handleShowQuestion = () => setQuestion(true);
  const handleShow = () => setShow(true);

  const history = useHistory();
  setConstraint(true);
  // console.log(props.location.search.substring(1).split("=")[1].split("&")[0]);
  // console.log(props.location.search.substring(1).split("=")[2].split("/")[0]);
  const item_type = props.location.search
    .substring(1)
    .split("=")[2]
    .split("/")[0];
  const item_id = props.location.search
    .substring(1)
    .split("=")[1]
    .split("&")[0];
  // console.log(
  //   "Is this item created by the current user :",
  //   props.location.search.substring(1).split("/")[1]
  // );
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
        // console.log(response.data);
        const data = response.data.Item[0];
        const answers=response.data.Answers;
        console.log(answers)
        answers.forEach(ans => {
          if(JSON.parse(localStorage.getItem('user'))._id === ans.givenBy){
            console.log("Present")
            setalreadyAnswered(true)
            console.log(alreadyAnswered)
          }
          console.log("User ID is :",JSON.parse(localStorage.getItem('user'))._id)
          console.log("Given by :",ans.givenBy)
        });
        setitemname(data.name);
        setdescription(data.description);
        setitemquestion(data.question)
        settype(data.type);
        setCreatedby(data.createdBy);
        setitemimage(data.itemPictures);
        // console.log(data.itemPictures);
        temp.push(
          <div>
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
                <div>
                  <h2>Your Question :</h2>
                  <h3>{data.question}</h3>
                </div>
                <div>
                  <h2>Answers Submitted :</h2>
                  {answers.length===0 ? (<h3>
                    No Answers Yet.
                  </h3>) : (
                    <>
                    {answers.map((answer)=>(
                      
                      <div>
                        <p>{answer.answer}</p>
                        {answer.response==='Moderation'?(
                          <div>
                            <Button variant="danger"    onClick={()=>handleShowprompt(answer._id,'No')}>No</Button>
                            <Button variant="primary"   onClick={()=>handleShowprompt(answer._id,'Yes')}>Yes</Button>
                          </div>
                        ):(
                          <p>Already Submitted</p>
                        )} 
                      </div>
                    ))}
                    </>
                  )}
                  {/* <h2>{answers.length}</h2> */}
                </div>
              </div>
            ) : (
              <div>
                {alreadyAnswered?(
                  <>
                    <Button variant="secondary" disabled onClick={handleShowQuestion}>{data.type==='Lost'?'Found Item':"Claim Item"}</Button>                    
                  </>
                ):(
                  <>
                    <Button variant="primary" onClick={handleShowQuestion}>{data.type==='Lost'?'Found Item':"Claim Item"}</Button>
                  </>
                )}
              </div>
            )
            }
          </div>
        );
        setItemname(temp);
        // return data;
      })
      .catch((err) => {
        console.log("Error :", err);
      });
  }, [alreadyAnswered]);
  const submitResponse=()=>{
    // console.log(e.target.value)
    Axios({
      url:`confirmResponse/${messageId}`,
      method:"POST",
      data:{'response':response}
    })
    .then((res)=>{
      console.log(res)
      window.location.reload();
    })
    .catch((err)=>{
      console.log(err)
    })
    handleCloseprompt(true)
  }
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
  const handleEdit = () => {
    Axios({
      url: "/edititem",
      method: "POST",
      data: {
        id: item_id,
        name: itemname,
        description: description,
        type: type,
        createdBy: Createdby,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    setShow(false);
  };
  // const show_number = () => {
  //   console.log("Number Shown");
  //   const { location } = props;
  //   Axios({
  //     url: `/getnumber/${
  //       location.search.substring(1).split("=")[1].split("&")[0]
  //     }`,
  //     method: "GET",
  //   })
  //     .then((response) => {
  //       console.log(response.data.Number);
  //       setPhoneNumber(response.data.Number);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  //   // handleCloseNumber()
  // };
  const show_question = () => {
    // console.log("Number Shown");
    setshowQuestion(true)
  };
  const submitAnswer=()=>{
    Axios({
      url:'/submitAnswer',
      method:'POST',
      data:{
        itemId:item_id,
        question:itemquestion,
        answer:answer,
        givenBy:JSON.parse(localStorage.getItem('user')),
        belongsTo:Createdby
      },
    })
    .then((res) => {
      console.log(res);
      handleCloseQuestion()
      window.location.reload()
    })
    .catch((err) => {
      console.log(err);
    });
    setAnswer('')
  }

  return (
    <>
      <Navbar />
      {/* Image carousel */}
      {/* <Carousel>
        
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="http://commondatastorage.googleapis.com/codeskulptor-assets/lathrop/asteroid_blend.png"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="http://commondatastorage.googleapis.com/codeskulptor-assets/lathrop/asteroid_blend.png"
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="http://commondatastorage.googleapis.com/codeskulptor-assets/lathrop/asteroid_blend.png"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel> */}
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
      <Modal show={validateUser} onHide={handleCloseprompt} backdrop="static">
        <Modal.Body>
          <p>Once submitted you can not undo. Are you sure ? </p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={()=>handleCloseprompt(true)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={submitResponse}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={Question} onHide={handleCloseQuestion} backdrop="static">
        {showQuestion ? (
          <div>
            <Modal.Body>
              <Form.Group>
                <Form.Label>{itemquestion}</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Enter Answer"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleCloseQuestion}>
                Close
              </Button>
              <Button variant="primary" onClick={submitAnswer}>
                Submit
              </Button>
            </Modal.Footer>
          </div>
        ) : (
          <div>
            <Modal.Body>
              <p>Are you sure you found the item? </p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleCloseQuestion}>
                No
              </Button>
              <Button variant="danger" onClick={show_question}>
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
                <Form.Label>Enter a question based on the item</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ex:- What is the color of the phone ?"
                  value={itemquestion}
                  onChange={(e) => setitemquestion(e.target.value)}
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
    </>
  );
}

export default ItemPage;
