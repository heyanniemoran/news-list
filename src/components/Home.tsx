import React from "react";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useQuery } from "@tanstack/react-query";
import apiClient from "../http-common";

export interface FeedItem {
  id: number;
  title: string;
  points?: number | null;
  user?: string | null;
  time: number;
  time_ago: string;
  comments_count: number;
  type: string;
  url?: string;
  domain?: string;
}

async function fetchNews(): Promise<FeedItem[]> {
  let news: FeedItem[] = [];
  let page: number = 1;
  while (news.length < 100) {
    debugger;
    let response = await apiClient.get<FeedItem[]>("/newest/" + page + ".json");
    page++;
    news = news.concat(response.data);
  }
  return news.slice(0, 100);
}

function Home() {
  const { isLoading, isSuccess, isError, data, error, refetch } = useQuery(
    ["query-news"],
    fetchNews
  );
  return (
    <Container>
      <div className="py-2">
        <Button variant="primary" size="sm" onClick={() => refetch()}>
          <i className="bi bi-arrow-repeat me-2"></i>Reload news list
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
                      <span className="me-4">
                        <i className="bi bi-person me-1"></i>
                        {item.user}
                      </span>
                      <span>
                        <i className="bi bi-clock me-1"></i>
                        {item.time_ago}
                      </span>
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
