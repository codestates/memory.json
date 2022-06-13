import React from "react";
import Button from "./Button";

function Comment({ comment, userId, historyid, deleteComment, changeComment }) {
  function del(e, i) {
    deleteComment(e, i);
  }
  function change(e, i) {
    changeComment(e, i);
  }
  return (
    <li
      key={comment.id}
      style={{ display: "flex", border: "#826f66 solid 1px" }}
    >
      <div style={{ flex: "9 1 auto" }}>{comment.comment_content}</div>
      <div
        style={{ flex: "1 1 auto", display: "flex", flexDirection: "column" }}
      >
        {comment.user_id === userId ? (
          <Button onClick={(e) => del(comment.id, historyid)}>삭제</Button>
        ) : (
          <Button onClick={(e) => del(comment.id, historyid)} style={{ display: "none" }}>
            삭제
          </Button>
        )}
        {comment.user_id === userId ? (
          <Button onClick={(e) => change(comment.id, historyid)}>수정</Button>
        ) : (
          <Button
            onClick={(e) => change(comment.id, historyid)}
            style={{ display: "none" }}
          >
            수정
          </Button>
        )}
      </div>
    </li>
  );
}

export default Comment;
