import * as React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { useState } from "react";

function Signup() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(null);
  const [pass, setPass] = useState(null);

  const handleChangeU = (e) => {
    setUser(e.target.value);
  };
  const handleChangeE = (e) => {
    setEmail(e.target.value);
  };
  const handleChangeP = (e) => {
    setPass(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (user != null && email != null && pass != null) {
      const reqData = {
        username: user,
        password: pass,
        email: email,
      };
      let request = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqData),
      };
      fetch("http://localhost:5000/auth/sign-up", request)
        .then((res) => res.json())
        .then((data) => {
          window.location.assign("/");
        })
        .catch((err) => console.log(err));
    } else {
      document.getElementById("error").innerHTML = "something went wrong";
    }
  };
  return (
    <div className="FormContainer">
      <div className="FormC">
        <Form className="Form" onSubmit={handleSubmit}>
          <Form.Group
            className="mb-3"
            controlId="formBasicUser"
            onChange={handleChangeU}
          >
            <Form.Label>Username</Form.Label>
            <Form.Control type="txt" placeholder="Enter username" />
          </Form.Group>

          <Form.Group
            className="mb-3"
            controlId="formBasicEmail"
            onChange={handleChangeE}
          >
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
          </Form.Group>

          <Form.Group
            className="mb-3"
            controlId="formBasicPassword"
            onChange={handleChangeP}
          >
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <p id="error"></p>
          <Button variant="outline-success" type="submit">
            Sign up
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Signup;
