import * as React from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../userContext";

function BlogCard({ Blog }) {
  const [ID, setID] = useState(Blog._id);
  const { username, setUsername } = useContext(UserContext);
  const path = `/${ID}`;

  return (
    <div className="BlogCard">
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>{Blog.title}</Card.Title>
          <Card.Text>{Blog.description}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <Card.Text>By {Blog.user.username}</Card.Text>
          <Link to={path}>
            <Button>enter</Button>
          </Link>
        </Card.Footer>
      </Card>
    </div>
  );
}

export default BlogCard;
