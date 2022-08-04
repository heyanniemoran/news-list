import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  return (
    <Container>
      <div className="py-2">
        <Button variant="primary" size="sm">
          Reload news list
        </Button>
      </div>
      <ListGroup numbered>
        <ListGroup.Item className="d-flex">
          <Link
            to="detail"
            className="d-flex justify-content-start align-items-start"
          >
            <div className="d-flex flex-column ms-3">
              <h5>News Title</h5>
              <div className="d-flex justify-content-start align-items-start">
                <span className="me-3">Rating</span>
                <span className="me-3">Author</span>
                <span>Date</span>
              </div>
            </div>
          </Link>
        </ListGroup.Item>
      </ListGroup>
    </Container>
  );
}

export default Home;
