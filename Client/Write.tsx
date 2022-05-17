import * as React from "react";
import { Form, Button, Row, Col, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Redirect, Route } from "react-router-dom";
import { any } from "prop-types";
import Blog from "./Component/Blog";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./userContext";

function Home() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const { username, setUsername } = useContext(UserContext);

  const handleSend = (e) => {
    e.preventDefault();
    if (title == "" || desc == "") {
      document.getElementById("writeError").innerHTML =
        "the Title or the Description is missing";
    } else {
      const reqData = {
        title: title,
        image: "aa",
        description: desc,
        user: username,
      };
      let request = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqData),
      };
      fetch("http://localhost:5000/post", request)
        .then((res) => res.json())
        .then((data) => {})
        .catch((err) => console.log(err));
    }
    window.location.assign("/");
  };
  const handleChangeT = (e) => {
    setTitle(e.target.value);
  };

  const handleChangeD = (e) => {
    setDesc(e.target.value);
  };
  return (
    <div className="FormContainer">
      <div className="WriteFormC">
        <Form className="WriteForm">
          <Form.Group className="mb-3" onChange={handleChangeT}>
            <Form.Label>title</Form.Label>
            <Form.Control maxLength={50} value={title} />
          </Form.Group>
          <Form.Group onChange={handleChangeD}>
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} maxLength={250} value={desc} />
          </Form.Group>
        </Form>
        <Form.Text id="writeError"></Form.Text>

        <Button variant="primary" onClick={handleSend}>
          Send
        </Button>
      </div>
    </div>
  );
}

export default Home;
