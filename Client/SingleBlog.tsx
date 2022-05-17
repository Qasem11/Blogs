import * as React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { string } from "prop-types";
import { useContext, useState } from "react";
import { UserContext } from "./userContext";
import { useEffect } from "react";

function SingleBlog() {
  const path = location.hash.split("/")[1];
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [author, setAuthor] = useState("");

  const { username, setUsername } = useContext(UserContext);

  useEffect(() => {
    const fetchBlog = async () => {
      let request = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      fetch(`http://localhost:5000/post/${path}`, request)
        .then((res) => res.json())
        .then((data) => {
          setTitle(data.title);
          setDesc(data.description);
          setAuthor(data.user.username);
        })
        .catch((err) => console.log(err));
    };
    fetchBlog();
  }, [path]);

  const handleDelte = () => {
    let reqData = {
      _id: path,
    };
    let request = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqData),
    };
    fetch(`http://localhost:5000/post/${path}`, request)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
    window.location.assign("/");
  };

  return (
    <div>
      <div className="header">
        <div className="headerTitles">
          <span className="headerTitleSm">COE 453</span>
          <span className="headerTitleLg">Blog</span>
        </div>
        <img
          className="headerImg"
          src="https://images.pexels.com/photos/1167355/pexels-photo-1167355.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          alt=""
        />
      </div>
      <div className="title">{title}</div>
      <div className="author">{author}</div>
      <div className="desc">{desc}</div>
      {username == author ? (
        <button className="" onClick={handleDelte}>
          Delete
        </button>
      ) : null}

      <button>Edit</button>
    </div>
  );
}

export default SingleBlog;
