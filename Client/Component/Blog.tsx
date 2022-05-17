import * as React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import BlogCard from "./BlogCard";
import { string } from "prop-types";

class Blog extends React.Component<any, any> {
  render() {
    return (
      <div className="blogs">
        {this.props.blogs.map((p) => (
          <BlogCard Blog={p} />
        ))}
      </div>
    );
  }
}

export default Blog;
