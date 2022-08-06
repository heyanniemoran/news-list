import React from "react";
import { Link, useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import apiClient from "../http-common";

export interface Item {
  id: number;
  title: string;
  points: number | null;
  user: string | null;
  time: number;
  time_ago: string;
  content: string;
  deleted?: boolean;
  dead?: boolean;
  type: string;
  url?: string;
  domain?: string;
  comments: Item[]; // Comments are items too
  level: number;
  comments_count: number;
}

async function fetchNewsItem(context: QueryFunctionContext): Promise<Item> {
  const response = await apiClient.get<Item>(
    "/item/" + context.queryKey[1] + ".json"
  );
  return response.data;
}

function Detail() {
  const { id } = useParams();
  const { isLoading, isSuccess, isError, data, error, refetch } = useQuery(
    ["query-detail", id],
    fetchNewsItem
  );
  return (
    <Container>
      {data && (
        <div>
          <h1>{data.title}</h1>
          <div className="d-flex align-items-baseline justify-content-start">
            <span className="me-4">
              <i className="bi bi-clock me-1"></i>
              {data.time_ago}
            </span>
            <span className="me-4">
              <i className="bi bi-person me-1"></i>
              {data.user}
            </span>
            <a href={data.url} target="_blank" className="me-4">
              <i className="bi bi-box-arrow-up-right me-1"></i>
              read
            </a>
            <Badge pill bg="info">
              {data.comments_count}
            </Badge>
          </div>
          <Stack gap={2} className="mt-3">
            <div className="border p-2">
              <Button variant="primary" size="sm" className="me-3">
                Обновить
              </Button>
              <Link to="../">Вернуться к списку</Link>
            </div>
            {data.comments &&
              data.comments.map((comment) => (
                <div className="border p-2">
                  <span>{comment.user}</span>
                  <div
                    dangerouslySetInnerHTML={{ __html: comment.content }}
                  ></div>
                </div>
              ))}
          </Stack>
        </div>
      )}
    </Container>
  );
}

export default Detail;
