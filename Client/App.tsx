import * as React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter, Route, Link, Redirect } from "react-router-dom";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Button,
  Modal,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import { UserContext } from "./userContext";
import { useState } from "react";
import Write from "./Write";
import { useEffect } from "react";
import SingleBlog from "./SingleBlog";

function App() {
  const [username, setUsername] = useState("");

  const handleLogout = () => {
    setUsername(null);
    localStorage.removeItem("userName");
  };
  useEffect(() => setUsername(localStorage.getItem("userName")), [username]);
  return (
    <UserContext.Provider value={{ username, setUsername }}>
      <HashRouter>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Navbar.Brand href="#/">453Blog </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto" navbarScroll>
                <Nav.Link href="#/">Home</Nav.Link>
                {username == null ? null : (
                  <Nav.Link href="#/write">Write</Nav.Link>
                )}
              </Nav>
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end">
              <Nav>
                {username == null ? null : (
                  <Navbar.Text>Welcome {username}</Navbar.Text>
                )}
                {username == null ? (
                  <Nav.Link href="#/login">Log in</Nav.Link>
                ) : (
                  <Nav.Link href="#/" onClick={handleLogout}>
                    Log out
                  </Nav.Link>
                )}
                {username == null ? (
                  <Nav.Link href="#/signup">Sign up</Nav.Link>
                ) : null}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <div style={{ height: "100%" }}>
          <div style={{ height: "100%" }}>
            <Route exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/write" component={Write} />
            <Route exact path="/:postId" component={SingleBlog} />
          </div>
        </div>
      </HashRouter>
    </UserContext.Provider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
