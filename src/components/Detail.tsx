import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import Badge from "react-bootstrap/Badge";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { useGetNewsDetailQuery } from "../newsApi";

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
  comments: Item[];
  level: number;
  comments_count: number;
}

function Detail() {
  const { id } = useParams();
  const [show, setShow] = useState([]);
  const { data, error, isLoading, isSuccess, isError, refetch } =
    useGetNewsDetailQuery(id, {
      pollingInterval: 60000,
    });
  return (
    <Container>
      {isLoading && <Spinner animation="border" />}
      {data && (
        <div>
          <h1>{data.title}</h1>
          <div className="d-flex align-items-baseline justify-content-start">
            <span className="me-4">{data.time_ago}</span>
            <span className="me-4">{data.user}</span>
            <a href={data.url} target="_blank" className="me-4">
              read
            </a>
            <Badge pill bg="info">
              {data.comments_count}
            </Badge>
          </div>
          <Stack gap={2} className="mt-3">
            <div className="border p-2">
              <Button
                variant="primary"
                size="sm"
                className="me-3"
                onClick={() => refetch()}
              >
                reload comments
              </Button>
              <Link to="../">back</Link>
            </div>
            <h5>Comments</h5>
            {data.comments_count == 0 && <span>Comments not found</span>}
            {isSuccess && data.comments && (
              <ul className="list-unstyled">
                {data.comments.map((comment) => (
                  <Comment comment={comment} />
                ))}
              </ul>
            )}
          </Stack>
        </div>
      )}
      {isError && (
        <Alert key="danger" variant="danger">
          {(error as Error).message}
        </Alert>
      )}
    </Container>
  );
}

interface CommentProps {
  comment: Item;
}
function Comment(props: CommentProps) {
  const [show, setShow] = useState(false);
  return (
    <li className="border p-2 cursor-pointer mb-3">
      <div onClick={() => setShow((current) => !current)}>
        <strong>{props.comment.user}</strong>
        <div dangerouslySetInnerHTML={{ __html: props.comment.content }}></div>
      </div>
      {show && (
        <ul>
          {props.comment.comments &&
            props.comment.comments.map((comment) => (
              <Comment comment={comment} />
            ))}
        </ul>
      )}
    </li>
  );
}

export default Detail;
