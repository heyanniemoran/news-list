import React, { useState } from "react";
import Detail from "./Detail";
import { CommentProps } from "../constants/Comment";

function Comment(props: CommentProps) {
  const [show, setShow] = useState(false);
  return (
    <li key={props.comment.id} className="border p-2 cursor-pointer mb-3">
      <div onClick={() => setShow((current) => !current)}>
        <strong>{props.comment.user}</strong>
        <div dangerouslySetInnerHTML={{ __html: props.comment.content }}></div>
      </div>
      {show && (
        <ul>
          {props.comment.comments?.map((comment) => (
            <Comment comment={comment} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default Comment;
