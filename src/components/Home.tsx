import React from "react";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useGetNewsListQuery } from "../newsApi";
import { FeedItem } from "../constants/FeedItem";

function Home() {
  const { data, error, isLoading, isSuccess, isError, refetch } =
    useGetNewsListQuery(undefined, {
      pollingInterval: 60000,
    });
  return (
    <Container>
      <div className="py-2">
        <Button variant="primary" size="sm" onClick={refetch}>
          Reload news list
        </Button>
      </div>
      {isLoading && <Spinner animation="border" />}
      {isSuccess && (
        <ListGroup numbered>
          {data &&
            data.map((item) => (
              <ListGroup.Item className="d-flex">
                <Link
                  to={`/${item.id}`}
                  className="d-flex justify-content-start align-items-start text-decoration-none"
                >
                  <div className="d-flex flex-column ms-3">
                    <h5>{item.title}</h5>
                    <div className="d-flex justify-content-start align-items-start text-dark">
                      <span className="me-4">{item.points}</span>
                      <span className="me-4">{item.user}</span>
                      <span>{item.time_ago}</span>
                    </div>
                  </div>
                </Link>
              </ListGroup.Item>
            ))}
        </ListGroup>
      )}
      {isError && (
        <Alert key="danger" variant="danger">
          {(error as Error).message}
        </Alert>
      )}
    </Container>
  );
}

export default Home;
