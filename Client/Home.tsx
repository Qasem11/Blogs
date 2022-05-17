import * as React from "react";
import { Form, Button, Row, Col, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, Redirect } from "react-router-dom";

import { any } from "prop-types";
import Blog from "./Component/Blog";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./userContext";

function Home() {
  const [Blogs, setBlogs] = useState([]);
  const { username, setUsername } = useContext(UserContext);

  useEffect(() => {
    const fetchBlogs = async () => {
      let request = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      fetch("http://localhost:5000/post", request)
        .then((res) => res.json())
        .then((data) => {
          setBlogs(data);
        })
        .catch((err) => console.log(err));
    };
    fetchBlogs();
  }, [2000]);

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

      <Blog blogs={Blogs}></Blog>
    </div>
  );
}

export default Home;
