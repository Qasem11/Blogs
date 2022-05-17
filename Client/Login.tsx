import * as React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Router } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "./userContext";

function Login() {
  const { username, setUsername } = useContext(UserContext);
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState(null);
  const [pass, setPass] = useState(null);

  const handleChangeUser = (e) => {
    setUser(e.target.value);
  };

  const handleChangePass = (e) => {
    setPass(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const reqData = {
      username: user,
      password: pass,
    };
    let request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqData),
    };
    fetch("http://localhost:5000/auth/sign-in", request)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.length);
        if (data) {
          setUsername(data.username);
          setEmail(data.email);

          localStorage.setItem("userName", data.username);

          console.log(localStorage.getItem("userName"));
          window.location.assign("/");
        } else {
          document.getElementById("errormsg").innerHTML =
            "username or password is incorrect";
          console.log("username or password is incorrect");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="FormContainer">
      <div className="FormC">
        <Form className="Form" onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={username}
              placeholder="Enter username"
              onChange={handleChangeUser}
            />
          </Form.Group>
          <br />
          <Form.Group
            className="mb-3"
            controlId="formBasicPassword"
            onChange={handleChangePass}
          >
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" name="pass" placeholder="Password" />
          </Form.Group>
          <p id="errormsg"></p>

          <Row>
            <Col sm={8}>
              <Button variant="outline-success" type="submit">
                Login
              </Button>
            </Col>

            <Col>
              <Link to={"/Signup"}>
                <Button variant="outline-primary">Sign up</Button>
              </Link>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}

export default Login;
