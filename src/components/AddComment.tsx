import { useState } from "react";
import styled from "styled-components";

import { Avatar, AvatarUsername, TextBox, Button } from ".";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addComment, addReply } from "../redux/state";

interface AddCommentProps {
  isReply: boolean;
  username: AvatarUsername;
  replyingTo?: AvatarUsername;
  parentId?: number;
  handleClose?: () => void;
}

const Wrapper = styled.div<{ isReply: boolean }>`
  display: flex;
  justify-content: space-evenly;
  width: ${(props) => (props.isReply ? "600px" : "700px")};
  min-height: 180px;
  padding: 20px;
  border-radius: 8px;
  margin-top: ${(props) => (props.isReply ? "0" : "20px")};
  margin-bottom: 20px;
  background-color: var(--white);
`;

export default function AddComment({
  isReply,
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
    } else {
      dispatch(addComment(commentToAdd));
    }
    setText("");
  };

  return (
    <Wrapper isReply={isReply}>
      <Avatar username={username} />
      <TextBox value={text} onChange={handleChange} />
      <Button
        theme="primary"
        content={isReply ? "Reply" : "Send"}
        onClick={() => handleAddComment(isReply)}
      />
    </Wrapper>
  );
}
