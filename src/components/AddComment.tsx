import { useState } from "react";
import styled from "styled-components";

import { Avatar, AvatarUsername, TextBox, Button } from ".";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addComment, addReply, editCommment } from "../redux/state";

interface AddCommentProps {
  isReply?: boolean;
  isEdit?: boolean;
  commentContent?: string;
  username: AvatarUsername;
  replyingTo?: AvatarUsername;
  parentId?: number;
  handleClose?: () => void;
}

const Wrapper = styled.div<{ isReply: boolean; isEdit: boolean }>`
  display: flex;
  flex-wrap: wrap;
  justify-content: ${(props) => (props.isEdit ? "flex-end" : "space-between")};
  width: ${(props) => {
    if (props.isReply) {
      return "600px";
    } else if (props.isEdit) {
      return "100%";
    } else {
      return "700px";
    }
  }};
  min-height: ${(props) => (props.isEdit ? "60%" : "180px")};
  padding: ${(props) => (props.isEdit ? "0px" : "20px")};
  border-radius: 8px;
  margin-top: ${(props) => (props.isReply || props.isEdit ? "0" : "20px")};
  margin-bottom: ${(props) => (props.isEdit ? "0" : "20px")};
  background-color: var(--white);

  button {
    margin-top: ${(props) => (props.isEdit ? "10px" : "0")};
  }
`;

export default function AddComment({
  isReply = false,
  isEdit = false,
  commentContent = "",
  username,
  replyingTo,
  parentId = 0,
  handleClose,
}: AddCommentProps) {
  const dispatch = useAppDispatch();
  const lastId = useAppSelector((state) => state.state.lastId);

  const [text, setText] = useState(() => {
    if (isReply) {
      return `@${replyingTo} `;
    }
    if (isEdit) {
      return commentContent;
    }
    return "";
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleAddComment = (isReply: boolean) => {
    const commentToAdd: CommentType = {
      id: lastId + 1,
      user: {
        username,
      },
      content: text
        .split(" ")
        .filter((word) => !word.startsWith("@"))
        .join(" "),
      replies: [],
      createdAt: "Just now",
      score: 0,
      replyingTo,
    };
    if (isReply) {
      dispatch(addReply({ commentToAdd, id: parentId }));
      handleClose?.();
    } else if (isEdit) {
      dispatch(editCommment({ content: text, id: parentId }));
      handleClose?.();
    } else {
      dispatch(addComment(commentToAdd));
    }
    setText("");
  };

  const buttonContent = () => {
    if (isReply) {
      return "Reply";
    }
    if (isEdit) {
      return "Update";
    }
    return "Send";
  };

  return (
    <Wrapper isReply={isReply} isEdit={isEdit}>
      {!isEdit && <Avatar username={username} />}
      <TextBox
        style={{
          width: isEdit ? "100%" : "70%",
          height: isEdit ? "80px" : "100px",
        }}
        value={text}
        onChange={handleChange}
      />
      <Button
        theme="primary"
        content={buttonContent()}
        onClick={() => handleAddComment(isReply)}
      />
    </Wrapper>
  );
}
