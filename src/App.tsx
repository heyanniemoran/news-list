import React from "react";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Container>
      <div className="py-3">
        <Button variant="primary">Reload news list</Button>
      </div>
      <ListGroup numbered>
        <ListGroup.Item
          action
          href="#"
          className="d-flex justify-content-start align-items-start"
        >
          <div className="d-flex flex-column ms-3">
            <h5>News Title</h5>
            <div className="d-flex justify-content-start align-items-start">
              <div className="me-3">Rating</div>
              <div className="me-3">Author</div>
              <div>Date</div>
            </div>
          </div>
        </ListGroup.Item>
      </ListGroup>
    </Container>
  );
}

export default App;
