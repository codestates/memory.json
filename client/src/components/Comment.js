import React, { useState } from "react";
import Button from "./Button";

function Comment({
  comment,
  userId,
  historyid,
  deleteComment,
  changeComment,
  setCommentFixInput,
}) {
  const commentFixOnChange = (e) => {
    setCommentFixInput(e.target.value);
    console.log(e.target.value);
  };
  const onReset = () => {
    setCommentFixInput("");
  };

  // 댓글 보기
  const [isOpenFix, setIsOpenFix] = useState(true);
  console.log(isOpenFix);

  const commentFixToggle = () => {
    setIsOpenFix((isOpenFix) => !isOpenFix); // on,off 개념 boolean
  };

  function del(e, i) {
    deleteComment(e, i);
  }

  function change(e, i) {
    changeComment(e, i);
  }

  return (
    <li
      key={comment.id}
      style={{
        display: "flex",
        border: "#826f66 solid 1px",
        marginTop: "0.5rem",
      }}
    >
      {isOpenFix ? (
        <div style={{ flex: "9 1 auto" }}>{comment.comment_content}</div>
      ) : (
        <input
          id="comment"
          type="text"
          style={{
            flex: "9 1 auto",
            display: "flex",
            flexGrow: "1",
          }}
          onChange={commentFixOnChange}
        />
      )}
      {isOpenFix ? (
        <div
          style={{
            flex: "1 1 auto",
            display: "flex",
            flexDirection: "column",
            flexwrap: "wrap",
            alignContent: "space-evenly",
            alignItems: "center",
            flexBasis: "50px",
            width: "50px",
          }}
        >
          {comment.user_id === userId ? (
            <Button onClick={(e) => del(comment.id, historyid)}>삭제</Button>
          ) : (
            <Button style={{ display: "none" }}>삭제</Button>
          )}
          {comment.user_id === userId ? (
            <Button onClick={(e) => commentFixToggle()}>수정</Button>
          ) : (
            <Button style={{ display: "none" }}>수정</Button>
          )}
        </div>
      ) : (
        <Button
          onClick={(e) => {
            change(comment.id, historyid);
            onReset();
            commentFixToggle();
          }}
        >
          수정 완료
        </Button>
      )}
    </li>
  );
}

export default Comment;
