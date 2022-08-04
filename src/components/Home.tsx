import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
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
  const response = await apiClient.get<FeedItem[]>("/newest/1.json");
  return response.data;
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
          Reload news list
        </Button>
      </div>
      <ListGroup numbered>
        {data &&
          data.map((item) => (
            <ListGroup.Item className="d-flex">
              <Link
                to="detail"
                className="d-flex justify-content-start align-items-start"
              >
                <div className="d-flex flex-column ms-3">
                  <h5>{item.title}</h5>
                  <div className="d-flex justify-content-start align-items-start">
                    <span className="me-3">{item.points}</span>
                    <span className="me-3">{item.user}</span>
                    <span>{item.time}</span>
                  </div>
                </div>
              </Link>
            </ListGroup.Item>
          ))}
      </ListGroup>
    </Container>
  );
}

export default Home;
