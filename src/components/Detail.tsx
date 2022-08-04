import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

function Detail() {
  return (
    <Container>
      <h1>Title</h1>
      <div className="d-flex align-items-baseline justify-content-start">
        <span className="me-3">Date</span>
        <span className="me-3">Author</span>
        <a href="#" className="me-3">
          Link
        </a>
        <Badge pill bg="info">
          12
        </Badge>
      </div>
      <Stack gap={2} className="mt-3">
        <div className="border p-2">
          <Button variant="primary" size="sm" className="me-3">
            Обновить
          </Button>
          <Link to="../">Вернуться к списку</Link>
        </div>
        <div className="border p-2">Comments</div>
      </Stack>
    </Container>
  );
}

export default Detail;
